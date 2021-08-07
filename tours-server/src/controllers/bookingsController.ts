import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';

import { IBookings } from '../models/bookingsModel';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY Not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});

export const bookTours = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.resolve();

    res.status(201).json({});
  }
);

export const createPaymentIntent = catchAsync(
  async (
    req: Request<unknown, unknown, createPaymentIntentBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'INR',
    });

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
