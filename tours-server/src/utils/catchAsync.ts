import { NextFunction, Request, Response } from 'express';

//
//  interface asyncController {
//  (req: Request, res: Response, next: NextFunction): Promise<void> }
//
//

/**
 * @public
 */
export type asyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * @public
 * A Function which take async request handler and controller and return back it
 * @param asyncFuncController - Take async controller function
 * @returns void
 */

export const catchAsync = (asyncFuncController: asyncController) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    asyncFuncController(req, res, next).catch((error) => {
      next(error);
    });
  };
};
