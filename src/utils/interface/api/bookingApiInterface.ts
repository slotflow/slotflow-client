import { ApiBaseResponse } from "../commonInterface";
import { User } from "../entityInterface/userInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Provider } from "../entityInterface/providerInterface";

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


// Used as the response interface of the validate room id api
export interface CheckBookingConfirmedResponse extends ApiBaseResponse {
  data: boolean
}


// Used as the request type of the book an appointment api
export type BookAnAppointmentRequest = {
    providerId: Provider["_id"];
    slotId: string;
    date: Date;
    selectedServiceMode: string;
}

// Used as the response interface of the book an appointment api
export interface BookAppointmentResponse extends ApiBaseResponse {
    data: string
}