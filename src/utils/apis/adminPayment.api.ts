import { axiosInstance } from "@/lib/axios"
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchPaymentsResponse } from "../interface/api/commonApiInterface";
import { FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";

export const adminFetchAllPayments = async (params?: FetchFunctionParams<string>): Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const refactoredQuery = buildQueryParams(params);
    const response = await axiosInstance.get(`/payments${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data.data);
}