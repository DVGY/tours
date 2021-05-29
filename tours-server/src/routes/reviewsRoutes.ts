import express from 'express';

import {
  getAllReviews,
  createReview,
  deleteReview,
} from '../controllers/reviewsController';
import { protect, restrictTo } from '../controllers/authController';
import { UserRole } from '../models/usersModel';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllReviews)
  .post(protect, restrictTo(UserRole.USER), createReview);

router
  .route('/:id')
  .delete(protect, restrictTo(UserRole.USER, UserRole.ADMIN), deleteReview);

export default router;
