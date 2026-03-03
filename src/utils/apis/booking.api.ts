import { axiosInstance } from "@/lib/axios";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Booking } from "../interface/entityInterface/bookingInterface";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { BookAnAppointmentRequest, BookAppointmentResponse, CheckBookingConfirmedResponse, FetchBookingDetailsResponse, FetchBookingsQueryParams, FetchBookingsResponse, ValidateRoomId } from "../interface/api/bookingApiInterface";

// fetch bookings
export const fetchBookings: ApiFetchFunction<
    FetchBookingsResponse,
    FetchBookingsQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/bookings/${query ? `?${query}` : ''}`);
    return parseNewCommonResponse(response.data.data);
}

// fetch a single booking details
export const fetchBookingDetails = async (bookingId: Booking["_id"]): Promise<FetchBookingDetailsResponse> => {
    const response = await axiosInstance.get(`/bookings/${bookingId}`);
    return response.data.data;
}

// validate joinRoom
export const validateRoomId = async (data: ValidateRoomId): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.get(`/bookings/${data.appointmentId}/can-join?roomId=${data.roomId}`);
    return response.data;
}

// check booking confirmed
export const checkBookingConfirmed = async (): Promise<CheckBookingConfirmedResponse> => {
    const response = await axiosInstance.get('/bookings/check');
    return response.data;
}

// create checkout session for booking an appointment
export const bookAnAppointment = async (data: BookAnAppointmentRequest): Promise<BookAppointmentResponse> => {
    const response = await axiosInstance.post('/bookings/checkout/session', data);
    return response.data;
}