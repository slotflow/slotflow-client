import {
  FetchPaymentsResponse,
  FetchPaymentsQueryParams,
  ConnectStripeAccountRequest,
  FetchPaymentDetailsResponse,
  ConnexctStripeAccountResponse,
  AdmminFetchRevenueReportRequest,
  AdminFetchRevenueReportResponse,
} from '../../shared/types/api/payment';
import { axiosInstance } from '@/lib/axios';
import { Payment } from '../../shared/types/entity/payment';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';
import { ApiBaseResponse, ApiFetchFunction } from '../../shared/types/common';

// fetch a single payment details
export const fetchPaymentDetails = async (
  paymentId: Payment['_id'],
): Promise<ApiBaseResponse<FetchPaymentDetailsResponse>> => {
  const response = await axiosInstance.get(`/payments/${paymentId}`);
  return response.data;
};

// fetch payments
export const fetchPayments: ApiFetchFunction<
  FetchPaymentsResponse,
  FetchPaymentsQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/payments?${query}`);
  return response.data.data;
};

// admin fetch revenue report [ why we do not use ApiFetchFunction here because the return type is different]
export const fetchRevenueReportForAdmin = async (
  payload: AdmminFetchRevenueReportRequest,
): Promise<AdminFetchRevenueReportResponse> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/payments/reports/revenue${query ? `?${query}` : ''}`);
  return response.data.data;
};

// create stripe account
export const connectStripeAccount = async (
  data: ConnectStripeAccountRequest,
): Promise<ApiBaseResponse<ConnexctStripeAccountResponse>> => {
  const response = await axiosInstance.post('/payments/stripe/account-link', data);
  return response.data;
};
