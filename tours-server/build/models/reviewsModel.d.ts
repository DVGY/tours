import { Document, Model } from 'mongoose';
import { ITrips } from './tripsModel';
import { IUsers } from './usersModel';
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
declare const Reviews: IReviewsModel;
export default Reviews;
