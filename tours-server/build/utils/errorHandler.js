"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("./AppError");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * @public
 * A centarlised error handling function
 *
 * @param err - Error instance
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 */
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
        handleDevError(err, res);
    }
    if (process.env.NODE_ENV === 'production') {
        handleProdError(err, res);
    }
};
exports.errorHandler = errorHandler;
/**
 * @public
 * Function to send errro response in development mode
 * @param err An error object
 * @param res A Reponse object
 */
const handleDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
/**
 * @public
 * Function to send error response in production mode
 *
 * @param err An error object
 * @param res Response object
 */
/**
 * @public
 * Function to select type of operational error
 *
 * @param err An error object
 * @param res Response object
 */
const handleProdError = (err, res) => {
    const error = handleErrorTypes(err);
    if (error instanceof AppError_1.AppError && error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
    else {
        res.status(500).json({
            status: err.status,
            message: `Something went very wrong contact it deptartment: it-dept@tours.com`,
        });
    }
};
const handleErrorTypes = (err) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const errorCopy = Object.assign(err);
    // Duplicated DB Error
    if (err.code === 11000) {
        if (err.keyValue) {
            const message = `Duplicate key error: Key: ${Object.keys(err.keyValue)[0]} and Value: ${Object.values(err.keyValue)[0]}`;
            return new AppError_1.AppError(message, 400);
        }
    }
    // Invalid ID DB
    if (err.name === 'CastError') {
        if (err.path && err.value) {
            const message = `Invalid ${err.path}: ${err.value}`;
            return new AppError_1.AppError(message, 400);
        }
    }
    // Validation error DB
    if (err.errors) {
        const keys = Object.keys(err.errors);
        const values = Object.values(err.errors).map((el) => el.message);
        let message = '';
        values.forEach((el, idx) => {
            if (values.length - 1 === idx) {
                message += `${keys[idx]}: ${el}`;
            }
            else {
                message += `${keys[idx]}: ${el}, `;
            }
        });
        return new AppError_1.AppError(message, 400);
    }
    // JWT Token Expired Error
    if (err.name === 'TokenExpiredError') {
        const message = `JWT Expired Please log in again`;
        return new AppError_1.AppError(message, 401);
    }
};
