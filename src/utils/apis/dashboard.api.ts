import { axiosInstance } from "@/lib/axios";
import {
    AdminDashboardGraphResponse,
    AdminFetchDashboardUserStatsDataResponse,
    AdminFetchDashboardTodayStatsDataResponse,
    AdminFetchDashboardProviderStatsDataResponse,
    AdminFetchDashboardAppointmentStatsDataResponse,
    AdminFetchDashboardSubscriptionStatsDataResponse,
    AdminFetchDashboardRevenueAndPaymentsStatsDataResponse,
} from "../interface/api/dashboard";

export const adminFetchDashboardTodayStatsData = async (): Promise<AdminFetchDashboardTodayStatsDataResponse> => {
    const response = await axiosInstance.get('/dashboard/today');
    return response.data.data;
}

export const adminFetchDashboardUserStatsData = async (): Promise<AdminFetchDashboardUserStatsDataResponse> => {
    const response = await axiosInstance.get('/dashboard/users');
    return response.data.data;
}

export const adminFetchDashboardProviderStatsData = async (): Promise<AdminFetchDashboardProviderStatsDataResponse> => {
    const response = await axiosInstance.get('/dashboard/providers');
    return response.data.data;
}

export const adminFetchDashboardSubscriptionStatsData = async (): Promise<AdminFetchDashboardSubscriptionStatsDataResponse> => {
    const response = await axiosInstance.get('/dashboard/subscriptions');
    return response.data.data;
}

export const adminFetchDashboardRevenueStatsData = async (): Promise<AdminFetchDashboardRevenueAndPaymentsStatsDataResponse> => {
    const response = await axiosInstance.get('/dashboard/revenue');
    return response.data.data;
}

export const adminFetchDashboardAppointmentStatsData = async (): Promise<AdminFetchDashboardAppointmentStatsDataResponse> => {
    const response = await axiosInstance.get('/dashboard/appointments');
    return response.data.data;
}

export const adminFetchDashboardGraphData = async (): Promise<AdminDashboardGraphResponse> => {
    const response = await axiosInstance.get('/dashboard/graph');
    return response.data.data;
}
