import mongoose, { Document } from "mongoose";
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
declare const Trips: mongoose.Model<ITrips, {}>;
export default Trips;
