import { axiosInstance } from "@/lib/axios";
import { buildQueryParams } from "../helper";
import { AdminFetchRevenueReportResponse, AdmminFetchRevenueReportRequest } from "../interface/api/adminReportApiInterface";

export const adminFetchRevenueReport = async (payload: AdmminFetchRevenueReportRequest): Promise<AdminFetchRevenueReportResponse> => {
    const { endDate, startDate } = payload;
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin/reports/revenue${query ? `?${query}` : ''}`, {
        params : {
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
        }
    });
    return response.data.data as AdminFetchRevenueReportResponse;
}
