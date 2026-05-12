import { axiosInstance } from "@/lib/axios";
import { buildQueryParams } from "../helper/buildQueryParams";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { FetchCreditAccountDetailsResponse, FetchCreditTransactionsQueryParams, FetchCreditTransactionsResponse } from "../interface/api/credit";

export const fetchCreditAccountDetails = async (): Promise<ApiBaseResponse<FetchCreditAccountDetailsResponse>> => {
    const response = await axiosInstance.get('/credits/me');
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