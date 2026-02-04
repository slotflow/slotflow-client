import { axiosInstance } from "@/lib/axios"
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchPaymentsResponse } from "../interface/api/commonApiInterface";
import { FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";

export const adminFetchAllPayments = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/payments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data.data);
}