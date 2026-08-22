import { axiosInstance } from '@/lib/axios';
import {
  FetchMySubscriptionResponse,
  FetchSubscriptionsQueryParams,
  CheckoutForSubscribePlanRequest,
  FetchSubscriptionDetailsResponse,
  FetchProviderSubscriptionsResponse,
} from '../../shared/types/api/subscription';
import { Subscription } from '../../shared/types/entity/subscription';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';
import { ApiBaseResponse, ApiFetchFunction } from '../../shared/types/common';

// fetch subscriptions
export const fetchSubscriptions: ApiFetchFunction<
  FetchProviderSubscriptionsResponse,
  FetchSubscriptionsQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/subscriptions?${query}`);
  return response.data.data;
};

// fetch a single subscription details
export const fetchSubscriptionDetails = async (
  subscriptionId: Subscription['_id'],
): Promise<ApiBaseResponse<FetchSubscriptionDetailsResponse>> => {
  const response = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
  return response.data;
};

// subscribe to trial plan
export const subscribeToTrialPlan = async (): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.post('/subscriptions/trial');
  return response.data;
};

// fetch my subscription
export const fetchMySubscription = async (): Promise<
  ApiBaseResponse<FetchMySubscriptionResponse>
> => {
  const response = await axiosInstance.get('/subscriptions/me');
  return response.data;
};

// checkout for subscribe plan
export const checkoutForSubscribePlan = async (
  data: CheckoutForSubscribePlanRequest,
): Promise<ApiBaseResponse<string>> => {
  const response = await axiosInstance.post('/subscriptions/checkout/session', data);
  return response.data;
};
