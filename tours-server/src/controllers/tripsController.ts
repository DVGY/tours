import { Request, Response, NextFunction } from "express";
import { Query, QueryWithHelpers } from "mongoose";
import Trips, { ITrips } from "../models/tripsModel";
import { APIFeatures } from "../utils/APIFeatures";
//--------------------------------------------//
//---------------CREATE TRIP ----------------//
//-------------------------------------------//

export const createTrip = async (
  req: Request<unknown, unknown, createTripRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    name,
    slug,
    duration,
    price,
    priceDiscount,
    maxGroupSize,
    difficulty,
    ratingsAverage,
    ratingsQuantity,
    summary,
    description,
    imageCover,
    images,
    secretTrip,
  } = req.body;

  try {
    const trip: ITrips = await Trips.create({
      name,
      slug,
      duration,
      price,
      priceDiscount,
      maxGroupSize,
      difficulty,
      ratingsAverage,
      ratingsQuantity,
      summary,
      description,
      imageCover,
      images,
      secretTrip,
    });

    res.status(201).json({
      status: "success",
      data: { trip },
    });
  } catch (error: unknown) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

//--------------------------------------------//
//---------------GET ALL TRIPS ----------------//
//-------------------------------------------//
export const getAllTrips = async (
  req: Request<unknown, unknown, unknown, tripsReqQuery>,
  res: Response
): Promise<void> => {
  try {
    const queryProps: tripsReqQuery = { ...req.query };
    console.log(req.query);

    const features = new APIFeatures<ITrips, tripsReqQuery>(
      Trips.find(),
      queryProps
    );
    features.filter().sort().limitFields().paginate();

    const trips = await features.query;
    res.status(200).json({
      status: "success",

      results: trips.length,
      data: {
        trips,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

//--------------------------------------------//
//---------------GET A TRIP  ----------------//
//-------------------------------------------//

export const getTrip = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const trip = await Trips.findById(id);
    res.status(200).json({
      status: "success",
      data: { trip },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

//--------------------------------------------//
//---------------UPDATE A TRIP  ----------------//
//-------------------------------------------//
export const updateTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const trip = await Trips.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { trip },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

//--------------------------------------------//
//---------------DELETE A TRIP  ----------------//
//-------------------------------------------//
export const deleteTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const trip = await Trips.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

//--------------------------------------//
//---- INTERFACES---------------------//
//-------------------------------------//

export interface createTripRequestBody {
  name: string;
  slug: string;
  duration: number;
  price: number;
  priceDiscount: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  createdAt?: Date;
  startDate?: Date[];
  secretTrip: boolean;
}

/**
 * @public
 *
 * Query parameters sent by users
 * @param name :string
 */

export interface tripsReqQuery {
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
  // [someQueryProp: string]: undefined | string;
}
