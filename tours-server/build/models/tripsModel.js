"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const tripsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'A trip must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A trip name must have less or equal then 40 characters'],
        minlength: [
            10,
            'A trip name must have more  or equal then 10 characters',
        ],
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A trip must have a duration'],
    },
    price: {
        type: Number,
        required: [true, 'A trip must have a price'],
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                // this only points to current doc on NEW document creation
                return val < this.price;
            },
            message: 'Discount price ({VALUE}) should be below regular price',
        },
    },
    difficulty: {
        type: String,
        required: [true, 'A trip must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult',
        },
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: (currentRatingsAverage) => Math.round(currentRatingsAverage * 10) / 10,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A trip must have a description'],
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        required: [true, 'A trip must have a cover image'],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    guides: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Users',
        },
    ],
    startDates: [Date],
    startLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point'],
        },
        // longitute, latitude
        coordinates: [Number],
        address: String,
        description: String,
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point'],
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number,
        },
    ],
    secretTrip: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
        // transform: function (doc, ret) {
        //   ret.id = ret._id;
        //   delete ret._id;
        // }
    },
    toObject: {
        virtuals: true,
    },
});
//--------------------------------------------------//
//             INDEX                                //
//--------------------------------------------------//
tripsSchema.index({ price: 1, ratingsAverage: -1 });
tripsSchema.index({ slug: 1 });
tripsSchema.index({ startLocation: '2dsphere' });
//--------------------------------------------------//
//             VIRTUALS                             //
//--------------------------------------------------//
// Virtual Populate
tripsSchema.virtual('reviews', {
    ref: 'Reviews',
    foreignField: 'trip',
    localField: '_id',
});
//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//
//---- Document Middleware ----//
// Lower case the Trips name
tripsSchema.pre('save', function (next) {
    this.slug = slugify_1.default(this.name, { lower: true });
    next();
});
// ---- Query Middleware -----//
// Do not select secret Trips
tripsSchema.pre(/^find/, function () {
    void this.find({ secretTrip: { $ne: true } });
});
// Populate Users (guides) for each Trip
tripsSchema.pre(/^find/, function () {
    void this.populate({
        path: 'guides',
        select: '-__v -passwordChangedAt',
    });
});
//---- Aggreation Middleware ----//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
tripsSchema.pre('aggregate', function () {
    // this.pipeline().unshift({ $match: { secretTrip: { $ne: true } } });
});
//---------------------------------------------------//
//                 METHODS                           //
//---------------------------------------------------//
const Trips = mongoose_1.default.model('Trips', tripsSchema);
exports.default = Trips;
