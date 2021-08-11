import { Request, Response, NextFunction } from 'express';
import Axios from 'axios';

import Bookings, { IBookings } from '../models/bookingsModel';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { stripe, getPaymentIntent, IMetaData } from '../utils/stripe';
import Stripe from 'stripe';
import { getOne } from './handlerFactory';

export const createBookingsStripeWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sig = req.headers['stripe-signature'];
    if (!sig) {
      return next(new AppError('Stripe Signature is not defined', 400));
    }

    let event: Stripe.Event | null = null;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        'whsec_RDOhDxJONEmA83qHrdQnbzzeJroLqkTT'
      );
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 'fail',
        message: 'Webhook Error',
      });
    }

    if (!event) {
      throw new Error('Event is undefined');
    }

    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const price = paymentIntent.amount;
    const paymentIntentMetadata = paymentIntent.metadata as IMetaData;
    const { tripId, userId } = paymentIntentMetadata;

    await Bookings.create({
      trip: tripId,
      user: userId,
      price,
    });

    res.json({ received: true });
  }
);

export const createPaymentIntent = catchAsync(
  async (
    req: Request<unknown, unknown, createPaymentIntentBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { amount, tripId } = req.body;

    if (!req.user) {
      return next(
        new AppError(
          'User info is not defined!!!.. Check the protect middleware',
          400
        )
      );
    }

    const { id: userId, name, role, email } = req.user;
    const metadata = {
      tripId,
      userId,
      name,
      role,
      email,
    };
    const redirectUrl = `${req.protocol}://${req.hostname}?success=true`;
    const paymentIntent = await getPaymentIntent(amount, metadata, redirectUrl);

    const client_secret = paymentIntent.client_secret;

    res.status(201).json({
      status: 'success',
      client_secret,
    });
  }
);

//--------------------------------------------//
//---------------GET A BOOKING----------------//
//-------------------------------------------//

export const getBooking = getOne(Bookings);

export interface createPaymentIntentBody {
  amount: number;
  tripId: string;
}
