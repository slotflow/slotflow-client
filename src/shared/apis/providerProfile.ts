import { axiosInstance } from "@/lib/axios";
import {
    AdminRejectProviderRequest,
    ProviderSubmitDetailsResponse,
    AdminFetchAllProvidersResponse,
    ProviderDashboardGraphResponse,
    AdminChangeProviderTrustTagRequest,
    AdminChangeProviderBlockStatusRequest,
    ProviderFetchMyProfileDetailsResponse,
    ProviderFetchDashboardStatsDataRequest,
    ProviderFetchDashboardStatsDataResponse,
    UserFetchProviderProfileDetailsResponse,
    AdminFetchProviderProfileDetailsResponse,
    ProviderFetchDashboardRevenueStatsDataRequest,
    ProviderFetchDashboardRevenueStatsDataResponse,
} from "../interface/api/providerProfile";
import { DateRange } from "react-day-picker";
import { PlanName } from "../interface/enums";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseResponse } from "../helper/parseResponse";
import { buildQueryParams } from "../helper/buildQueryParams";
import { FetchProvidersProofsResponse, UpdateFileDataRequest } from "../interface/api/commonApiInterface";
import { ApiBaseResponse, ApiFetchFunction, FetchFunctionBaseQueryParams } from "../interface/commonInterface";

// provider fetching own profile details
export const providerFetchMyProfileDetails = async (): Promise<ApiBaseResponse<ProviderFetchMyProfileDetailsResponse>> => {
    const response = await axiosInstance.get('/providers/me');
    return response.data;
}

// provider updating own identity proof
export const providerUpdateIdentityProof = async (data: UpdateFileDataRequest): Promise<ApiBaseResponse<string>> => {
    const response = await axiosInstance.patch('/providers/me/identity', data);
    return response.data;
}

// provider updating own service proof
export const providerUpdateProofServiceProof = async (data: UpdateFileDataRequest): Promise<ApiBaseResponse<string>> => {
    const response = await axiosInstance.patch('/providers/me/service', data);
    return response.data;
}

// provider fetching own proofs
export const providerFetchProofs = async (): Promise<ApiBaseResponse<FetchProvidersProofsResponse>> => {
    const response = await axiosInstance.get(`/providers/me/proofs`);
    return response.data;
}

// provider deleting own identity proof
export const providerDeleteIdentityProof = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.delete('/providers/me/identity');
    return response.data;
}

// provider deleting own service proof
export const providerDeleteServiceProof = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.delete('/providers/me/service');
    return response.data;
}

// provider submitting own details for review
export const providerSubmitDetailsForReview = createAsyncThunk<ApiBaseResponse<ProviderSubmitDetailsResponse>>('/provider/profile/details',
    async () => {
        const response = await axiosInstance.patch('/providers/me/approval');
        return response.data;
    }
)



// **** Provider Dashboard Apis

// provider fetch dashboard stats data
export const providerFetchDashboardStatsData = async (payload: ProviderFetchDashboardStatsDataRequest): Promise<ApiBaseResponse<ProviderFetchDashboardStatsDataResponse>> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/provider-dashboard/?${query}`);
    return response.data;
}

export const providerFetchDashboardRevenueStatsData = async (payload: ProviderFetchDashboardRevenueStatsDataRequest): Promise<ApiBaseResponse<ProviderFetchDashboardRevenueStatsDataResponse>> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/payments/revenue?${query}`);
    return response.data;
}

// provider fetch dashboard graph data
export const providerFetchDashboardGraphData = async (subscription?: PlanName, dateRange?: DateRange): Promise<ApiBaseResponse<ProviderDashboardGraphResponse>> => {
    const response = await axiosInstance.get(`/provider-dashboard/graph`, {
        params: {
            subscription,
            ...(dateRange ? { start: dateRange.from, end: dateRange.to } : {}),
        }
    });
    return response.data;
}



// **** other roles apis for providers resource

// admin

// admin fetch provider profile details
export const fetchProviderDetailsForAdmin = async (providerId: string): Promise<ApiBaseResponse<AdminFetchProviderProfileDetailsResponse>> => {
    const response = await axiosInstance.get(`/providers/${providerId}`);
    return response.data.data;
}

// admin fetch service providers
export const fetchServiceProvidersForAdmin: ApiFetchFunction<
    AdminFetchAllProvidersResponse,
    FetchFunctionBaseQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/providers?${query}`);
    return parseResponse<AdminFetchAllProvidersResponse>(response.data.data);
};

// admin approve provider
export const adminApproveProvider = async (providerId: string): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/providers/${providerId}/approve`);
    return response.data;
}

// admin reject provider
export const adminRejectProvider = async (data: AdminRejectProviderRequest): Promise<ApiBaseResponse> => {
    const { providerId, ...payload } = data;
    const response = await axiosInstance.patch(`/providers/${providerId}/reject`, { ...payload });
    return response.data;
}

// admin change provider block status
export const adminChangeProviderBlockStatus = async (data: AdminChangeProviderBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/providers/${data.providerId}/block`, { blockStatus: data.isBlocked });
    return response.data;
}

// admin change provider trust tag
export const adminChangeProviderTrustTag = async (data: AdminChangeProviderTrustTagRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/providers/${data.providerId}/trust-tag`, { trustTag: data.trustedBySlotflow });
    return response.data;
}

// admin fetch provider proofs
export const adminFetchProviderProofs = async (providerId: string): Promise<ApiBaseResponse<FetchProvidersProofsResponse>> => {
    const response = await axiosInstance.get(`/providers/${providerId}/proofs`);
    return response.data;
}

// user

// user fetch provider profile details
export const fetchProviderDetailsForUser = async (providerId: string): Promise<ApiBaseResponse<UserFetchProviderProfileDetailsResponse>> => {
    const response = await axiosInstance.get(`/providers/${providerId}`);
    return response.data;
}