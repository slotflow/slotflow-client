import { ApiBaseResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";
import { User } from "../entityInterface/userInterface";
import { Address } from "../entityInterface/addressInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { Availability, AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";
import { PlanName, SubscriptionStatus, SubscriptionValidity } from "../enums";

// **** Used as the request interface for creating address api
export type ProviderCreateAddressRequest = Pick<Address, "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location">;

// **** Used as the response type of provider fetch address api
export type ProviderFetchAddressResponse = Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "updatedAt" | "landMark" | "location" | "countryCode">;


// **** Used as the response type of fetch all services api
export type ProviderFetchAllAppServiceRequest = Pick<Service, "serviceCategory">;
export type ProviderFetchAllServicesResponse = Array<Pick<Service, "_id" | "serviceName">>;


// **** Used as the request interface for providerCreateServiceDetails api
export type ProviderCreateServiceDetailsRequest = Pick<ProviderService, "isGroupService" | "maxParticipants" | "requirements" | "service" | "serviceDescription" | "serviceExperience" | "serviceMode" | "serviceName" | "servicePrice" | "serviceType" | "tags" | "videoUrl">;

// **** Used as the request interface for providerUpdateServiceDetails api
export type ProviderUpdateServiceDetailsRequest = Pick<ProviderService, "_id" | "isGroupService" | "maxParticipants" | "requirements" | "service" | "serviceDescription" | "serviceExperience" | "serviceMode" | "serviceName" | "servicePrice" | "serviceType" | "tags" | "videoUrl">;


// **** Used as the response type for provider fetch self service details
type FetchServiceDetailsResponse = Pick<ProviderService, "_id" | "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience" | "isGroupService" | "maxParticipants" | "requirements" | "serviceMode" | "serviceType" | "tags" | "videoUrl">;
export interface ProviderFetchServiceDetailsResponse extends FetchServiceDetailsResponse {
  service: Pick<Service, "serviceName">
}


// **** Used as the request interface for provider service availability creating api
export interface CreateProviderServiceAvailabilitiesRequest {
  data: Availability[];
}


// **** Used as the response type for provider fetch self profile details api
export type ProviderFetchProfileDetailsResponse = Pick<Provider, "username" | "email" | "isAdminVerified" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt" | "trustedBySlotflow" | "updatedAt" | "adminVerificationStatus" | "isAddressVerified" | "isAvailabilityVerified" | "isProofsVerified" | "isServiceDetailsVerified">;


// **** Used as the response type for provider fetch self service availability
export type ProviderFetchServiceAvailabilityResponse = AvailabilityForResponse;


// **** Used as the response type for Provider profile image updating api
export interface ProviderUpdateProfileImageRequest {
  s3FileKey: string
}
export interface ProviderUpdateProfileImageResponse extends ApiBaseResponse {
  data: Provider["profileImage"]
}


// **** Used as the response type for Provider fetch plans api
export type ProviderFetchPlansResponse = Pick<Plan, "_id" | "planName" | "price" | "features" | "description">;


// **** Used as the request type for Provider subscribe to a plan api
export type ProviderCheckoutForSubscribePlanRequest = {
  planId: Plan["_id"];
  planDuration: SubscriptionValidity
}
// **** Used as the response interface for Provider subscribe to a plan api
export interface ProviderSubscribeToPlanResponse extends ApiBaseResponse {
  data: string
}

// **** Interfaces for providerFetchSubscriptions api is in common interface api file


// **** Inline interfaces used for the providerSubscribeToTrialPlan api


// **** Interfaces for providerFetchPayments api is in common interface api file


// **** Interfaces for providerFetchProviderBookingAppointments api is in common interface api file


// **** Used as the request type for Provider update providerInfo [username and phone]
export type ProviderUpdateProviderInfoRequest = Pick<Provider, "username" | "phone">
// **** Used as the response interface for Provider update providerInfo [username and phone]
export interface ProviderUpdateProviderInfoResponse extends ApiBaseResponse {
  data: ProviderUpdateProviderInfoRequest
}


// **** Used as the request interface of provider submit detials for review
export interface ProviderSubmitDetailsResponse extends ApiBaseResponse {
  data: Pick<Provider, "adminVerificationStatus">;
}


// **** Used as the return type for the provider fetch users for the chat side bar
export type ProviderFetchUsersForChatSidebarResponse = Array<Pick<User, "_id" | "username" | "profileImage">>


// **** Used as the return interface for the provider fetch dashboard data
export interface ProviderFetchDashboardStatsDataResponse extends Record<string, number> {
  totalAppointments: number;
  completedAppointments: number;
  missedAppointments: number;
  cancelledAppointmentsByUser: number;
  rejectedAppointmentsByProvider: number;
  todaysAppointments: number;
  totalSubscriptionPaidAmount: number;
  totalEarnings: number;
  todaysEarnings: number;
  totalPayoutsMade: number;
  pendingPayout: number;
}


// **** Used as the return interface for the provider fetch dashboard graph data
export interface ProviderDashboardGraphResponse {
  appointmentsOvertimeChartData: Array<{
    date: string;
    completed: number;
    missed: number;
    cancelled: number;
  }>;

  peakBookingHoursChartData: Array<{
    date: string;
    hour: string;
    bookings: number;
  }>;

  appointmentModeChartData: Array<{
    date: string;
    online: number;
    offline: number;
  }>;

  completionBreakdownChartData: Array<{
    status: 'completed' | 'missed' | 'cancelled' | 'rejected' | "confirmed" | "booked";
    value: number;
  }>;

  newVsReturningUsersChartData: Array<{
    date: string;
    newUsers: number;
    returningUsers: number;
  }>;

  topBookingDaysChartData: Array<{
    day: string;
    count: number;
  }>;

}


// **** Used as the request interface for the provider change booking appointment status
export interface ProviderChangeAppointmentStatusRequest {
  appointmentId: Booking["_id"];
  appointmentStatus: Booking["appointmentStatus"];
}


// **** Address updating interfaces are in common interface file


export interface ProviderGetMySubscriptionResponse extends ApiBaseResponse {
  data : {
    providerId: string;
    subscribedPlan: PlanName;
    startDate: Date;
    endDate: Date;
    subscriptionStatus: SubscriptionStatus;
  }
}