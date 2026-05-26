import { axiosInstance } from "@/lib/axios";
import {
    AdminStatsDataRequest,
    AdminDashboardGraphResponse,
    AdminFetchDashboardUserStatsDataResponse,
    AdminFetchDashboardProviderStatsDataResponse,
    AdminFetchDashboardAppointmentStatsDataResponse,
    AdminFetchDashboardSubscriptionStatsDataResponse,
    AdminFetchDashboardRevenueAndPaymentsStatsDataResponse,
} from "../interface/api/adminDashboard";
import { buildQueryParams } from "../helper/buildQueryParams";
import { ApiBaseResponse } from "../interface/commonInterface";

export const adminFetchDashboardUserStatsData = async (payload: AdminStatsDataRequest): Promise<ApiBaseResponse<AdminFetchDashboardUserStatsDataResponse>> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/users?${query}`);
    return response.data;
}

export const adminFetchDashboardProviderStatsData = async (payload: AdminStatsDataRequest): Promise<ApiBaseResponse<AdminFetchDashboardProviderStatsDataResponse>> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/providers?${query}`);
    return response.data;
}

export const adminFetchDashboardSubscriptionStatsData = async (payload: AdminStatsDataRequest): Promise<ApiBaseResponse<AdminFetchDashboardSubscriptionStatsDataResponse>> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/subscriptions?${query}`);
    return response.data;
}

export const adminFetchDashboardAppointmentStatsData = async (payload: AdminStatsDataRequest): Promise<ApiBaseResponse<AdminFetchDashboardAppointmentStatsDataResponse>> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/bookings?${query}`);
    return response.data;
}

// need to use
export const adminFetchDashboardGraphData = async (payload: AdminStatsDataRequest): Promise<ApiBaseResponse<AdminDashboardGraphResponse>> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/graph?${query}`);
    return response.data;
}

// from payments
export const adminFetchDashboardRevenueStatsData = async (payload: AdminStatsDataRequest): Promise<ApiBaseResponse<AdminFetchDashboardRevenueAndPaymentsStatsDataResponse>> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/payments/revenue?${query}`);
    return response.data;
}
