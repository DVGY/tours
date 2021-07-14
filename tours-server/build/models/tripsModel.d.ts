import mongoose, { Document } from 'mongoose';
import { IUsers } from './usersModel';
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
declare type Position = number[];
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
declare const Trips: mongoose.Model<ITrips, {}, {}>;
export default Trips;
