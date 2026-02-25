import { User } from "../entityInterface/userInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Provider } from "../entityInterface/providerInterface";

export interface FetchBookingsQueryParams {
  online?: boolean;
}

export type FetchBookingsResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentStatus" | "appointmentTime" | "videoCallRoomId" | "createdAt" | "serviceProviderId">;

export interface FetchBookingDetailsResponse extends Pick<Booking, "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "createdAt" | "onlineTrack" | "statusTrack" | "videoCallRoomId"> {
  userId: Pick<User, "username" | "email">;
  serviceProviderId: Pick<Provider, "username" | "email">;
} 

export interface ValidateRoomId {
  appointmentId: Booking["_id"];
  roomId: Booking["videoCallRoomId"];
}