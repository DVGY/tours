import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PopulateOptions, Model } from 'mongoose';

import Reviews from '../models/reviewsModel';
import Trips, { ITrips } from '../models/tripsModel';
import Users from '../models/usersModel';
import Bookings from '../models/bookingsModel';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';
import { APIFeatures } from '../utils/APIFeatures';

type UserDefinedModel =
  | typeof Reviews
  | typeof Users
  | typeof Trips
  | typeof Bookings;
// type UserDefinedDocument = ITrips | IReviews | IUsers | IBookings;

// Bug and workaround
//https://github.com/Automattic/mongoose/issues/10305

const getModelName = (userDefinedModel: UserDefinedModel): string => {
  return userDefinedModel.modelName.toLocaleLowerCase();
};
//----------------------------------------------------------------//
//---------------CRUD CONTROLLER/HANDLER FUNCTIONS  --------------//
//---------------------------------------------------------------//

//--------------------------------------------//
//---------DELETE A DATA IN RESOURCE----------//
//-------------------------------------------//

export const deleteOne = (userDefinedModel: UserDefinedModel): RequestHandler =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;

      const doc = await userDefinedModel.findByIdAndDelete(id);

      const modelName = getModelName(userDefinedModel);

      if (!doc) {
        return next(new AppError(`No ${modelName} found with that Id`, 400));
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );

//--------------------------------------------//
//---------UPDATE A DATA IN RESOURCE----------//
//-------------------------------------------//

// BUG

// eslint-disable-next-line @typescript-eslint/ban-types
export const updateOne = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  userDefinedModel: Model<UserDefinedModel, {}, {}>
): RequestHandler =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;

      const doc = await userDefinedModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      const modelName = userDefinedModel.modelName;

      if (!doc) {
        return next(new AppError(`No ${modelName} found with that Id`, 400));
      }

      res.status(200).json({
        status: 'success',
        [modelName]: { doc },
      });
    }
  );

//--------------------------------------------//
//---------CREATE A DATA IN RESOURCE----------//
//-------------------------------------------//

export const createOne = (userDefinedModel: UserDefinedModel): RequestHandler =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const doc = await userDefinedModel.create(req.body);
      const modelName = getModelName(userDefinedModel);
      res.status(201).json({
        status: 'success',
        data: {
          [modelName]: doc,
        },
      });
    }
  );

//--------------------------------------------//
//---------GET A DATA FROM RESOURCE----------//
//-------------------------------------------//

export const getOne = (
  userDefinedModel: UserDefinedModel,
  populateOptions?: PopulateOptions
): RequestHandler =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;
      let query = userDefinedModel.findById(id);
      if (populateOptions) query = query.populate(populateOptions);
      const doc = await query;

      const modelName = getModelName(userDefinedModel);
      res.status(200).json({
        status: 'success',
        data: {
          [modelName]: doc,
        },
      });
    }
  );

//--------------------------------------------//
//---------GET ALL DATA FROM RESOURCE----------//
//-------------------------------------------//

// BUG

export const getAll = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  userDefinedModel: Model<any, {}, {}>
): RequestHandler =>
  catchAsync(
    async (
      req: Request<unknown, unknown, unknown, queryParamsFilter>,
      res: Response,
      next: NextFunction
    ) => {
      const queryProps: queryParamsFilter = { ...req.query };

      const features = new APIFeatures<ITrips, queryParamsFilter>(
        userDefinedModel.find(),
        queryProps
      );
      features.filter().sort().limitFields().paginate();

      const trips = await features.query;
      res.status(200).json({
        status: 'success',
        results: trips.length,
        data: {
          trips,
        },
      });
    }
  );

export interface queryParamsFilter {
  name?: string;
  duration?: string;
  price?: string;
  priceDiscount?: string;
  maxGroupSize?: string;
  difficulty?: string;
  ratingsAverage?: string;
  ratingsQuantity?: string;
  createdAt?: Date;
  startDate?: Date[];
  secretTrip?: boolean;
  sort?: string;
  limit?: string;
  fields?: string;
  paginate?: string;
  year?: string;

  // [someQueryProp: string]: undefined | string;
}
