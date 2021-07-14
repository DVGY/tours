/**
 * @public
 * A centalised class to catch operational errors
 *
 */
export declare class AppError extends Error {
    statusCode: number;
    readonly isOperational: boolean;
    message: string;
    readonly status: string;
    constructor(message: string, statusCode: number);
}
