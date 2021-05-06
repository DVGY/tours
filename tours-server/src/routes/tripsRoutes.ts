import express from 'express';
import {
  createTrip,
  getAllTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} from '../controllers/tripsController';

const router = express.Router();
router.route('/').get(getAllTrips).post(createTrip);

router.route('/:id').get(getTrip).patch(updateTrip).delete(deleteTrip);

export = router;
