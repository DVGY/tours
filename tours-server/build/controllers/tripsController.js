"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrip = exports.updateTrip = exports.getTrip = exports.getAllTrips = exports.createTrip = void 0;
const tripsModel_1 = __importDefault(require("../models/tripsModel"));
const APIFeatures_1 = require("../utils/APIFeatures");
//--------------------------------------------//
//---------------CREATE TRIP ----------------//
//-------------------------------------------//
const createTrip = async (req, res, next) => {
    const { name, slug, duration, price, priceDiscount, maxGroupSize, difficulty, ratingsAverage, ratingsQuantity, summary, description, imageCover, images, secretTrip, } = req.body;
    try {
        const trip = await tripsModel_1.default.create({
            name,
            slug,
            duration,
            price,
            priceDiscount,
            maxGroupSize,
            difficulty,
            ratingsAverage,
            ratingsQuantity,
            summary,
            description,
            imageCover,
            images,
            secretTrip,
        });
        res.status(201).json({
            status: "success",
            data: { trip },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
};
exports.createTrip = createTrip;
//--------------------------------------------//
//---------------GET ALL TRIPS ----------------//
//-------------------------------------------//
const getAllTrips = async (req, res) => {
    try {
        const queryProps = { ...req.query };
        console.log(req.query);
        const features = new APIFeatures_1.APIFeatures(tripsModel_1.default.find(), queryProps);
        features.filter().sort().limitFields().paginate();
        const trips = await features.query;
        res.status(200).json({
            status: "success",
            results: trips.length,
            data: {
                trips,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
        });
    }
};
exports.getAllTrips = getAllTrips;
//--------------------------------------------//
//---------------GET A TRIP  ----------------//
//-------------------------------------------//
const getTrip = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await tripsModel_1.default.findById(id);
        res.status(200).json({
            status: "success",
            data: { trip },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
        });
    }
};
exports.getTrip = getTrip;
//--------------------------------------------//
//---------------UPDATE A TRIP  ----------------//
//-------------------------------------------//
const updateTrip = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await tripsModel_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: { trip },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
        });
    }
};
exports.updateTrip = updateTrip;
//--------------------------------------------//
//---------------DELETE A TRIP  ----------------//
//-------------------------------------------//
const deleteTrip = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await tripsModel_1.default.findByIdAndDelete(id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
        });
    }
};
exports.deleteTrip = deleteTrip;
