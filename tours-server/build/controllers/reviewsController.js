"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTripUserIds = exports.deleteReview = exports.updateReview = exports.createReview = exports.getAllReviews = void 0;
const reviewsModel_1 = __importDefault(require("../models/reviewsModel"));
const catchAsync_1 = require("../utils/catchAsync");
const handlerFactory_1 = require("./handlerFactory");
//--------------------------------------------//
//---------------GET ALL REVIEWS--------------//
//-------------------------------------------//
exports.getAllReviews = catchAsync_1.catchAsync(async (req, res, next) => {
    // If route is nested like trip/:tripId/review
    let filter = {};
    if (req.params.tripId) {
        filter = { trip: req.params.tripId };
    }
    const reviews = await reviewsModel_1.default.find(filter);
    res.status(200).json({
        status: 'success',
        result: reviews.length,
        data: {
            reviews,
        },
    });
});
//--------------------------------------------//
//---------------CREATE A REVIEW--------------//
//-------------------------------------------//
exports.createReview = catchAsync_1.catchAsync(async (req, res, next) => {
    const { review, rating, trip, user } = req.body;
    // if (req.params.tripId !== trip) {
    //   return next(
    //     new AppError('You tried to post review for another review', 400)
    //   );
    // }
    const tripReview = await reviewsModel_1.default.create({ review, rating, trip, user });
    res.status(201).json({
        status: 'success',
        data: {
            tripReview,
        },
    });
});
//--------------------------------------------//
//---------------UPDATE A REVIEW--------------//
//-------------------------------------------//
exports.updateReview = catchAsync_1.catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const review = await reviewsModel_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    console.log('review');
    res.status(200).json({
        status: 'success',
        data: { review },
    });
});
//--------------------------------------------//
//---------------DELETE A REVIEW--------------//
//-------------------------------------------//
exports.deleteReview = handlerFactory_1.deleteOne(reviewsModel_1.default);
//--------------------------------------------//
//---------------SET TRIP IDS----------------//
//-------------------------------------------//
const setTripUserIds = (req, res, next) => {
    var _a;
    // Allow nested routes
    const { user, trip } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { tripId } = req.params;
    if (!trip) {
        req.body.trip = tripId;
    }
    if (!user) {
        req.body.user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    }
    next();
};
exports.setTripUserIds = setTripUserIds;
