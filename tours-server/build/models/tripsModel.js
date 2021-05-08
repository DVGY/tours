"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tripsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "A trip must have a name"],
        unique: true,
        trim: true,
        maxlength: [40, "A trip name must have less or equal then 40 characters"],
        minlength: [
            10,
            "A trip name must have more  or equal then 10 characters",
        ],
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, "A trip must have a duration"],
    },
    price: {
        type: Number,
        required: [true, "A trip must have a price"],
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                // this only points to current doc on NEW document creation
                return val < this.price;
            },
            message: "Discount price ({VALUE}) should be below regular price",
        },
    },
    difficulty: {
        type: String,
        required: [true, "A trip must have a difficulty"],
        enum: {
            values: ["easy", "medium", "difficult"],
            message: "Difficulty is either: easy, medium, difficult",
        },
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A trip must have a description"],
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        required: [true, "A trip must have a cover image"],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    startDates: [Date],
    secretTrip: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
    // transform: function (doc, ret) {
    //   ret.id = ret._id;
    //   delete ret._id;
    // }
    },
});
//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//
//---------------------------------------------------//
//                 METHODS                           //
//---------------------------------------------------//
const Trips = mongoose_1.default.model("Trips", tripsSchema);
exports.default = Trips;
