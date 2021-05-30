import mongoose, { Document, Model, Query } from 'mongoose';
import Trips, { ITrips } from './tripsModel';
import { IUsers } from './usersModel';

const reviewsSchema = new mongoose.Schema<IReviews, IReviewsModel>(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trips',
      required: [true, 'Review must belong to a Trip'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Review must belong to a User'],
    },
  },
  {
    toJSON: {},
    toObject: {},
  }
);

//---------------------------------------------------//
//--------------------INTERFACES---------------------//
//--------------------------------------------------//

export interface IReviews extends Document {
  review: string;
  rating: number;
  createdAt: Date;
  trip: ITrips;
  user: IUsers;
}

export interface IReviewsModel extends Model<IReviews> {
  calcAverageRatings(tripId: ITrips | string): Promise<void>;
}

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
reviewsSchema.post<Query<unknown, IReviews, unknown>>(
  /^findOneAnd/,
  async function (this, doc: IReviews) {
    await Reviews.calcAverageRatings(doc.trip);
  }
);

//--------------------------------------------------//
//             STATICS                              //
//--------------------------------------------------//
reviewsSchema.statics.calcAverageRatings = async function (
  tripId: ITrips | string
) {
  // this Points to current model

  const stats: {
    _id: string;
    numRating: number;
    avgRating: number;
  }[] = await this.aggregate([
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
    await Trips.findByIdAndUpdate(tripId, {
      ratingsQuantity: stats[0].numRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Trips.findByIdAndUpdate(tripId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

const Reviews = mongoose.model<IReviews, IReviewsModel>(
  'Reviews',
  reviewsSchema
);

export default Reviews;
