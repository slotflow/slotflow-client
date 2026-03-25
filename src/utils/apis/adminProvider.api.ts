import { axiosInstance } from "@/lib/axios";
import {
    AdminRejectProviderRequest,
    AdminFetchAllProvidersResponse,
    AdminFetchProviderServiceResponse,
    AdminChangeProviderTrustTagRequest,
    AdminChangeProviderBlockStatusRequest,
} from "../interface/api/adminProviderApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { ApiFetchFunction } from "../interface/api/commonApiInterface";
import { Provider } from "../interface/entityInterface/providerInterface";
import { FetchProvidersProofsResponse } from "../interface/api/commonApiInterface";
import { FetchFunctionBaseQueryParams, ApiBaseResponse } from "../interface/commonInterface";

export const adminFetchAllProviders: ApiFetchFunction<
    AdminFetchAllProvidersResponse,
    FetchFunctionBaseQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/admin/providers${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllProvidersResponse>(response.data.data);
};

export const adminApproveProvider = async (providerId: Provider["_id"]): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/providers/${providerId}/approve`);
    return response.data;
}

export const adminRejectProvider = async (data: AdminRejectProviderRequest): Promise<ApiBaseResponse> => {
    const { providerId, ...payload } = data;
    const response = await axiosInstance.patch(`/admin/providers/${providerId}/reject`, { ...payload });
    return response.data;
}

export const adminChangeProviderBlockStatus = async (data: AdminChangeProviderBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/providers/${data.providerId}/block`, { blockStatus: data.isBlocked });
    return response.data;
}

export const adminChangeProviderTrustTag = async (data: AdminChangeProviderTrustTagRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/providers/${data.providerId}/trust-tag`, { trustTag: data.trustedBySlotflow });
    return response.data;
}

export const adminFetchProviderService = async (providerId: Provider["_id"]): Promise<AdminFetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/admin/providers/${providerId}/service`);
    return response.data.data;
}

export const adminFetchProviderProofs = async (providerId: Provider["_id"]): Promise<FetchProvidersProofsResponse> => {
    const response = await axiosInstance.get(`/admin/providers/${providerId}/proofs`);
    return response.data.data;
}