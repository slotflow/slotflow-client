import { ApiBaseResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";
import { User } from "../entityInterface/userInterface";
import { Address } from "../entityInterface/addressInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { Availability, AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";

// **** Used as the request interface for adding address api
export type ProviderAddProviderAddressRequest = Pick<Address, "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location">;

// **** Used as the response type of provider fetch address api
export type ProviderFetchAddressResponse = Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "updatedAt">;


// **** Used as the response type of fetch all services api
export type ProviderFetchAllServicesResponse = Array<Pick<Service, "_id" | "serviceName">>;


// **** Used as the request interface for providerAddProviderServiceDetails api
export type ProviderCreateServiceDetailsRequest = Pick<ProviderService, "isGroupService" | "maxParticipants" | "requirements" | "serviceCategory" | "serviceDescription" | "serviceExperience" | "serviceMode" | "serviceName" | "servicePrice" | "serviceType" | "tags" | "videoUrl">;


// **** Used as the response type for provider fetch self service details
type FetchServiceDetailsResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "serviceExperience">;
export interface ProviderFetchServiceDetailsResponse extends FetchServiceDetailsResponse {
  serviceCategory: Pick<Service, "serviceName">
}


// **** Used as the request interface for provider service availability adding api
export interface AddProviderServiceAvailabilitiesRequest {
  data: Availability[];
}


// **** Used as the response type for provider fetch self profile details api
export type ProviderFetchProfileDetailsResponse = Pick<Provider, "username" | "email" | "isAdminVerified" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt" | "trustedBySlotflow" | "updatedAt">;


// **** Used as the response type for provider fetch self service availability
export type ProviderFetchServiceAvailabilityResponse = AvailabilityForResponse;


// **** Used as the response type for Provider profile image updating api
export interface ProviderUpdateProfileImageResponse extends ApiBaseResponse {
  data: Provider["profileImage"]
}


// **** Used as the response type for Provider fetch plans api
export type ProviderFetchPlansResponse = Pick<Plan, "_id" | "planName" | "price" | "features" | "description">;


// **** Used as the request type for Provider subscribe to a plan api
export type ProviderSubscribeToPlanRequest = {
  planId: Plan["_id"];
  planDuration: string
}
// **** Used as the response interface for Provider subscribe to a plan api
export interface ProviderSubscribeToPlanResponse extends ApiBaseResponse {
  data: string
}


// **** Inline interfaces used for the providerSaveSubscription api
export interface ProviderSaveSubscriptionResponse extends ApiBaseResponse {
  planName: Plan["planName"]
};

// **** Interfaces for providerFetchProviderSubscriptions api is in common interface api file


// **** Inline interfaces used for the providerSubscribeToTrialPlan api


// **** Interfaces for providerFetchProviderPayments api is in common interface api file


// **** Interfaces for providerFetchProviderBookingAppointments api is in common interface api file


// **** Used as the request type for Provider update providerInfo [username and phone]
export type ProviderUpdateProviderInfoRequest = Pick<Provider, "username" | "phone">
// **** Used as the response interface for Provider update providerInfo [username and phone]
export interface ProviderUpdateProviderInfoResponse extends ApiBaseResponse {
  data: ProviderUpdateProviderInfoRequest
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
