import { Review } from "../entityInterface/reviewInterface";

export interface AdminChangeReviewBlockStatusRequest {
    reviewId: Review["_id"];
    isblocked: Review["isBlocked"];
};