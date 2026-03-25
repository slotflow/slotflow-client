import { axiosInstance } from "@/lib/axios";
import { BookingFetchingFromCalendar } from "../interface/api/google";

export const fetchCalendarEvents = async (): Promise<BookingFetchingFromCalendar> => {
    const response = await axiosInstance.get(`/google/calendar`);
    return response.data.data;
}
