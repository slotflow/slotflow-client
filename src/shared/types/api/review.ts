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

// request type of toggle review block status api
export interface ToggleReviewBlockStatusRequest {
  reviewId: Review['_id'];
  isblocked: Review['isBlocked'];
}
