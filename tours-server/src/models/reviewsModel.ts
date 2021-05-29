import mongoose, { Document, Query } from 'mongoose';
import { ITrips } from './tripsModel';
import { IUsers } from './usersModel';

const reviewsSchema = new mongoose.Schema<IReviews>(
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

const Reviews = mongoose.model<IReviews>('Reviews', reviewsSchema);

export default Reviews;
