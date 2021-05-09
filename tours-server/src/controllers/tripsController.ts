import { Request, Response, NextFunction } from "express";
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
  console.log(req.body);
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

//--------------------------------------------//
//---------------TOP 5 TRIPS ----------------//
//-------------------------------------------//
export const aliasTopTrips = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.query.limit = "5";
  req.query.sort = "price,-ratingsAverage";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

//--------------------------------------------//
//---------------TRIPS STATS ----------------//
//-------------------------------------------//
export const getTripsStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tripsStats = await Trips.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: "$difficulty",
          totalTrips: { $sum: 1 },
          totalRatings: { $sum: "$ratingsQuantity" },
          avgRatings: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $avg: "$price" },
          maxPrice: { $max: "$price" },
        },
      },

      {
        $sort: { avgPrice: 1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      results: tripsStats.length,
      data: {
        tripsStats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
    console.log(error);
  }
};

//--------------------------------------------//
//---------------MONTHLY PLAN BUSIEST MONTH---//
//-------------------------------------------//

export const getTripsPlanMonthly = async (
  req: Request<unknown, unknown, unknown, tripsReqQuery>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const year = req.query.year || "2021";
  try {
    const monthlyPlan = await Trips.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          totalTrips: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: {
          month: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          totalTrips: -1,
        },
      },
      // {
      //   $addFields: {
      //     monthName: {
      //       $let: {
      //         vars: {
      //           monthsInString: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      //         },
      //         in: {
      //           $arrayElemAt: ["$$monthsInString", "$month"],
      //         },
      //       },
      //     },
      //   },
      // },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: "success",
      results: monthlyPlan.length,
      data: {
        monthlyPlan,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
    console.log(error);
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
  year?: string;
  // [someQueryProp: string]: undefined | string;
}
