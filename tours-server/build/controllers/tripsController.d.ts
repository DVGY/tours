import { Request, Response, NextFunction } from "express";
export declare const createTrip: (req: Request<unknown, unknown, createTripRequestBody>, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllTrips: (req: Request<unknown, unknown, unknown, tripsReqQuery>, res: Response) => Promise<void>;
export declare const getTrip: (req: Request, res: Response) => Promise<void>;
export declare const updateTrip: (req: Request, res: Response) => Promise<void>;
export declare const deleteTrip: (req: Request, res: Response) => Promise<void>;
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
}
