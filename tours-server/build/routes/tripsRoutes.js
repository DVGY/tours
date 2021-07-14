"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const tripsController_1 = require("../controllers/tripsController");
const usersModel_1 = require("../models/usersModel");
const reviewsRoutes_1 = __importDefault(require("./reviewsRoutes"));
const router = express_1.default.Router();
router.use('/:tripId/review', reviewsRoutes_1.default);
router.route('/top-5-cheap').get(tripsController_1.aliasTopTrips, tripsController_1.getAllTrips);
router.route('/stats').get(tripsController_1.getTripsStats);
router.route('/monthly-plan/:id').get(tripsController_1.getTripsPlanMonthly);
router
    .route('/trips-within/:distance/center/:latlng/unit/:unit')
    .get(tripsController_1.getTripsWithin);
router.route('/distances/:latlng/unit/:unit').get(tripsController_1.getTripsDistance);
router.route('/').get(tripsController_1.getAllTrips).post(tripsController_1.createTrip);
router
    .route('/:id')
    .get(tripsController_1.getTrip)
    .patch(tripsController_1.updateTrip)
    .delete(authController_1.protect, authController_1.restrictTo(usersModel_1.UserRole.ADMIN, usersModel_1.UserRole.LEAD_GUIDE), tripsController_1.deleteTrip);
module.exports = router;
