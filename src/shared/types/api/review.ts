import { User } from '../entity/user';
import { Review } from '../entity/review';

// request type of create review api
export type CreateReviewRequest = Pick<
  Review,
  'reviewText' | 'rating' | 'bookingId' | 'providerId'
>;

// request type of fetch reviews api
export interface FetchReviewsQueryParams {
  providerId?: string;
  userId?: string;
}

// response type of fetch reviews api
export interface FetchReviewsResponse extends Pick<
  Review,
  '_id' | 'createdAt' | 'reviewText' | 'rating' | 'reported' | 'isBlocked'
> {
  userId: Pick<User, 'username' | 'profileImage'>;
  providerId: Pick<User, 'username' | 'profileImage'>;
}

// change review block status
export interface ChangeReviewBlockStatusRequest {
  reviewId: Review['_id'];
  isBlocked: Review['isBlocked'];
}
export type ChangeReviewBlockStatusResponse = Pick<Review, "_id" | "isBlocked">; 


// report review
export interface ReportReviewRequest {
  reviewId: Review['_id'];
}
export type ReportReviewResponse = Pick<Review, "_id" | "reported">; 


// delete review
export interface DeleteReviewRequest {
  reviewId: Review["_id"];
}