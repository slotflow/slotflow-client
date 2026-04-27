import { axiosInstance } from "@/lib/axios";
import { parseResponse } from "../helper/parseResponse";
import { buildQueryParams } from "../helper/buildQueryParams";
import { Booking } from "../interface/entityInterface/bookingInterface";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { BookAnAppointmentRequest, BookAppointmentResponse, changeAppointmentStatusRequest, FetchBookingDetailsResponse, FetchBookingsQueryParams, FetchBookingsResponse, JoinRoomCallbackRequest, JoinRoomCallbackResponse, ValidateRoomId } from "../interface/api/booking";

// create checkout session for booking an appointment
export const bookAnAppointment = async (data: BookAnAppointmentRequest): Promise<ApiBaseResponse<BookAppointmentResponse>> => {
    const response = await axiosInstance.post('/bookings', data);
    return response.data;
}

// fetch bookings
export const fetchBookings: ApiFetchFunction<
    FetchBookingsResponse,
    FetchBookingsQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/bookings/?${query}`);
    return parseResponse(response.data.data);
}

// fetch a single booking details
export const fetchBookingDetails = async (bookingId: Booking["_id"]): Promise<ApiBaseResponse<FetchBookingDetailsResponse>> => {
    const response = await axiosInstance.get(`/bookings/${bookingId}`);
    return response.data;
}

// validate joinRoom
export const validateRoomId = async (data: ValidateRoomId): Promise<ApiBaseResponse<void>> => {
    const response = await axiosInstance.get(`/bookings/${data.appointmentId}/access?roomId=${data.roomId}`);
    return response.data;
}

// check booking confirmed
export const checkBookingConfirmed = async (): Promise<ApiBaseResponse<boolean>> => {
    const response = await axiosInstance.get('/bookings/recent');
    return response.data;
}

// cancel booking
export const cancelBooking = async (bookingId: Booking["_id"]): Promise<ApiBaseResponse<void>> => {
    const response = await axiosInstance.patch(`/bookings/${bookingId}`);
    return response.data;
}

// join or left online room
export const joinOrLeft = async (data: JoinRoomCallbackRequest): Promise<ApiBaseResponse<JoinRoomCallbackResponse>> => {
    const response = await axiosInstance.patch(`/bookings/${data.videoCallRoomId}/join-left`, {
        joined: data.joined,
        joinedTime: data.joinedTime,
        leftCallTime: data.leftCallTime,
    });
    return response.data;
}

// change appointment status
export const changeAppointmentStatus = async (data: changeAppointmentStatusRequest): Promise<ApiBaseResponse<void>> => {
    const response = await axiosInstance.patch(`/bookings/${data.appointmentId}/change-status`, data);
    return response.data;
}