import {
  UserFetchServiceProvidersRequest,
  UserFetchServiceProvidersResponse,
} from '../../shared/types/api/user';
import { axiosInstance } from '@/lib/axios';
import {
  FetchProviderServiceResponse,
  ProviderCreateServiceDetailsRequest,
  ProviderUpdateServiceDetailsRequest,
} from '../../shared/types/api/providerService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiBaseResponse } from '../../shared/types/common';

export const providerCreateServiceDetails = createAsyncThunk<
  ApiBaseResponse,
  ProviderCreateServiceDetailsRequest
>('/provider/addServiceDetails', async (data: ProviderCreateServiceDetailsRequest) => {
  const response = await axiosInstance.post(`/provider-services`, data);
  return response.data;
});

export const providerUpdateServiceDetails = async (
  data: ProviderUpdateServiceDetailsRequest,
): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.patch(`/provider-services/${data._id}`, data);
  return response.data;
};

export const providerFetchServiceDetails = async (): Promise<
  ApiBaseResponse<FetchProviderServiceResponse>
> => {
  const response = await axiosInstance.get('/provider-services/me');
  return response.data;
};

export const fetchProviderServiceByProviderId = async (
  providerId: string,
): Promise<ApiBaseResponse<FetchProviderServiceResponse>> => {
  const response = await axiosInstance.get(`/providers/${providerId}/provider-service`);
  return response.data;
};

// user fetch service providers
export const fetchServiceProvidersForUser = async (
  data: UserFetchServiceProvidersRequest,
  signal?: AbortSignal,
): Promise<ApiBaseResponse<Array<UserFetchServiceProvidersResponse>>> => {
  const response = await axiosInstance.get(`/provider-services`, {
    params: { ...data },
    signal,
  });
  return response.data;
};
