import {
  ApiBaseResponse,
  ApiFetchFunction,
  FetchFunctionBaseQueryParams,
} from '../../shared/types/common';
import { axiosInstance } from '@/lib/axios';
import { DateRange } from 'react-day-picker';
import {
  AdminRejectProviderRequest,
  ProviderSubmitDetailsResponse,
  AdminFetchAllProvidersResponse,
  ProviderDashboardGraphResponse,
  AdminChangeProviderTrustTagRequest,
  AdminChangeProviderBlockStatusRequest,
  ProviderFetchMyProfileDetailsResponse,
  ProviderFetchDashboardStatsDataRequest,
  ProviderFetchDashboardBookingStatsDataResponse,
  UserFetchProviderProfileDetailsResponse,
  AdminFetchProviderProfileDetailsResponse,
  ProviderFetchDashboardRevenueStatsDataRequest,
  ProviderFetchDashboardRevenueStatsDataResponse,
  AdminApproveProviderRequest,
  AdminApproveProviderResponse,
  AdminChangeProviderTrustTagResponse,
  AdminChangeProviderBlockStatusResponse,
  AdminRejectProviderResponse,
  ProviderDashboardGraphRequest,
} from '../../shared/types/api/providerProfile';
import {
  UpdateFileDataRequest,
  FetchProvidersProofsResponse,
} from '../../shared/types/api/commonApiInterface';
import { PlanName } from '../../shared/types/enums';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';

// provider fetching own profile details
export const providerFetchMyProfileDetails = async (): Promise<
  ApiBaseResponse<ProviderFetchMyProfileDetailsResponse>
> => {
  const response = await axiosInstance.get('/providers/me');
  return response.data;
};

// provider updating own identity proof
export const providerUpdateIdentityProof = async (
  data: UpdateFileDataRequest,
): Promise<ApiBaseResponse<string>> => {
  const response = await axiosInstance.patch('/providers/me/identity', data);
  return response.data;
};

// provider updating own service proof
export const providerUpdateProofServiceProof = async (
  data: UpdateFileDataRequest,
): Promise<ApiBaseResponse<string>> => {
  const response = await axiosInstance.patch('/providers/me/service', data);
  return response.data;
};

// provider fetching own proofs
export const providerFetchMyProofs = async (): Promise<
  ApiBaseResponse<FetchProvidersProofsResponse>
> => {
  const response = await axiosInstance.get(`/providers/me/proofs`);
  return response.data;
};

// provider deleting own identity proof
export const providerDeleteIdentityProof = async (): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.delete('/providers/me/identity');
  return response.data;
};

// provider deleting own service proof
export const providerDeleteServiceProof = async (): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.delete('/providers/me/service');
  return response.data;
};

// provider submitting own details for review
export const providerSubmitDetailsForReview = createAsyncThunk<
  ApiBaseResponse<ProviderSubmitDetailsResponse>
>('/provider/profile/details', async () => {
  const response = await axiosInstance.patch('/providers/me/approval');
  return response.data;
});

// **** Provider Dashboard Apis

// provider fetch dashboard stats data
export const providerFetchDashboardStatsData = async (
  payload: ProviderFetchDashboardStatsDataRequest,
): Promise<ApiBaseResponse<ProviderFetchDashboardBookingStatsDataResponse>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/provider-dashboard/analytics/stats?${query}`);
  return response.data;
};

export const providerFetchDashboardRevenueStatsData = async (
  payload: ProviderFetchDashboardRevenueStatsDataRequest,
): Promise<ApiBaseResponse<ProviderFetchDashboardRevenueStatsDataResponse>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/payments/analytics/revenue-chart?${query}`);
  return response.data;
};

// provider fetch dashboard graph data
export const providerFetchDashboardGraphData = async (payload: ProviderDashboardGraphRequest): Promise<ApiBaseResponse<ProviderDashboardGraphResponse>> => {
  const response = await axiosInstance.get(`/provider-dashboard/graph`, {
    params: payload,
  });
  return response.data;
};

// **** other roles apis for providers resource

// admin

// admin fetch provider profile details
export const fetchProviderDetailsForAdmin = async (
  providerId: string,
): Promise<ApiBaseResponse<AdminFetchProviderProfileDetailsResponse>> => {
  const response = await axiosInstance.get(`/providers/${providerId}`);
  return response.data;
};

// admin fetch service providers
export const fetchServiceProvidersForAdmin: ApiFetchFunction<
  AdminFetchAllProvidersResponse,
  FetchFunctionBaseQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/providers?${query}`);
  return response.data.data;
};

// admin approve provider
export const  adminApproveProvider = async (
  data: AdminApproveProviderRequest,
): Promise<ApiBaseResponse<AdminApproveProviderResponse>> => {
  const response = await axiosInstance.patch(`/providers/${data.providerId}/approve`);
  return response.data;
};

// admin reject provider
export const adminRejectProvider = async (
  data: AdminRejectProviderRequest,
): Promise<ApiBaseResponse<AdminRejectProviderResponse>> => {
  const { providerId, ...payload } = data;
  const response = await axiosInstance.patch(`/providers/${providerId}/reject`, { ...payload });
  return response.data;
};

// admin change provider block status
export const adminChangeProviderBlockStatus = async (
  data: AdminChangeProviderBlockStatusRequest,
): Promise<ApiBaseResponse<AdminChangeProviderBlockStatusResponse>> => {
  const response = await axiosInstance.patch(`/providers/${data.providerId}/block`, {
    isBlocked: data.isBlocked,
  });
  return response.data;
};

// admin change provider trust tag
export const adminChangeProviderTrustTag = async (
  data: AdminChangeProviderTrustTagRequest,
): Promise<ApiBaseResponse<AdminChangeProviderTrustTagResponse>> => {
  const response = await axiosInstance.patch(`/providers/${data.providerId}/trust-tag`, {
    trustTag: data.trustedBySlotflow,
  });
  return response.data;
};

// admin fetch provider proofs
export const adminFetchProviderProofs = async (
  providerId: string,
): Promise<ApiBaseResponse<FetchProvidersProofsResponse>> => {
  const response = await axiosInstance.get(`/providers/${providerId}/proofs`);
  return response.data;
};

// user

// user fetch provider profile details
export const fetchProviderDetailsForUser = async (
  providerId: string,
): Promise<ApiBaseResponse<UserFetchProviderProfileDetailsResponse>> => {
  const response = await axiosInstance.get(`/providers/${providerId}`);
  return response.data;
};
