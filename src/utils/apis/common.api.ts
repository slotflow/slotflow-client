import { axiosInstance } from "@/lib/axios";
import { FetchPaymentDetailsResponse, FetchSubscriptionDetailsResponse } from "../interface/api/commonApiInterface";
import { Payment } from "../interface/entityInterface/paymentInterface";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";

// fetch a single payment details
export const fetchPaymentDetails = async (paymentId: Payment["_id"]): Promise<FetchPaymentDetailsResponse> => {
    const response = await axiosInstance.get(`/payments/${paymentId}`);
    return response.data.data;
}

// fetch a single subscription details
export const fetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<FetchSubscriptionDetailsResponse> => {
    const response = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
    console.log("response : ",response);
    return response.data.data;
}

