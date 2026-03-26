import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "../interface/commonInterface";
import { FetchProviderServiceResponse, ProviderCreateServiceDetailsRequest, ProviderUpdateServiceDetailsRequest, UserFetchProviderServiceResponse } from "../interface/api/providerService";

export const providerCreateServiceDetails = createAsyncThunk<ApiBaseResponse, ProviderCreateServiceDetailsRequest>("/provider/addServiceDetails",
    async (data: ProviderCreateServiceDetailsRequest) => {
        const response = await axiosInstance.post(`/provider-services`, data);
        return response.data;
    }
)

export const providerUpdateServiceDetails = async (data: ProviderUpdateServiceDetailsRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/provider-services/${data._id}`, data);
    return response.data;
}

export const providerFetchServiceDetails = async (): Promise<FetchProviderServiceResponse> => {
    const response = await axiosInstance.get('/provider-services');
    return response.data.data;
}

export const userFetchProviderService = async (providerId: string): Promise<UserFetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/providers/${providerId}/provider-services`);
    return response.data.data;
}

export const adminFetchProviderService = async (providerId: string): Promise<FetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/providers/${providerId}/provider-services`);
    return response.data.data;
}