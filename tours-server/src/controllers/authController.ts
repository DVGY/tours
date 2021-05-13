import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Users, { IUsers } from '../models/usersModel';
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

//--------------------------------------//
//---- INTERFACES---------------------//
//-------------------------------------//

export interface createUserRequestBody extends loginUserReqBody {
  name: string;

  passwordConfirm: string;
}

export interface loginUserReqBody {
  email: string;
  password: string;
}

export interface ICookieOptions {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
}
