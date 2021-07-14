"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripsDistance = exports.getTripsWithin = exports.getTripsPlanMonthly = exports.getTripsStats = exports.aliasTopTrips = exports.deleteTrip = exports.updateTrip = exports.getTrip = exports.getAllTrips = exports.createTrip = void 0;
const tripsModel_1 = __importDefault(require("../models/tripsModel"));
const APIFeatures_1 = require("../utils/APIFeatures");
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = require("../utils/AppError");
const handlerFactory_1 = require("./handlerFactory");
//--------------------------------------------//
//---------------CREATE TRIP ----------------//
//-------------------------------------------//
exports.createTrip = catchAsync_1.catchAsync(async (req, res, next) => {
    const { name, slug, duration, price, priceDiscount, maxGroupSize, difficulty, summary, description, imageCover, images, secretTrip, startLocation, locations, guides, } = req.body;
    const trip = await tripsModel_1.default.create({
        name,
        slug,
        duration,
        price,
        priceDiscount,
        maxGroupSize,
        difficulty,
        summary,
        description,
        imageCover,
        images,
        secretTrip,
        startLocation,
        locations,
        guides,
    });
    res.status(201).json({
        status: 'success',
        data: { trip },
    });
});
//--------------------------------------------//
//---------------GET ALL TRIPS ----------------//
//-------------------------------------------//
exports.getAllTrips = catchAsync_1.catchAsync(async (req, res, next) => {
    const queryProps = { ...req.query };
    /**
     * Skip() has bug confirmed by mongoose community
     */
    const features = new APIFeatures_1.APIFeatures(tripsModel_1.default.find(), queryProps);
    features.filter().sort().limitFields().paginate();
    // debug with below line
    // const trips = await Trips.find().sort('-ratingsAverage').skip(3).limit(1);
    const trips = await features.query;
    res.status(200).json({
        status: 'success',
        results: trips.length,
        data: {
            trips,
        },
    });
});
//--------------------------------------------//
//---------------GET A TRIP  ----------------//
//-------------------------------------------//
exports.getTrip = handlerFactory_1.getOne(tripsModel_1.default, { path: 'reviews' });
//--------------------------------------------//
//---------------UPDATE A TRIP  ----------------//
//-------------------------------------------//
exports.updateTrip = catchAsync_1.catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const trip = await tripsModel_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: { trip },
    });
});
//--------------------------------------------//
//---------------DELETE A TRIP  ----------------//
//-------------------------------------------//
exports.deleteTrip = handlerFactory_1.deleteOne(tripsModel_1.default);
//--------------------------------------------//
//---------------TOP 5 TRIPS ----------------//
//-------------------------------------------//
const aliasTopTrips = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = 'price,-ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};
exports.aliasTopTrips = aliasTopTrips;
//--------------------------------------------//
//---------------TRIPS STATS ----------------//
//-------------------------------------------//
exports.getTripsStats = catchAsync_1.catchAsync(async (req, res, next) => {
    const tripsStats = await tripsModel_1.default.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
            $group: {
                _id: '$difficulty',
                totalTrips: { $sum: 1 },
                totalRatings: { $sum: '$ratingsQuantity' },
                avgRatings: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $avg: '$price' },
                maxPrice: { $max: '$price' },
            },
        },
        {
            $sort: { avgPrice: 1 },
        },
    ]);
    res.status(200).json({
        status: 'success',
        results: tripsStats.length,
        data: {
            tripsStats,
        },
    });
});
//--------------------------------------------//
//---------------MONTHLY PLAN BUSIEST MONTH---//
//-------------------------------------------//
exports.getTripsPlanMonthly = catchAsync_1.catchAsync(async (req, res, next) => {
    const year = req.query.year || '2021';
    const monthlyPlan = await tripsModel_1.default.aggregate([
        {
            $unwind: '$startDates',
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                totalTrips: { $sum: 1 },
                trips: { $push: '$name' },
            },
        },
        {
            $addFields: {
                month: '$_id',
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
        {
            $sort: {
                totalTrips: -1,
            },
        },
        // {
        //   $addFields: {
        //     monthName: {
        //       $let: {
        //         vars: {
        //           monthsInString: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        //         },
        //         in: {
        //           $arrayElemAt: ["$$monthsInString", "$month"],
        //         },
        //       },
        //     },
        //   },
        // },
        {
            $limit: 12,
        },
    ]);
    res.status(200).json({
        status: 'success',
        results: monthlyPlan.length,
        data: {
            monthlyPlan,
        },
    });
});
exports.getTripsWithin = catchAsync_1.catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');
    const radius = unit === 'mi' ? parseInt(distance) / 3963.2 : parseInt(distance) / 6378.1;
    if (!lat || !lng) {
        return next(new AppError_1.AppError('Please provide latitude and longitude in format lat,lng', 400));
    }
    const tripWithinRadius = await tripsModel_1.default.find({
        startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });
    res.status(200).json({
        status: 'success',
        result: tripWithinRadius.length,
        data: {
            tripWithinRadius,
        },
    });
});
exports.getTripsDistance = catchAsync_1.catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
    if (!lat || !lng) {
        return next(new AppError_1.AppError('Please provide latitude and longitude in format lat,lng', 400));
    }
    const tripsDistance = await tripsModel_1.default.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseInt(lng), parseInt(lat)],
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier,
            },
        },
        {
            $project: {
                // distance: { $trunc: ['$distance', 3] },
                distance: 1,
                name: 1,
            },
        },
    ]);
    res.status(200).json({
        status: 'success',
        result: tripsDistance.length,
        data: { tripsDistance },
    });
});
