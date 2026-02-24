import { axiosInstance } from "@/lib/axios";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { ApiPaginatedResponse, FetchFunctionParams } from "../interface/commonInterface";
import { FetchProviderSubscriptionsResponse, FetchSubscriptionDetailsResponse } from "../interface/api/commonApiInterface";

// fetch subscriptions
export const fetchSubscriptions = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchProviderSubscriptionsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/subscriptions${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data.data);
}

// fetch a single subscription details
export const fetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<FetchSubscriptionDetailsResponse> => {
    const response = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
    return response.data.data;
}