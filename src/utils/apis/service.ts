import {
    CreateServiceRequest,
    FetchServicesResponse,
    ChangeServiceBlockStatusRequest,
    FetchServicesByCategoryResponse,
} from "../interface/api/service";
import { axiosInstance } from "@/lib/axios";
import { ServiceCategory } from "../interface/enums";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { ApiFetchFunction } from "../interface/api/commonApiInterface";
import { FetchFunctionBaseQueryParams, ApiBaseResponse } from "../interface/commonInterface";

export const fetchServices: ApiFetchFunction<
    FetchServicesResponse,
    FetchFunctionBaseQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/services?${query}`);
    return parseNewCommonResponse<FetchServicesResponse>(response.data.data);
}

export const createService = async (data: CreateServiceRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/services', data);
    return response.data;
}

export const changeServiceBlockStatus = async (data: ChangeServiceBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/services/${data.serviceId}`, { blockStatus: data.isBlocked });
    return response.data;
}

export const fetchServicesByCategory = async (categories: ServiceCategory[]): Promise<Array<FetchServicesByCategoryResponse>> => {
    const response = await axiosInstance.get(`/services`, {
        params: {
            serviceCategory: categories
        }
    });
    return response.data.data;
}