import { NextFunction, Request, Response } from 'express';
/**
 * @public
 */
export declare type asyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * @public
 * A Function which take async request handler and controller and return back it
 * @param asyncFuncController - Take async controller function
 * @returns void
 */
export declare const catchAsync: (asyncFuncController: asyncController) => (req: Request, res: Response, next: NextFunction) => void;
