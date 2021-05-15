import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'node:util';

import Users, { IUsers, UserRole } from '../models/usersModel';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';

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

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

//--------------------------------------------//
//---------------SIGNUP ----------------//
//-------------------------------------------//

export const signup = catchAsync(
  async (
    req: Request<unknown, unknown, createUserRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name, email, password, passwordConfirm } = req.body;
    const newUser = await Users.create({
      name,
      email,
      password,
      passwordConfirm,
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
//---------------PROTECT ROUTES ----------------//
//-------------------------------------------//

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = '';
    if (!process.env.JWT_SECRET) {
      throw new Error('process.env.JWT_SECRET not defined');
    }

    // 1) Getting token and check of it's there
    console.log(req.headers.authorization);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in pls login again', 401));
    }

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
      _id: currentUser._id as string,
      email: currentUser.email,
      name: currentUser.name,
      role: currentUser.role,
    } as IAuthenticatedUser;
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = authenticatedUser;

    next();
  }
);

//--------------------------------------//
//---- INTERFACES---------------------//
//-------------------------------------//

interface createUserRequestBody extends loginUserReqBody {
  name: string;

  passwordConfirm: string;
}

interface IAuthenticatedUser {
  _id: string;
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
