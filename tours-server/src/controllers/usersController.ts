import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Users, { IUsers, UserRole } from '../models/usersModel';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';
import { deleteOne } from './handlerFactory';

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
//----------UPDATE USER PROFILE   -----------//
//-------------------------------------------//

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // if (req.body.password || req.body.passwordConfirm) {
    //   return next(
    //     new AppError(
    //       'This route is not for password updates. Please use /updateMyPassword.',
    //       400
    //     )
    //   );
    // }
    // Update only email or/and name
    // const filteredBody = filterObj(req.body, 'name', 'email');
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
