import { User } from "../entityInterface/userInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Availability } from "../entityInterface/serviceAvailabilityInterface";

// Used as the request type of the fetch bookings api
export interface FetchBookingsQueryParams {
  online?: boolean;
}

// Used as the response interface of the fetch bookings api
export type FetchBookingsResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentStatus" | "appointmentTime" | "videoCallRoomId" | "createdAt" | "serviceProviderId">;

// Used as the response interface of the fetch bookings api
export interface FetchBookingDetailsResponse extends Pick<Booking, "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "createdAt" | "onlineTrack" | "statusTrack" | "videoCallRoomId"> {
  userId: Pick<User, "username" | "email">;
  serviceProviderId: Pick<Provider, "username" | "email">;
}

// Used as the request type of the validate room id api
export interface ValidateRoomId {
  appointmentId: Booking["_id"];
  roomId: Booking["videoCallRoomId"];
}

// Used as the request type of the book an appointment api
export type BookAnAppointmentRequest = {
    providerId: Provider["_id"];
    slotId: string;
    date: Date;
    selectedServiceMode: string;
}

// Used as the response interface of the book an appointment api
export type BookAppointmentResponse = string

// Used as the request type of the join room callback api
export interface JoinRoomCallbackRequest {
    videoCallRoomId: Booking["videoCallRoomId"],
    joined: boolean;
    joinedTime?: Date;
    leftCallTime?: Date;
}

// Used as the response interface of the join room callback api
export type JoinRoomCallbackResponse = Pick<Availability, "duration">;

// Used as the request type of the provider change booking appointment status api
export interface changeAppointmentStatusRequest {
  appointmentId: Booking["_id"];
  appointmentStatus: Booking["appointmentStatus"];
}
