import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "../interface/commonInterface";
import { FetchMyAddressResponse, FetchAddressResponse, CreateAddressRequest, UserCreateAddressResponse, UpdateAddressRequest, UpdateAddressResponse } from "../interface/api/address";

export const fetchMyAddress = async (): Promise<ApiBaseResponse<FetchMyAddressResponse>> => {
    const response = await axiosInstance.get('/addresses/me');
    return response.data;
}

export const fetchAddressByUserId = async (userId: string): Promise<ApiBaseResponse<FetchAddressResponse>> => {
    const response = await axiosInstance.get(`/users/${userId}/address`);
    return response.data;
}

export const createAddress = createAsyncThunk<ApiBaseResponse<UserCreateAddressResponse>, CreateAddressRequest>("address/createAddress",
    async (authData: CreateAddressRequest) => {
        const response = await axiosInstance.post('/addresses/', authData);
        return response.data;
    }
)

export const updateAddress = async (data: UpdateAddressRequest): Promise<ApiBaseResponse<UpdateAddressResponse>> => {
    const response = await axiosInstance.patch(`/addresses/${data._id}`, data);
    return response.data;
}