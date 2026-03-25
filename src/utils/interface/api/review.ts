import { User } from "../entityInterface/userInterface";
import { Review } from "../entityInterface/reviewInterface";
import { Provider } from "../entityInterface/providerInterface";

export type CreateReviewRequest = Pick<Review, "reviewText" | "rating" | "bookingId" | "providerId">;

export interface FetchReviewsQueryParams {
  providerId?: string;
  userId?: string;
}

export interface FetchReviewsResponse extends Pick<Review, "_id" | "createdAt" | "reviewText" | "rating" | "reported" | "isBlocked"> {
  userId: Pick<User, "username" | "profileImage">;
  providerId: Pick<Provider, "username" | "profileImage">;
};

export interface ToggleReviewBlockStatusRequest {
    reviewId: Review["_id"];
    isblocked: Review["isBlocked"];
};