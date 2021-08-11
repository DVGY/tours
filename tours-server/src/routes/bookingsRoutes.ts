import express from 'express';

import {
  createPaymentIntent,
  createBookingsStripeWebhook,
  getBooking,
} from '../controllers/bookingsController';
import { protect } from '../controllers/authController';

const router = express.Router();

// router.use(protect);

router.route('/:id').get(getBooking);

router
  .route('/createBookingsStripeWebhook')
  .post(express.raw({ type: 'application/json' }), createBookingsStripeWebhook);
router.route('/payment-intent').post(createPaymentIntent);

export default router;
