import { NextFunction, Request, Response } from 'express';
import { Error as MongoError } from 'mongoose';
/**
 * @public
 * A centarlised error handling function
 *
 * @param err - Error instance
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 */
export declare const errorHandler: (err: IAppError, req: Request, res: Response, next: NextFunction) => void;
interface IMongoError extends MongoError {
    path?: string;
    value?: string;
    keyValue?: {
        [index: string]: string;
    };
    code?: number;
    errors?: {
        [index: string]: {
            [index: string]: string;
        };
    };
}
/**
 * @public
 */
export interface IAppError extends Error, IMongoError {
    statusCode?: number;
    isOperational?: boolean;
    status?: string;
}
export {};
