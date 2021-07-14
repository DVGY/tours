"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
/**
 * @public
 * A Function which take async request handler and controller and return back it
 * @param asyncFuncController - Take async controller function
 * @returns void
 */
const catchAsync = (asyncFuncController) => {
    return (req, res, next) => {
        asyncFuncController(req, res, next).catch((error) => {
            next(error);
        });
    };
};
exports.catchAsync = catchAsync;
