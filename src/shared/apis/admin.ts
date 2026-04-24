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

export const adminFetchDashboardUserStatsData = async (payload: AdminStatsDataRequest): Promise<AdminFetchDashboardUserStatsDataResponse> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/users?${query}`);
    return response.data.data;
}

export const adminFetchDashboardProviderStatsData = async (payload: AdminStatsDataRequest): Promise<AdminFetchDashboardProviderStatsDataResponse> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/providers?${query}`);
    return response.data.data;
}

export const adminFetchDashboardSubscriptionStatsData = async (payload: AdminStatsDataRequest): Promise<AdminFetchDashboardSubscriptionStatsDataResponse> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/subscriptions?${query}`);
    return response.data.data;
}

export const adminFetchDashboardAppointmentStatsData = async (payload: AdminStatsDataRequest): Promise<AdminFetchDashboardAppointmentStatsDataResponse> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/bookings?${query}`);
    return response.data.data;
}

// need to use
export const adminFetchDashboardGraphData = async (payload: AdminStatsDataRequest): Promise<AdminDashboardGraphResponse> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin-dashboard/graph?${query}`);
    return response.data.data;
}

// from payments
export const adminFetchDashboardRevenueStatsData = async (payload: AdminStatsDataRequest): Promise<AdminFetchDashboardRevenueAndPaymentsStatsDataResponse> => {
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/payments/revenue?${query}`);
    return response.data.data;
}
