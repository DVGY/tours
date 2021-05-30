import express from 'express';

import {
  getAllReviews,
  createReview,
  deleteReview,
  setTourUserIds,
  updateReview,
} from '../controllers/reviewsController';
import { protect, restrictTo } from '../controllers/authController';
import { UserRole } from '../models/usersModel';

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo(UserRole.USER), setTourUserIds, createReview);

router
  .route('/:id')
  .patch(restrictTo(UserRole.USER, UserRole.ADMIN), updateReview)
  .delete(restrictTo(UserRole.USER, UserRole.ADMIN), deleteReview);

export default router;
