/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
import { IStartLocation, ILocations } from '../models/tripsModel';
import { IUsers } from '../models/usersModel';
export declare const createTrip: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const getAllTrips: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const getTrip: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const updateTrip: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const deleteTrip: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const aliasTopTrips: (req: Request, res: Response, next: NextFunction) => void;
export declare const getTripsStats: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const getTripsPlanMonthly: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const getTripsWithin: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const getTripsDistance: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
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
    startLocation?: IStartLocation;
    locations?: ILocations;
    guides?: IUsers;
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
    skipv?: string;
}
