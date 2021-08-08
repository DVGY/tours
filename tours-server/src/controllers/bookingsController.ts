import { Request, Response, NextFunction } from 'express';
import Axios from 'axios';

import { IBookings } from '../models/bookingsModel';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { stripe, getPaymentIntent } from '../utils/stripe';

export const createBookings = catchAsync(
  async (
    req: Request<unknown, unknown, createPaymentIntentBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // const { amount } = req.body;
    // const paymentIntent = await getPaymentIntent(amount);
    // const client_secret = paymentIntent.client_secret;
    await Promise.resolve();
    // Process payment via backend

    res.status(400).json({ status: 'fail', message: 'Cannot use this route' });
  }
);

export const createPaymentIntent = catchAsync(
  async (
    req: Request<unknown, unknown, createPaymentIntentBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { amount } = req.body;

    const paymentIntent = await getPaymentIntent(amount);

    const client_secret = paymentIntent.client_secret;

    res.status(201).json({
      status: 'success',
      client_secret,
    });
  }
);

export interface createPaymentIntentBody {
  amount: number;
}
