import { axiosInstance } from '@/lib/axios';
import { ApiBaseResponse } from '../../shared/types/common';
import { BookingFetchingFromCalendar } from '../../shared/types/api/google';

export const fetchCalendarEvents = async (): Promise<
  ApiBaseResponse<BookingFetchingFromCalendar>
> => {
  const response = await axiosInstance.get(`/google/calendar`);
  return response.data;
};
