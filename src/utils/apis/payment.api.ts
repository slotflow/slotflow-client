import { axiosInstance } from "@/lib/axios";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Payment } from "../interface/entityInterface/paymentInterface";
import { ApiPaginatedResponse, FetchFunctionParams } from "../interface/commonInterface";
import { FetchPaymentDetailsResponse, FetchPaymentsResponse } from "../interface/api/commonApiInterface";

// fetch a single payment details
export const fetchPaymentDetails = async (paymentId: Payment["_id"]): Promise<FetchPaymentDetailsResponse> => {
    const response = await axiosInstance.get(`/payments/${paymentId}`);
    return response.data.data;
}    

// Added till this

// fetch payments
export const fetchPayments = async (params?: FetchFunctionParams<string>): Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const refactoredQuery = buildQueryParams(params);
    const response = await axiosInstance.get(`/payments${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data.data);
}
