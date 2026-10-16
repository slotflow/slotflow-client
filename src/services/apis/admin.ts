import { axiosInstance } from '@/lib/axios';
import {
  AdminStatsDataRequest,
  AdminFetchDashboardUserStatsDataResponse,
  AdminFetchDashboardProviderStatsDataResponse,
  AdminFetchDashboardAppointmentStatsDataResponse,
  AdminFetchDashboardSubscriptionStatsDataResponse,
  AdminFetchDashboardRevenueAndPaymentsStatsDataResponse,
  AnalyticsAiResponse,
  AnalyticsAiRequest,
  AdminDashboardUserChartDataResponse,
  AdminGetBookingGraphDataResponse,
  AdminDashboardUserChartDataRequest,
  AdminDashboardRevenueChartDataResponse,
  AdminDashboardSubscriptionChartDataResponse,
} from '../../shared/types/api/adminDashboard';
import { ApiBaseResponse } from '../../shared/types/common';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';

// stats data

export const adminFetchDashboardUserStatsData = async (
  payload: AdminStatsDataRequest,
): Promise<ApiBaseResponse<AdminFetchDashboardUserStatsDataResponse>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/admin-dashboard/analytics/users-stats?${query}`);
  return response.data;
};

export const adminFetchDashboardProviderStatsData = async (
  payload: AdminStatsDataRequest,
): Promise<ApiBaseResponse<AdminFetchDashboardProviderStatsDataResponse>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/admin-dashboard/analytics/providers-stats?${query}`);
  return response.data;
};

export const adminFetchDashboardSubscriptionStatsData = async (
  payload: AdminStatsDataRequest,
): Promise<ApiBaseResponse<AdminFetchDashboardSubscriptionStatsDataResponse>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(
    `/admin-dashboard/analytics/subscriptions-stats?${query}`,
  );
  return response.data;
};

export const adminFetchDashboardAppointmentStatsData = async (
  payload: AdminStatsDataRequest,
): Promise<ApiBaseResponse<AdminFetchDashboardAppointmentStatsDataResponse>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/admin-dashboard/analytics/bookings-stats?${query}`);
  return response.data;
};

// from payments
export const adminFetchDashboardRevenueStatsData = async (
  payload: AdminStatsDataRequest,
): Promise<ApiBaseResponse<AdminFetchDashboardRevenueAndPaymentsStatsDataResponse>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/payments/analytics/revenue-stats?${query}`);
  return response.data;
};

// Chart data

// admin dashboard user and provider char data
export const fetchRoleBasedChartData = async (
  payload?: AdminDashboardUserChartDataRequest,
): Promise<ApiBaseResponse<AdminDashboardUserChartDataResponse[]>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/admin-dashboard/analytics/role-chart?${query}`);
  return response.data;
};

// admin dashboard booking chart data
export const adminFetchDashboardBookingChartData = async (
  payload: AdminStatsDataRequest,
): Promise<ApiBaseResponse<AdminGetBookingGraphDataResponse>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/admin-dashboard/analytics/bookings-chart?${query}`);
  return response.data;
};

// admin dashboard payments chart data
export const adminFetchDashboardRevenueChartData = async (
  payload: AdminStatsDataRequest,
): Promise<ApiBaseResponse<AdminDashboardRevenueChartDataResponse[]>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(`/payments/analytics/revenue-chart?${query}`);
  return response.data;
};

// admin dashboard subscription graph data
export const adminFetchDashboardSubscriptionChartData = async (
  payload: AdminStatsDataRequest,
): Promise<ApiBaseResponse<AdminDashboardSubscriptionChartDataResponse[]>> => {
  const query = buildQueryParams(payload);
  const response = await axiosInstance.get(
    `/admin-dashboard/analytics/subscription-chart?${query}`,
  );
  return response.data;
};

// AI  Trend response
// TODO IMPLEMENT
// admin dashboard [ different entities ] data ai anakytics fetching from ai service
export const fetchAnalyticsInsight = async (
  payload: AnalyticsAiRequest,
): Promise<ApiBaseResponse<AnalyticsAiResponse>> => {
  // const query = buildQueryParams(payload);
  // const response = await axiosInstance.get(`/ai-service/insights/${query}`);
  // return response.data;
  return {
    message: 'success',
    success: true,
    data: {
      aiResponse: `Ai response will be soon with payload ${payload}`,
    },
  };
};
