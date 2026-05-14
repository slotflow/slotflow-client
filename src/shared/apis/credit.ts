import { axiosInstance } from "@/lib/axios";
import { buildQueryParams } from "../helper/buildQueryParams";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { FetchCreditAccountDetailsRequest, FetchCreditAccountDetailsResponse, FetchCreditTransactionsQueryParams, FetchCreditTransactionsResponse } from "../interface/api/credit";

export const fetchCreditAccountDetails = async (data: FetchCreditAccountDetailsRequest): Promise<ApiBaseResponse<FetchCreditAccountDetailsResponse>> => {
    const query = buildQueryParams(data);
    const response = await axiosInstance.get(`/credits/me?${query}`);
    return response.data;
}

export const fetchCreditTransactions: ApiFetchFunction<
    FetchCreditTransactionsResponse,
    FetchCreditTransactionsQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/credits/me/transactions?${query}`);
    return response.data.data;
}