import {
  ValidateRoomIdRequest,
  CancelBookingRequest,
  FetchBookingsResponse,
  CancelBookingResponse,
  BookAppointmentResponse,
  JoinRoomCallbackRequest,
  BookAppointmentRequest,
  FetchBookingsQueryParams,
  JoinRoomCallbackResponse,
  FetchBookingDetailsResponse,
  ChangeAppointmentStatusRequest,
  ChangeAppointmentStatusResponse,
} from '../../shared/types/api/booking';
import { axiosInstance } from '@/lib/axios';
import { Booking } from '../../shared/types/entity/booking';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';
import { ApiBaseResponse, ApiFetchFunction } from '../../shared/types/common';

// create checkout session for booking an appointment
export const bookAnAppointment = async (
  data: BookAppointmentRequest,
): Promise<ApiBaseResponse<BookAppointmentResponse>> => {
  const response = await axiosInstance.post('/bookings', data);
  return response.data;
};

// fetch bookings
export const fetchBookings: ApiFetchFunction<
  FetchBookingsResponse,
  FetchBookingsQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/bookings/?${query}`);
  return response.data.data;
};

// fetch a single booking details
export const fetchBookingDetails = async (
  bookingId: Booking['_id'],
): Promise<ApiBaseResponse<FetchBookingDetailsResponse>> => {
  const response = await axiosInstance.get(`/bookings/${bookingId}/details`);
  return response.data;
};

// validate joinRoom
export const validateRoomId = async (payload: ValidateRoomIdRequest): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.get(
    `/bookings/${payload.appointmentId}/access?roomId=${payload.roomId}`,
  );
  return response.data;
};

// check booking confirmed
export const checkBookingConfirmed = async (): Promise<ApiBaseResponse<boolean>> => {
  const response = await axiosInstance.get('/bookings/recent');
  return response.data;
};

// cancel booking
export const cancelBooking = async (
  payload: CancelBookingRequest,
): Promise<ApiBaseResponse<CancelBookingResponse>> => {
  const response = await axiosInstance.patch(`/bookings/${payload.bookingId}/cancel`);
  return response.data;
};

// join or left online room
export const joinOrLeft = async (
  payload: JoinRoomCallbackRequest,
): Promise<ApiBaseResponse<JoinRoomCallbackResponse>> => {
  const response = await axiosInstance.patch(`/bookings/${payload.videoCallRoomId}/join-left`, {
    joined: payload.joined,
    joinedTime: payload.joinedTime,
    leftCallTime: payload.leftCallTime,
  });
  return response.data;
};

// change appointment status
export const changeAppointmentStatus = async (
  payload: ChangeAppointmentStatusRequest,
): Promise<ApiBaseResponse<ChangeAppointmentStatusResponse>> => {
  const response = await axiosInstance.patch(
    `/bookings/${payload.appointmentId}/change-status`,
    payload,
  );
  return response.data;
};
