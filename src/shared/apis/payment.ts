import { axiosInstance } from "@/lib/axios";
import { buildQueryParams } from "../helper/buildQueryParams";
import { Payment } from "../interface/entityInterface/paymentInterface";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { AdminFetchRevenueReportResponse, AdmminFetchRevenueReportRequest, CheckStripeAccountStatusRequest, CheckStripeAccountStatusResponse, ConnectStripeAccountRequest, ConnexctStripeAccountResponse, FetchPaymentDetailsResponse, FetchPaymentsQueryParams, FetchPaymentsResponse } from "../interface/api/payment";

// fetch a single payment details
export const fetchPaymentDetails = async (paymentId: Payment["_id"]): Promise<ApiBaseResponse<FetchPaymentDetailsResponse>> => {
    const response = await axiosInstance.get(`/payments/${paymentId}`);
    return response.data;
}

// fetch payments
export const fetchPayments: ApiFetchFunction<
    FetchPaymentsResponse,
    FetchPaymentsQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/payments?${query}`);
    return response.data.data;
};

// admin fetch revenue report
export const fetchRevenueReportForAdmin = async (payload: AdmminFetchRevenueReportRequest): Promise<AdminFetchRevenueReportResponse> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/payments/reports/revenue${query ? `?${query}` : ''}`);
    return response.data.data;
}

// create stripe account
export const connectStripeAccount = async (data: ConnectStripeAccountRequest): Promise<ApiBaseResponse<ConnexctStripeAccountResponse>> => {
    const response = await axiosInstance.post("/payments/stripe/account-link", data);
    return response.data;
};

// check stripe account status after success onboarding
export const checkStripeAccountStatus = async (data: CheckStripeAccountStatusRequest): Promise<ApiBaseResponse<CheckStripeAccountStatusResponse>> => {
    const response = await axiosInstance.post("/payments/stripe/check-account-status", data);
    return response.data;
};