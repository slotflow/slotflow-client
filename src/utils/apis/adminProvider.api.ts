import { axiosInstance } from "@/lib/axios";
import {
    AdminFetchAllProvidersResponse,
    AdminFetchProviderServiceResponse,
    AdminChangeProviderTrustTagRequest,
    AdminChangeProviderBlockStatusRequest,
    AdminFetchProviderAvailabilityRequest,
    AdminFetchProviderAvailabilityResponse,
    AdminFetchProviderProfileDetailsResponse,
} from "../interface/api/adminProviderApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Provider } from "../interface/entityInterface/providerInterface";
import { FetchFunctionParams, ApiPaginatedResponse, ApiBaseResponse } from "../interface/commonInterface";
import { AdminFetchddressResponse, FetchPaymentsResponse, FetchProvidersProofsResponse, FetchProviderSubscriptionsResponse } from "../interface/api/commonApiInterface";

export const adminFetchAllProviders = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<AdminFetchAllProvidersResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/providers${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllProvidersResponse>(response.data);
};

export const adminApproveProvider = async (providerId : Provider["_id"]): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/providers/${providerId}/approve`);
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

export const adminFetchProviderProfileDetails = async (providerId: Provider["_id"]): Promise<AdminFetchProviderProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/admin/providers/${providerId}/profile`);
    return response.data.data;
}

export const adminFetchProviderAddress = async (providerId: Provider["_id"]): Promise<AdminFetchddressResponse> => {
    const response = await axiosInstance.get(`/admin/providers/${providerId}/address`);
    return response.data.data;
}

export const adminFetchProviderService = async (providerId: Provider["_id"]): Promise<AdminFetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/admin/providers/${providerId}/service`);
    return response.data.data;
}

export const adminFetchProviderServiceAvailability = async ({date, providerId}: AdminFetchProviderAvailabilityRequest): Promise<AdminFetchProviderAvailabilityResponse> => {
    const response = await axiosInstance.get(`/admin/providers/${providerId}/availability`, {
        params : {
            date : date.toISOString()
        }
    });
    return response.data.data;
}

export const adminFetchProviderSubscriptions = async (params: FetchFunctionParams<Provider["_id"]>) : Promise<ApiPaginatedResponse<FetchProviderSubscriptionsResponse>> => {
    const { id, pagination } = params;
    const query = buildQueryParams({ pagination });
    const response = await axiosInstance.get(`/admin/providers/${id}/subscriptions${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data);
}

export const adminFetchProviderPayments = async (params: FetchFunctionParams<Provider["_id"]>): Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const { id, pagination } = params;
    const query = buildQueryParams({ pagination });
    const response = await axiosInstance.get(`/admin/providers/${id}/payments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}

export const adminFetchProviderProofs = async(providerId: Provider["_id"]): Promise<FetchProvidersProofsResponse> => {
    const response = await axiosInstance.get(`/admin/providers/${providerId}/proofs`);
    return response.data.data;
}