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
  getTripsWithin,
  getTripsDistance,
} from '../controllers/tripsController';
import { UserRole } from '../models/usersModel';
import reviewsRouter from './reviewsRoutes';

const router = express.Router();

router.use('/:tripId/review', reviewsRouter);

router.route('/top-5-cheap').get(aliasTopTrips, getAllTrips);
router.route('/stats').get(getTripsStats);
router.route('/monthly-plan/:id').get(getTripsPlanMonthly);
router
  .route('/trips-within/:distance/center/:latlng/unit/:unit')
  .get(getTripsWithin);
router.route('/distances/:latlng/unit/:unit').get(getTripsDistance);

router.route('/').get(protect, getAllTrips).post(createTrip);

router
  .route('/:id')
  .get(getTrip)
  .patch(updateTrip)
  .delete(protect, restrictTo(UserRole.ADMIN, UserRole.LEAD_GUIDE), deleteTrip);

export = router;
