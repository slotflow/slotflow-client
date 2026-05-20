import { axiosInstance } from "@/lib/axios";
import {
    CreatePlanRequest,
    AdminFetchAllPlansResponse,
    ChangePlanBlockStatusRequest,
    ProviderFetchPlansResponse,
} from "../interface/api/plan";
import { buildQueryParams } from "../helper/buildQueryParams";
import { FetchFunctionBaseQueryParams, ApiBaseResponse, ApiFetchFunction, ApiPaginatedResponse } from "../interface/commonInterface";

export const adminFetchAllPlans: ApiFetchFunction<
    AdminFetchAllPlansResponse,
    FetchFunctionBaseQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/plans?${query}`);
    return response.data.data;
};

export const createPlan = async (formData: CreatePlanRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/plans', formData);
    return response.data;
}

export const changePlanBlockStatus = async (data: ChangePlanBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/plans/${data.planId}/block`, { blockStatus: data.isBlocked });
    return response.data;
}

export const providerFetchPlans = async (): Promise<ApiBaseResponse<ApiPaginatedResponse<ProviderFetchPlansResponse>>> => {
    const response = await axiosInstance.get('/plans');
    return response.data;
}