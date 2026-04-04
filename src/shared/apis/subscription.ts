import { axiosInstance } from "@/lib/axios";
import { ApiBaseResponse } from "../interface/commonInterface";
import { parseResponse } from "../helper/parseResponse";
import { ApiFetchFunction } from "../interface/api/commonApiInterface";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { CheckoutForSubscribePlanRequest, FetchMySubscriptionResponse, FetchProviderSubscriptionsResponse, FetchSubscriptionDetailsResponse, FetchSubscriptionsQueryParams, CheckoutForSubscribePlanResponse } from "../interface/api/subscription";
import { buildQueryParams } from "../helper/buildQueryParams";

// fetch subscriptions
export const fetchSubscriptions: ApiFetchFunction<
    FetchProviderSubscriptionsResponse,
    FetchSubscriptionsQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/subscriptions?${query}`);
    return parseResponse<FetchProviderSubscriptionsResponse>(response.data.data);
};

// fetch a single subscription details
export const fetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<FetchSubscriptionDetailsResponse> => {
    const response = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
    return response.data.data;
}

// subscribe to trial plan
export const subscribeToTrialPlan = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/subscriptions/trial');
    return response.data;
}

// fetch my subscription
export const fetchMySubscription = async (): Promise<FetchMySubscriptionResponse> => {
    const response = await axiosInstance.get('/subscriptions/me');
    return response.data;
}

// checkout for subscribe plan
export const checkoutForSubscribePlan = async (data: CheckoutForSubscribePlanRequest): Promise<CheckoutForSubscribePlanResponse> => {
    const response = await axiosInstance.post('/subscriptions/checkout/session', data);
    return response.data;
}