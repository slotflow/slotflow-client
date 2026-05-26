import { axiosInstance } from "@/lib/axios";
import { ApiBaseResponse } from "../interface/commonInterface";
import { BookingFetchingFromCalendar } from "../interface/api/google";

export const fetchCalendarEvents = async (): Promise<ApiBaseResponse<BookingFetchingFromCalendar>> => {
    const response = await axiosInstance.get(`/google/calendar`);
    return response.data;
}
