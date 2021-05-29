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
    // If route is nested like tour/:tourId/review
    let filter = {};
    if (req.params.tourId) {
      filter = { trip: req.params.tourId };
    }

    const reviews = await Reviews.find(filter);

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

//--------------------------------------------//
//---------------SET TOUR IDS----------------//
//-------------------------------------------//
export const setTourUserIds = (
  req: Request<any, unknown, ICreateReviewReqBody>,
  res: Response,
  next: NextFunction
): void => {
  // Allow nested routes
  const { user, trip } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { tourId } = req.params;

  if (!trip) {
    req.body.trip = tourId as string;
  }

  if (!user) {
    req.body.user = req.user?.id;
  }

  next();
};

//--------------------------------------//
//---- INTERFACES---------------------//
//-------------------------------------//

export interface ICreateReviewReqBody {
  review: string;
  rating?: number;
  createdAt?: number;
  trip: ITrips | string;
  user: IUsers | string | undefined;
}
