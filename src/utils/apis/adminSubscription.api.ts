import { axiosInstance } from "@/lib/axios"
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";
import { FetchProviderSubscriptionsResponse, FetchSubscriptionDetailsResponse } from "../interface/api/commonApiInterface";

export const adminFetchAllSubscriptions = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchProviderSubscriptionsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/subscriptions${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data.data);
}

export const adminFetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<FetchSubscriptionDetailsResponse> => {
    const response = await axiosInstance.get(`/admin/subscriptions/${subscriptionId}`);
    return response.data.subscriptionDetails;
}





