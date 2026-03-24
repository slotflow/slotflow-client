import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "../interface/commonInterface";
import { FetchMyAddressResponse, FetchAddressResponse, CreateAddressRequest, UserCreateAddressResponse, UpdateAddressRequest, UpdateAddressResponse } from "../interface/api/addressApiInterface";

export const fetchMyAddress = async (): Promise<FetchMyAddressResponse> => {
    const response = await axiosInstance.get('/addresses/me');
    return response.data.data;
}

export const fetchAddressByProviderId = async (providerId: string): Promise<FetchAddressResponse> => {
    const response = await axiosInstance.get(`/providers/${providerId}/address`);
    return response.data.data;
}

export const fetchAddressByUserId = async (userId: string): Promise<FetchAddressResponse> => {
    const response = await axiosInstance.get(`/users/${userId}/address`);
    return response.data.data;
}

export const providerCreateAddress = createAsyncThunk<ApiBaseResponse, CreateAddressRequest>("/provider/addAddress",
    async (data: CreateAddressRequest) => {
        const response = await axiosInstance.post(`/addresses/`, data);
        return response.data;
    }
)

export const userCreateAddress = async (data: CreateAddressRequest): Promise<UserCreateAddressResponse> => {
    const response = await axiosInstance.post('/addresses/', data);
    return response.data;
}

export const updateAddress = async (data: UpdateAddressRequest): Promise<UpdateAddressResponse> => {
    const response = await axiosInstance.patch(`/addresses/${data._id}`, data);
    return response.data;
}