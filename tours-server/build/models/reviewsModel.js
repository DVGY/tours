"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tripsModel_1 = __importDefault(require("./tripsModel"));
const reviewsSchema = new mongoose_1.default.Schema({
    review: {
        type: String,
        require: [true, 'Review cannot be empty'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    trip: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Trips',
        required: [true, 'Review must belong to a Trip'],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Review must belong to a User'],
    },
}, {
    toJSON: {},
    toObject: {},
});
//--------------------------------------------------//
//            INDEX                                 //
//--------------------------------------------------//
reviewsSchema.index({ trip: 1, user: 1 }, { unique: true });
//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//
// ---- Query Middleware -----//
// Populate User and Tour for each review
// reviewsSchema.pre<Query<unknown, IReviews, unknown>>(/^find/, function () {
//   // Note: make two more queries
//   void this.populate({
//     path: 'trip',
//     select: 'name',
//   }).populate({
//     path: 'user',
//     select: 'name photo',
//   });
// });
//--------------------------------------------------//
//             POST MIDDLEWARE                       //
//--------------------------------------------------//
// --- Document Middleware ---//
// Update tour ratingQuantity and ratingAverage on new review creation
reviewsSchema.post('save', async function () {
    // this.constructor.calcAverageRatings(this.trip);
    await Reviews.calcAverageRatings(this.trip);
});
// --- Query Middleware --- //
// Update tour ratingQuantity and ratingAverage on update and delete review
reviewsSchema.post(/^findOneAnd/, async function (doc) {
    await Reviews.calcAverageRatings(doc.trip);
});
//--------------------------------------------------//
//             STATICS                              //
//--------------------------------------------------//
reviewsSchema.statics.calcAverageRatings = async function (tripId) {
    // this Points to current model
    const stats = await this.aggregate([
        {
            $match: { trip: tripId },
        },
        {
            $group: {
                _id: '$trip',
                numRating: { $sum: 1 },
                avgRating: { $avg: '$rating' },
            },
        },
    ]);
    if (stats.length > 0) {
        await tripsModel_1.default.findByIdAndUpdate(tripId, {
            ratingsQuantity: stats[0].numRating,
            ratingsAverage: stats[0].avgRating,
        });
    }
    else {
        await tripsModel_1.default.findByIdAndUpdate(tripId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5,
        });
    }
};
const Reviews = mongoose_1.default.model('Reviews', reviewsSchema);
exports.default = Reviews;
