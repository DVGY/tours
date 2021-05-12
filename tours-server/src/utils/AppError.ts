/**
 * @public
 * A centalised class to catch operational errors
 *
 */
export class AppError extends Error {
  public statusCode: number;
  public readonly isOperational: boolean;
  public message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
