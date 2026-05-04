import { axiosInstance } from "@/lib/axios";
import { buildQueryParams } from "../helper/buildQueryParams";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { CheckoutForSubscribePlanRequest, FetchMySubscriptionResponse, FetchProviderSubscriptionsResponse, FetchSubscriptionDetailsResponse, FetchSubscriptionsQueryParams } from "../interface/api/subscription";

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
export const fetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<ApiBaseResponse<FetchSubscriptionDetailsResponse>> => {
    const response = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
    return response.data;
}

// subscribe to trial plan
export const subscribeToTrialPlan = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/subscriptions/trial');
    return response.data;
}

// fetch my subscription
export const fetchMySubscription = async (): Promise<ApiBaseResponse<FetchMySubscriptionResponse>> => {
    const response = await axiosInstance.get('/subscriptions/me');
    return response.data;
}

// checkout for subscribe plan
export const checkoutForSubscribePlan = async (data: CheckoutForSubscribePlanRequest): Promise<ApiBaseResponse<string>> => {
    const response = await axiosInstance.post('/subscriptions/checkout/session', data);
    return response.data;
}