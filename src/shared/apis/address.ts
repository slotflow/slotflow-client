import { axiosInstance } from "@/lib/axios";
import { FetchMyAddressResponse, FetchAddressResponse, CreateAddressRequest, UserCreateAddressResponse, UpdateAddressRequest, UpdateAddressResponse } from "../interface/api/address";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMyAddress = async (): Promise<FetchMyAddressResponse> => {
    const response = await axiosInstance.get('/addresses/me');
    return response.data.data;
}

export const fetchAddressByUserId = async (userId: string): Promise<FetchAddressResponse> => {
    const response = await axiosInstance.get(`/users/${userId}/address`);
    return response.data.data;
}

export const createAddress = createAsyncThunk<UserCreateAddressResponse, CreateAddressRequest>("address/createAddress",
    async (authData: CreateAddressRequest) => {
        const response = await axiosInstance.post('/addresses/', authData);
        return response.data;
    }
)

export const updateAddress = async (data: UpdateAddressRequest): Promise<UpdateAddressResponse> => {
    const response = await axiosInstance.patch(`/addresses/${data._id}`, data);
    return response.data;
}