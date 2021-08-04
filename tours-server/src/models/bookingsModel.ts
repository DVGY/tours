import mongoose, { Document, Model, Query } from 'mongoose';
import { ITrips } from './tripsModel';
import { IUsers } from './usersModel';

const bookingsSchema = new mongoose.Schema<IBookings>(
  {
    price: {
      type: Number,
      require: [true, 'Booking must have a price'],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trips',
      required: [true, 'Booking must belong to a Boo'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Booking must belong to a User'],
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

export interface IBookings extends Document {
  price: number;
  paid: boolean;
  createdAt: Date;
  trip: ITrips;
  user: IUsers;
}

//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//

bookingsSchema.pre(/^find/, function (this: IBookings, next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });
  next();
});

const Bookings = mongoose.model<IBookings>('Bookings', bookingsSchema);

export default Bookings;
