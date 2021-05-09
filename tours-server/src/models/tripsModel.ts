import mongoose, { Document, Schema, Query, Model, Aggregate } from "mongoose";
import slug from "slugify";

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
  startDate: Date[];
  secretTrip: boolean;
}

const tripsSchema: Schema = new mongoose.Schema(
  {
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
        validator: function (this: ITrips, val: number): boolean {
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

//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//

// Document Middleware
tripsSchema.pre("save", function (this: ITrips, next) {
  this.slug = slug(this.name, { lower: true });
  next();
});

// Query Middleware
tripsSchema.pre<Query<unknown, ITrips, unknown>>(/^find/, function () {
  void this.find({ secretTrip: { $ne: true } });
});

// Aggreation Middleware
tripsSchema.pre<Aggregate<any>>("aggregate", function () {
  this.pipeline().unshift({ $match: { secretTrip: { $ne: true } } });
});

//---------------------------------------------------//
//                 METHODS                           //
//---------------------------------------------------//

const Trips = mongoose.model<ITrips>("Trips", tripsSchema);

export default Trips;
