import { NextFunction, Request, Response } from 'express';

import Reviews from '../models/reviewsModel';
import { ITrips } from '../models/tripsModel';
import { IUsers } from '../models/usersModel';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';
import { deleteOne } from './handlerFactory';

//--------------------------------------------//
//---------------GET ALL REVIEWS--------------//
//-------------------------------------------//

export const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // If route is nested like trip/:tripId/review
    let filter = {};
    if (req.params.tripId) {
      filter = { trip: req.params.tripId };
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

    // if (req.params.tripId !== trip) {
    //   return next(
    //     new AppError('You tried to post review for another review', 400)
    //   );
    // }

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
//---------------UPDATE A REVIEW--------------//
//-------------------------------------------//
export const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const review = await Reviews.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log('review');
    res.status(200).json({
      status: 'success',
      data: { review },
    });
  }
);
//--------------------------------------------//
//---------------DELETE A REVIEW--------------//
//-------------------------------------------//

export const deleteReview = deleteOne(Reviews);

//--------------------------------------------//
//---------------SET TRIP IDS----------------//
//-------------------------------------------//
export const setTripUserIds = (
  req: Request<any, unknown, ICreateReviewReqBody>,
  res: Response,
  next: NextFunction
): void => {
  // Allow nested routes
  const { user, trip } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { tripId } = req.params;

  if (!trip) {
    req.body.trip = tripId as string;
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
