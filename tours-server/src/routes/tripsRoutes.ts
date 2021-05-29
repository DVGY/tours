import express from 'express';
import { protect, restrictTo } from '../controllers/authController';
import {
  createTrip,
  getAllTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  aliasTopTrips,
  getTripsStats,
  getTripsPlanMonthly,
} from '../controllers/tripsController';
import { UserRole } from '../models/usersModel';

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTrips, getAllTrips);
router.route('/stats').get(getTripsStats);
router.route('/monthly-plan/:id').get(getTripsPlanMonthly);

router.route('/').get(protect, getAllTrips).post(createTrip);

router
  .route('/:id')
  .get(getTrip)
  .patch(updateTrip)
  .delete(protect, restrictTo(UserRole.ADMIN, UserRole.LEAD_GUIDE), deleteTrip);

export = router;
