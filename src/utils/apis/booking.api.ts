import { axiosInstance } from "@/lib/axios";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Booking } from "../interface/entityInterface/bookingInterface";
import { ApiBaseResponse, ApiPaginatedResponse, FetchFunctionParams } from "../interface/commonInterface";
import { FetchBookingDetailsResponse, FetchBookingsResponse, ValidateRoomId } from "../interface/api/commonApiInterface";

// fetch bookings
export const fetchBookings = async <T extends FetchBookingsResponse>(params?: FetchFunctionParams): Promise<ApiPaginatedResponse<T>> => {
    const query = buildQueryParams<FetchFunctionParams>(params);
    const response = await axiosInstance.get(`/bookings/${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<T>(response.data.data);
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