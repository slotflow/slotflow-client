import { axiosInstance } from "@/lib/axios";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Payment } from "../interface/entityInterface/paymentInterface";
import { ApiFetchFunction, FetchPaymentDetailsResponse, FetchPaymentsQueryParams, FetchPaymentsResponse } from "../interface/api/commonApiInterface";

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
  const response = await axiosInstance.get(`/payments${query ? `?${query}` : ""}`);
  return parseNewCommonResponse<FetchPaymentsResponse>(response.data.data);
};