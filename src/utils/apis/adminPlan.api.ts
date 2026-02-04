import { axiosInstance } from "@/lib/axios";
import {
    AdminAddNewPlanRequest,
    AdminFetchAllPlansResponse,
    AdminChangePlanBlockStatusRequest,
} from "../interface/api/adminPlanApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchFunctionParams, ApiPaginatedResponse, ApiBaseResponse } from "../interface/commonInterface";

export const adminFetchAllPlans = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<AdminFetchAllPlansResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/plans${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllPlansResponse>(response.data.data);
};

export const adminAddNewPlan = async (formData: AdminAddNewPlanRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/admin/plans', formData);
    return response.data;
}

export const adminChangePlanBlockStatus = async (data: AdminChangePlanBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/plans/${data.planId}`,{ blockStatus: data.isBlocked });
    return response.data;
}