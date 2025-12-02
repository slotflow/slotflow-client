import { User } from "../entityInterface/userInterface";
import { Plan } from "../entityInterface/planInterface";
import { Review } from "../entityInterface/reviewInterface";
import { Payment } from "../entityInterface/paymentInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Address } from "../entityInterface/addressInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";
import { Availability } from "../entityInterface/serviceAvailabilityInterface";
import { ApiBaseResponse, FetchFunctionParams, RoleType } from "../commonInterface";

// **** Used as the response type of fetch provider subscriptions for admin side and provider side
export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName">;


// **** Used as the return type of fetch payments for admin side, provider side
export type FetchPaymentsResponse = Pick<Payment, "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">


// **** Used as the response type fetch all bookings for provider side and user side
// used as the ProviderAppointmentsBookingTableColumns type
// used as the userAllBookingsTableColumns type
// used in the ProviderAppointmentsPage CommonTable type
// used in the UserBookingsPage CommonTable type
// used as the providerFetchBookingAppoinments api response type
// used as the userFetchBookings api response type
export type FetchBookingsResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "videoCallRoomId" | "createdAt" | "serviceProviderId">;

// **** Used as the request and response type and interface fetch all online bookings for provider side and user side
export type FetchOnlineBookingParams = FetchFunctionParams & { online?: boolean, raw?: boolean };
export type FetchOnlineBookingsForProviderResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentStatus" | "appointmentTime" | "videoCallRoomId" | "createdAt"> & Pick<User, "username">;
export type FetchOnlineBookingsForUserResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentStatus" | "appointmentTime" | "videoCallRoomId" | "createdAt"> & Pick<Provider, "username">;


// **** AddressUpdating request type and response interface used by user and provider
export type UpdateAddressRequest = Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location">;
export interface UpdateAddressResponse extends ApiBaseResponse {
  data: Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location" | "updatedAt">;
}


// **** Validate booking video call room id request interface used by the provider and the user
export interface ValidateRoomId {
  appointmentId: Booking["_id"];
  roomId: Booking["videoCallRoomId"];
}



// **** Used as the response interface for the adminFetchSubscriptionDetails api  
type SubscriptionProps = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus" | "createdAt">;
type PaymentsProps = Pick<Payment, "transactionId" | "discountAmount" | "initialAmount" | "paymentFor" | "paymentGateway" | "paymentMethod" | "paymentStatus" | "totalAmount">;
type PlanProps = Pick<Plan, "planName" | "price" | "adVisibility" | "maxBookingPerMonth">;
export interface FetchSubscriptionDetailsResponse extends SubscriptionProps {
  subscriptionPlanId: PlanProps,
  paymentId: PaymentsProps,
}



// **** Used as the request interface for the join room callback api
export interface JoinRoomCallbackRequest {
    videoCallRoomId: Booking["videoCallRoomId"],
    role: RoleType,
    joined: boolean;
    joinedTime?: Date;
    leftCallTime?: Date;
}

export interface JoinRoomCallbackResponse extends ApiBaseResponse {
  data: Pick<Availability, "duration">
};


// **** Used as the return type of the user fetching user reviews
export interface FetchReviewsResponse extends Pick<Review, "_id" | "createdAt" | "reviewText" | "rating" | "reported" | "isBlocked"> {
  userId: Pick<User, "username" | "profileImage">;
  providerId: Pick<Provider, "username" | "profileImage">;
};


// **** Used as the response type of the admin fetch provider or user address api
export type AdminFetchddressResponse = Pick<Address, "userId" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country">;


// **** Used as the response type of the booking details fetching
export interface FetchBookingDetailsResponse extends Pick<Booking, "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "createdAt" | "onlineTrack" | "statusTrack" | "videoCallRoomId"> {
  userId: Pick<User, "username" | "email">;
  serviceProviderId: Pick<Provider, "username" | "email">;
} 


// **** Used as the request interface of update file
export interface UpdateFileDataRequest {
  s3FileKey: string;
  field: string;
}
export interface UpdateFileDataResponse extends ApiBaseResponse {
  data: string;
}