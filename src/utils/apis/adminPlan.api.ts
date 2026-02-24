import { axiosInstance } from "@/lib/axios";
import {
    AdminAddNewPlanRequest,
    AdminFetchAllPlansResponse,
    AdminChangePlanBlockStatusRequest,
} from "../interface/api/adminPlanApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { ApiFetchFunction } from "../interface/api/commonApiInterface";
import { FetchFunctionBaseQueryParams, ApiBaseResponse } from "../interface/commonInterface";

export const adminFetchAllPlans: ApiFetchFunction<
    AdminFetchAllPlansResponse,
    FetchFunctionBaseQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/admin/plans${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllPlansResponse>(response.data.data);
};

export const adminAddNewPlan = async (formData: AdminAddNewPlanRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/admin/plans', formData);
    return response.data;
}

export const adminChangePlanBlockStatus = async (data: AdminChangePlanBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/plans/${data.planId}`, { blockStatus: data.isBlocked });
    return response.data;
}