import { axiosInstance } from "@/lib/axios";
import { buildQueryParams } from "../helper";
import { FetchReviewsResponse } from "../interface/api/commonApiInterface";
import { ApiBaseResponse, ApiPaginatedResponse, FetchFunctionBaseQueryParams } from "../interface/commonInterface";
import { AdminChangeReviewBlockStatusRequest } from "../interface/api/adminReviewApiInterface";

export const adminFetchAllReviews = async (payload: FetchFunctionBaseQueryParams): Promise<ApiPaginatedResponse<FetchReviewsResponse>> => {
    const { id } = payload;
    const refactoredQuery = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin/reviews/${id}${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return response.data.data;
}

export const adminChangeReviewBlockStatus = async (payload: AdminChangeReviewBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/reviews/${payload.reviewId}`, {
        blockStatus: payload.isblocked,
    });
    return response.data;
}