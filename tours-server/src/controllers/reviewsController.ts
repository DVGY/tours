import { NextFunction, Request, Response } from 'express';

import Reviews from '../models/reviewsModel';
import { ITrips } from '../models/tripsModel';
import { IUsers } from '../models/usersModel';
import { catchAsync } from '../utils/catchAsync';
import { deleteOne } from './handlerFactory';

//--------------------------------------------//
//---------------GET ALL REVIEWS--------------//
//-------------------------------------------//

export const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await Reviews.find();

    res.status(200).json({
      status: 'success',
      result: reviews.length,
      data: {
        reviews,
      },
    });
  }
);

//--------------------------------------------//
//---------------CREATE A REVIEW--------------//
//-------------------------------------------//

export const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { review, rating, trip, user } = req.body as ICreateReviewReqBody;

    const tripReview = await Reviews.create({ review, rating, trip, user });

    res.status(201).json({
      status: 'success',

      data: {
        tripReview,
      },
    });
  }
);

//--------------------------------------------//
//---------------DELETE A REVIEW--------------//
//-------------------------------------------//

export const deleteReview = deleteOne(Reviews);

//--------------------------------------//
//---- INTERFACES---------------------//
//-------------------------------------//

export interface ICreateReviewReqBody {
  review: string;
  rating?: number;
  createdAt?: number;
  trip: ITrips;
  user: IUsers;
}
