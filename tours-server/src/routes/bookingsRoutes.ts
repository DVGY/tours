import express from 'express';

import {
  createPaymentIntent,
  createBookings,
} from '../controllers/bookingsController';
import { protect } from '../controllers/authController';

const router = express.Router();

// router.use(protect);

router
  .post('/booking-session', createBookings)
  .post('/payment-intent', createPaymentIntent);

export default router;
