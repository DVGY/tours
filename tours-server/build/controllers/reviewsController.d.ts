/// <reference types="qs" />
import { NextFunction, Request, Response } from 'express';
import { ITrips } from '../models/tripsModel';
import { IUsers } from '../models/usersModel';
export declare const getAllReviews: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const createReview: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const updateReview: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const deleteReview: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const setTripUserIds: (req: Request<any, unknown, ICreateReviewReqBody>, res: Response, next: NextFunction) => void;
export interface ICreateReviewReqBody {
    review: string;
    rating?: number;
    createdAt?: number;
    trip: ITrips | string;
    user: IUsers | string | undefined;
}
