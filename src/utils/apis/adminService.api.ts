import { axiosInstance } from "@/lib/axios";
import {
    AdminAddNewAppServiceRequest,
    AdminFetchAllServicesResponse,
    AdminChangeServiceBlockStatusRequest,
} from "../interface/api/adminServiceApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { ApiFetchFunction } from "../interface/api/commonApiInterface";
import { FetchFunctionBaseQueryParams, ApiBaseResponse } from "../interface/commonInterface";

export const adminFetchAllServices: ApiFetchFunction<
    AdminFetchAllServicesResponse, 
    FetchFunctionBaseQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/admin/services${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllServicesResponse>(response.data.data);
}

export const adminAddNewService = async (data: AdminAddNewAppServiceRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/admin/services', data);
    return response.data;
}

export const adminChangeServiceBlockStatus = async (data: AdminChangeServiceBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/services/${data.serviceId}`, { blockStatus: data.isBlocked });
    return response.data;
}