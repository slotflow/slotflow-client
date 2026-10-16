import {
  FetchReferralsResponse,
  FetchReferralssQueryParams,
  FetchReferralDetailsRequest,
  FetchReferralDetailsResponse,
} from '../../shared/types/api/referral';
import { axiosInstance } from '@/lib/axios';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';
import { ApiBaseResponse, ApiFetchFunction } from '../../shared/types/common';

export const fetchReferralDetails = async (
  data: FetchReferralDetailsRequest,
): Promise<ApiBaseResponse<FetchReferralDetailsResponse>> => {
  const query = buildQueryParams(data);
  const response = await axiosInstance.get(`/referrals/me?${query}`);
  return response.data;
};

export const fetchReferrals: ApiFetchFunction<
  FetchReferralsResponse,
  FetchReferralssQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/referrals/?${query}`);
  return response.data.data;
};
