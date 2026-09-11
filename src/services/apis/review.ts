import {
  DeleteReviewRequest,
  CreateReviewRequest,
  ReportReviewRequest,
  ReportReviewResponse,
  FetchReviewsResponse,
  FetchReviewsQueryParams,
  ChangeReviewBlockStatusRequest,
  ChangeReviewBlockStatusResponse,
} from '../../shared/types/api/review';
import { axiosInstance } from '@/lib/axios';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';
import { ApiBaseResponse, ApiFetchFunction } from '../../shared/types/common';

export const createReview = async (data: CreateReviewRequest): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.post('/reviews', data);
  return response.data;
};

export const fetchReviews: ApiFetchFunction<FetchReviewsResponse, FetchReviewsQueryParams> = async (
  queryParams,
) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/reviews?${query}`);
  return response.data.data;
};

export const deleteReview = async (payload: DeleteReviewRequest): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.delete(`/reviews/${payload.reviewId}/block`);
  return response.data;
};

export const changeReviewBlockStatus = async (payload: ChangeReviewBlockStatusRequest): Promise<ApiBaseResponse<ChangeReviewBlockStatusResponse>> => {
  const response = await axiosInstance.patch(`reviews/${payload.reviewId}`, {
    isBlocked: payload.isBlocked,
  });
  return response.data;
};

export const reportReview = async (payload: ReportReviewRequest): Promise<ApiBaseResponse<ReportReviewResponse>> => {
  const response = await axiosInstance.patch(`/reviews/${payload.reviewId}/report`);
  return response.data;
};
