import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Users, { IUsers, UserRole } from '../models/usersModel';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';
import { IUpdateUserRequestBody } from './authController';
import { deleteOne, getOne } from './handlerFactory';

//--------------------------------------------//
//----------GET ALL USERS   -----------//
//-------------------------------------------//

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await Users.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  }
);

//--------------------------------------------//
//----------GET CURRENT USER PROFILE ---------//
//-------------------------------------------//
export const getMe = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.params.id = req.user?.id as string;
  next();
};

//--------------------------------------------//
//----------GET USER PROFILE ---------//
//-------------------------------------------//
export const getUser = getOne(Users);

//--------------------------------------------//
//----------UPDATE USER PROFILE   -----------//
//-------------------------------------------//

const filterObj = (
  obj: IUpdateUserRequestBody,
  allowedFields: [name: string, email: string]
) => {
  const newObj: {
    [x: string]: string;
  } = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

export const updateMe = catchAsync(
  async (
    req: Request<unknown, unknown, IUpdateUserRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
    // Update only email or/and name
    const filteredBody = filterObj(req.body, ['name', 'email']);
    // const fieldsToUpdate = {
    //   name: req.body.name,
    //   email: req.body.email,
    // };
    // 3) Update user document
    const updatedUser = await Users.findByIdAndUpdate(
      req.user?.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }
);

//--------------------------------------------//
//----DELETE USER PROFILE USER ACTION--------//
//-------------------------------------------//

export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Users.findByIdAndUpdate(req.user?.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);

//--------------------------------------------//
//----DELETE USER PROFILE ADMIN ACTION--------//
//-------------------------------------------//
export const deleteUser = deleteOne(Users);

//--------------------------------------------//
//----------INTERFACE   -----------//
//-------------------------------------------//

//--------------------------------------------//
//----------HELPER FUNCTIONS  -----------//
//-------------------------------------------//

// const filterObj = (obj:, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach(el => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };
