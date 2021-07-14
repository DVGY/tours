/// <reference types="qs" />
import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../models/usersModel';
export declare const signup: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const login: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const logout: (req: Request, res: Response, next: NextFunction) => void;
export declare const protect: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const restrictTo: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const forgotPassword: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const resetPassword: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare const updatePassword: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
interface createUserRequestBody extends loginUserReqBody {
    name: string;
    passwordConfirm: string;
    role?: UserRole;
}
interface IIndexSignature {
    [x: string]: string;
}
export declare type IUpdateUserRequestBody = Pick<createUserRequestBody, 'name' | 'passwordConfirm'> & loginUserReqBody & IIndexSignature;
interface loginUserReqBody {
    email: string;
    password: string;
}
export {};
