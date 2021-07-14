"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewsController_1 = require("../controllers/reviewsController");
const authController_1 = require("../controllers/authController");
const usersModel_1 = require("../models/usersModel");
const router = express_1.default.Router({ mergeParams: true });
router.use(authController_1.protect);
router
    .route('/')
    .get(reviewsController_1.getAllReviews)
    .post(authController_1.restrictTo(usersModel_1.UserRole.USER), reviewsController_1.setTripUserIds, reviewsController_1.createReview);
router
    .route('/:id')
    .patch(authController_1.restrictTo(usersModel_1.UserRole.USER, usersModel_1.UserRole.ADMIN), reviewsController_1.updateReview)
    .delete(authController_1.restrictTo(usersModel_1.UserRole.USER, usersModel_1.UserRole.ADMIN), reviewsController_1.deleteReview);
exports.default = router;
