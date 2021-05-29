import mongoose, { Document, Schema, Query, Aggregate } from 'mongoose';
import slug from 'slugify';
import { IUsers } from './usersModel';

const tripsSchema = new mongoose.Schema<ITrips>(
  {
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
        validator: function (this: ITrips, val: number): boolean {
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
        type: mongoose.Schema.Types.ObjectId,
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
  },
  {
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
  }
);

//---------------------------------------------------//
//--------------------INTERFACES---------------------//
//--------------------------------------------------//

export interface ITrips extends Document {
  name: string;
  slug: string;
  duration: number;
  price: number;
  priceDiscount: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  createdAt: Date;
  guides: IUsers[];
  startDate: Date[];
  startLocation: IStartLocation;
  location: ILocations[];
  secretTrip: boolean;
}

type Position = number[];

interface Point {
  type: 'Point';
  coordinates: Position;
}

export interface IStartLocation extends Point {
  address: string;
  description: string;
}
export interface ILocations extends IStartLocation {
  day: number;
}

//--------------------------------------------------//
//             VIRTUALS                             //
//--------------------------------------------------//

// Virtual Populate
tripsSchema.virtual('reviews', {
  ref: 'Reviews',
  foreignField: 'trip', // Trip is prop in Review Collection
  localField: '_id',
});

//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//

//---- Document Middleware ----//

// Lower case the Trips name
tripsSchema.pre('save', function (this: ITrips, next) {
  this.slug = slug(this.name, { lower: true });
  next();
});

// ---- Query Middleware -----//

// Do not select secret Trips
tripsSchema.pre<Query<unknown, ITrips, unknown>>(/^find/, function () {
  void this.find({ secretTrip: { $ne: true } });
});

// Populate Users (guides) for each Trip
tripsSchema.pre<Query<unknown, ITrips, unknown>>(/^find/, function () {
  void this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
});

//---- Aggreation Middleware ----//

// eslint-disable-next-line @typescript-eslint/no-explicit-any
tripsSchema.pre<Aggregate<any>>('aggregate', function () {
  this.pipeline().unshift({ $match: { secretTrip: { $ne: true } } });
});

//---------------------------------------------------//
//                 METHODS                           //
//---------------------------------------------------//

const Trips = mongoose.model<ITrips>('Trips', tripsSchema);

export default Trips;
