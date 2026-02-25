import { axiosInstance } from "@/lib/axios";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Review } from "../interface/entityInterface/reviewInterface";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { CreateReviewRequest, FetchReviewsQueryParams, FetchReviewsResponse, ToggleReviewBlockStatusRequest } from "../interface/api/reviewApiInterface";

export const createReview = async (data: CreateReviewRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/reviews', data);
    return response.data;
}

export const fetchReviews: ApiFetchFunction<FetchReviewsResponse, FetchReviewsQueryParams> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/reviews${query ? `?${query}` : ''}`);
    return parseNewCommonResponse(response.data.data);
}

export const deleteReview = async (reviewId: Review["_id"]): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.delete(`/reviews/${reviewId}/block`);
    return response.data;
}

export const toggleReviewBlockStatus = async (payload: ToggleReviewBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`reviews/${payload.reviewId}`, {
        blockStatus: payload.isblocked,
    });
    return response.data;
}

export const reportReview = async (reviewId: Review["_id"]): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/reviews/${reviewId}/report`);
    return response.data;
}
