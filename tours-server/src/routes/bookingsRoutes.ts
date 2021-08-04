import express from 'express';

import {
  getAllReviews,
  createReview,
  deleteReview,
  setTripUserIds,
  updateReview,
} from '../controllers/reviewsController';
import { protect } from '../controllers/authController';

const router = express.Router();

router.use(protect);

router.post('/booking-session');

export default router;
