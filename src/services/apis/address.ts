import {
  FetchAddressResponse,
  CreateAddressRequest,
  UpdateAddressRequest,
  UpdateAddressResponse,
  FetchMyAddressResponse,
  UserCreateAddressResponse,
  FetchAddressRequest,
} from '../../shared/types/api/address';
import { axiosInstance } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiBaseResponse } from '../../shared/types/common';
import { buildQueryParams } from '@/shared/utils/helper/buildQueryParams';

export const fetchMyAddress = async (): Promise<ApiBaseResponse<FetchMyAddressResponse>> => {
  const response = await axiosInstance.get('/addresses/me');
  return response.data;
};

export const fetchAddressByUserId = async (
  data: FetchAddressRequest,
): Promise<ApiBaseResponse<FetchAddressResponse>> => {
  const query = buildQueryParams({checkShowStatus: data.checkShowStatus});
  const response = await axiosInstance.get(`/users/${data.userId}/address?${query}`);
  return response.data;
};

export const createAddress = createAsyncThunk<
  ApiBaseResponse<UserCreateAddressResponse>,
  CreateAddressRequest
>('address/createAddress', async (authData: CreateAddressRequest) => {
  const response = await axiosInstance.post('/addresses/', authData);
  return response.data;
});

export const updateAddress = async (
  data: UpdateAddressRequest,
): Promise<ApiBaseResponse<UpdateAddressResponse>> => {
  const response = await axiosInstance.patch(`/addresses/${data._id}`, data);
  return response.data;
};
