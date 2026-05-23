import { User } from "../entityInterface/userInterface";
import { Booking } from "../entityInterface/bookingInterface";

// request type of the fetch bookings api
export interface FetchBookingsQueryParams {
  online?: boolean;
}

// response interface of the fetch bookings api
export type FetchBookingsResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentStatus" | "appointmentTime" | "videoCallRoomId" | "createdAt" | "serviceProviderId">;

// response interface of the fetch bookings api
export interface FetchBookingDetailsResponse extends Pick<Booking, "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "createdAt" | "onlineTrack" | "statusTrack" | "videoCallRoomId"> {
  userId: Pick<User, "username" | "email">;
  serviceProviderId: Pick<User, "username" | "email">;
}

// request type of the validate room id api
export interface ValidateRoomId {
  appointmentId: Booking["_id"];
  roomId: Booking["videoCallRoomId"];
}

// request type of the book an appointment api
export type BookAnAppointmentRequest = {
  providerId: User["_id"];
  slotId: string;
  date: Date;
  selectedServiceMode: string;
}

// response interface of the book an appointment api
export type BookAppointmentResponse = string

// request type of the join room callback api
export interface JoinRoomCallbackRequest {
  videoCallRoomId: Booking["videoCallRoomId"],
  joined: boolean;
  joinedTime?: Date;
  leftCallTime?: Date;
}

// response interface of the join room callback api
export interface JoinRoomCallbackResponse {
  duration: number;
}

// request type of the provider change booking appointment status api
export interface changeAppointmentStatusRequest {
  appointmentId: Booking["_id"];
  appointmentStatus: Booking["appointmentStatus"];
}
