import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import Users, { IUsers, UserRole } from '../models/usersModel';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';
import { sendEmail } from '../utils/email';

//--------------------------------------------//
//---------------SIGNUP ----------------//
//-------------------------------------------//

export const signup = catchAsync(
  async (
    req: Request<unknown, unknown, createUserRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name, email, password, passwordConfirm, role } = req.body;

    const newUser = await Users.create({
      name,
      email,
      password,
      passwordConfirm,
      role,
    });

    createAndSendJWTToken(newUser, 201, res);
  }
);

//--------------------------------------------//
//---------------LOGIN ----------------//
//-------------------------------------------//

export const login = catchAsync(
  async (
    req: Request<unknown, unknown, loginUserReqBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email or password', 400));
    }

    const user = await Users.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Email or Password is incorrect', 400));
    }

    createAndSendJWTToken(user, 201, res);
  }
);

//--------------------------------------------//
//---------------LOGIN ----------------//
//-------------------------------------------//

export const logout = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

//--------------------------------------------//
//---------------PROTECT ROUTES----------------//
//-------------------------------------------//

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = null;
    if (!process.env.JWT_SECRET) {
      throw new Error('process.env.JWT_SECRET not defined');
    }

    // 1) Getting token and check of it's there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.cookies.jwt) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      token = req.cookies.jwt as string;
    }

    console.log(token);
    // if((req.cookies as { jwt: string }).jwt ){

    //   token = (req.cookies as { jwt: string }).jwt
    // }

    if (!token) {
      console.log(true);
      return next(new AppError('You are not logged in pls login again', 401));
    }
    console.log('reached');
    // 2) Verification token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as IDataStoredInToken;

    // 3) Check if user still exists
    const currentUser = await Users.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }

    const authenticatedUser = {
      id: currentUser._id as string,
      email: currentUser.email,
      name: currentUser.name,
      role: currentUser.role,
    } as IAuthenticatedUser;
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = authenticatedUser;

    next();
  }
);

//--------------------------------------------//
//---------------RBAC------------------------//
//-------------------------------------------//

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // roles ['admin', 'lead-guide']. role='user'

    if (!req.user) {
      throw new Error('User role not defined');
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

//--------------------------------------------//
//---------------FORGOT PASSWORD--------------//
//-------------------------------------------//

export const forgotPassword = catchAsync(
  async (
    req: Request<unknown, unknown, createUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // console.log(req.hostname);
    // console.log(req.get('host'));
    const resetURL = `${req.protocol}://localhost:3000/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    const subject = 'Reset Password Tours App admin';
    try {
      await sendEmail({ email, subject, message });
      res.status(200).json({
        status: 'success',
        message: 'Reset Password Token sent to email!',
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new AppError('Failed to send email', 500));
    }
  }
);

//--------------------------------------------//
//---------------RESET PASSWORD--------------//
//-------------------------------------------//

export const resetPassword = catchAsync(
  async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: Request<any, unknown, createUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { resetToken } = req.params;
    const { password, passwordConfirm } = req.body;
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const user = await Users.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date(Date.now()) },
    });
    if (!user) {
      return next(new AppError('Token is invalid or expired', 400));
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    createAndSendJWTToken(user, 200, res);
  }
);

//--------------------------------------------//
//----------UPDATE CURRENT PASSWORD-----------//
//-------------------------------------------//

export const updatePassword = catchAsync(
  async (
    req: Request<any, any, IUpdatePasswordBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { password, passwordConfirm, passwordCurrent } = req.body;
    const id = req.user?.id;
    const user = await Users.findById(id).select('+password');

    if (!user) {
      return next(new AppError('User not found', 400));
    }

    if (!(await user.correctPassword(passwordCurrent, user.password))) {
      return next(new AppError('Your current password is wrong.', 401));
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    await user.save();

    createAndSendJWTToken(user, 200, res);
  }
);

//--------------------------------------//
//---- INTERFACES---------------------//
//-------------------------------------//

interface createUserRequestBody extends loginUserReqBody {
  name: string;

  passwordConfirm: string;
  role?: UserRole;
}

interface IIndexSignature {
  [x: string]: string;
}

export type IUpdateUserRequestBody = Pick<
  createUserRequestBody,
  'name' | 'passwordConfirm'
> &
  loginUserReqBody &
  IIndexSignature;

interface IUpdatePasswordBody extends createUserRequestBody {
  passwordCurrent: string;
}

interface IAuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface loginUserReqBody {
  email: string;
  password: string;
}

interface ICookieOptions {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
}

interface IDataStoredInToken {
  id: string;
  iat: number;
  exp: number;
}

//--------------------------------------//
//---- HELPER FUNCTIONS---------------------//
//-------------------------------------//

const createAndSendJWTToken = (
  user: IUsers,
  statusCode: number,
  res: Response
) => {
  if (!process.env.JWT_COOKIE_EXPIRES_IN) {
    throw new Error('JWT COOKIE EXPIRES IN not defined');
  }

  const token = signToken(user._id);

  const cookieOptions: ICookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

  user.passwordConfirm = undefined;
  // user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signToken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT SECRET is not defined');
  }
  if (!process.env.JWT_EXPIRES_IN) {
    throw new Error('JWT EXPIRES IN is not defined');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
