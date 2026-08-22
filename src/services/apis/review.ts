import {
  CreateReviewRequest,
  FetchReviewsResponse,
  FetchReviewsQueryParams,
  ToggleReviewBlockStatusRequest,
} from '../../shared/types/api/review';
import { axiosInstance } from '@/lib/axios';
import { Review } from '../../shared/types/entity/review';
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

export const deleteReview = async (reviewId: Review['_id']): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.delete(`/reviews/${reviewId}/block`);
  return response.data;
};

export const toggleReviewBlockStatus = async (
  payload: ToggleReviewBlockStatusRequest,
): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.patch(`reviews/${payload.reviewId}`, {
    blockStatus: payload.isblocked,
  });
  return response.data;
};

export const reportReview = async (reviewId: Review['_id']): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.patch(`/reviews/${reviewId}/report`);
  return response.data;
};
