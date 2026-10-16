import {
  FetchCreditTransactionsResponse,
  FetchCreditAccountDetailsRequest,
  FetchCreditAccountDetailsResponse,
  FetchCreditTransactionsQueryParams,
} from '../../shared/types/api/credit';
import { axiosInstance } from '@/lib/axios';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';
import { ApiBaseResponse, ApiFetchFunction } from '../../shared/types/common';

export const fetchCreditAccountDetails = async (
  data: FetchCreditAccountDetailsRequest,
): Promise<ApiBaseResponse<FetchCreditAccountDetailsResponse>> => {
  const query = buildQueryParams(data);
  const response = await axiosInstance.get(`/credits/me?${query}`);
  return response.data;
};

export const fetchCreditTransactions: ApiFetchFunction<
  FetchCreditTransactionsResponse,
  FetchCreditTransactionsQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/credits/me/transactions?${query}`);
  return response.data.data;
};
