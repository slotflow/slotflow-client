import { axiosInstance } from "@/lib/axios";
import { parseResponse } from "../helper/parseResponse";
import { buildQueryParams } from "../helper/buildQueryParams";
import { ApiFetchFunction } from "../interface/commonInterface";
import { Payment } from "../interface/entityInterface/paymentInterface";
import { AdminFetchRevenueReportResponse, AdmminFetchRevenueReportRequest, FetchPaymentDetailsResponse, FetchPaymentsQueryParams, FetchPaymentsResponse } from "../interface/api/payment";

// fetch a single payment details
export const fetchPaymentDetails = async (paymentId: Payment["_id"]): Promise<FetchPaymentDetailsResponse> => {
    const response = await axiosInstance.get(`/payments/${paymentId}`);
    return response.data.data;
}

// fetch payments
export const fetchPayments: ApiFetchFunction<
    FetchPaymentsResponse,
    FetchPaymentsQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/payments?${query}`);
    return parseResponse<FetchPaymentsResponse>(response.data.data);
};

// admin fetch revenue report
export const fetchRevenueReportForAdmin = async (payload: AdmminFetchRevenueReportRequest): Promise<AdminFetchRevenueReportResponse> => {
    const { endDate, startDate } = payload;
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/payments/reports/revenue${query ? `?${query}` : ''}`, {
        params: {
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
        }
    });
    return response.data.data as AdminFetchRevenueReportResponse;
}

// create stripe account
export const connectStripeAccount = async (): Promise<{ url: string }> => {
    const response = await axiosInstance.post("/payments/stripe/account-link");
    return response.data.data;
};