import { axiosInstance } from "@/lib/axios";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { ApiFetchFunction, FetchProviderSubscriptionsResponse, FetchSubscriptionDetailsResponse, FetchSubscriptionsQueryParams } from "../interface/api/commonApiInterface";

// fetch subscriptions
export const fetchSubscriptions: ApiFetchFunction<
FetchProviderSubscriptionsResponse,
FetchSubscriptionsQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/subscriptions${query ? `?${query}` : ""}`);
  return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data.data);
};

// fetch a single subscription details
export const fetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<FetchSubscriptionDetailsResponse> => {
    const response = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
    return response.data.data;
}