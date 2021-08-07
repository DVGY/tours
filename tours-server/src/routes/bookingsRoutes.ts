import express from 'express';

import {
  createPaymentIntent,
  bookTours,
} from '../controllers/bookingsController';
import { protect } from '../controllers/authController';

const router = express.Router();

router.use(protect);

router
  .post('/booking-session', bookTours)
  .post('/payment-intent', createPaymentIntent);

export default router;
