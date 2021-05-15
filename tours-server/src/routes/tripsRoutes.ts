import express from 'express';
import { protect } from '../controllers/authController';
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

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTrips, getAllTrips);
router.route('/stats').get(getTripsStats);
router.route('/monthly-plan/:id').get(getTripsPlanMonthly);

router.route('/').get(protect, getAllTrips).post(createTrip);

router.route('/:id').get(getTrip).patch(updateTrip).delete(deleteTrip);

export = router;
