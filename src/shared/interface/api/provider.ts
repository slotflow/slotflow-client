import { ApiBaseResponse } from "../commonInterface";
import { User } from "../entityInterface/userInterface";
import { Address } from "../entityInterface/addressInterface";
import { Provider } from "../entityInterface/providerInterface";

// Used as the request interface for creating address api
export type ProviderCreateAddressRequest = Pick<Address, "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location">;

// Used as the response type for provider fetch self profile details api
export type ProviderFetchMyProfileDetailsResponse = Pick<Provider, "username" | "email" | "isAdminVerified" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt" | "trustedBySlotflow" | "updatedAt" | "adminVerificationStatus" | "isAddressVerified" | "isAvailabilityVerified" | "isProofsVerified" | "isServiceDetailsVerified">;

// Used as the response type for Provider profile image updating api
export interface ProviderUpdateProfileImageRequest {
  s3FileKey: string
}

// Used as the response interface for Provider profile image updating api
export interface ProviderUpdateProfileImageResponse extends ApiBaseResponse {
  data: Provider["profileImage"]
}

// Used as the request type for Provider update providerInfo [username and phone]
export type ProviderUpdateProviderInfoRequest = Pick<Provider, "username" | "phone">;

// Used as the response interface for Provider update providerInfo [username and phone]
export interface ProviderUpdateProviderInfoResponse extends ApiBaseResponse {
  data: ProviderUpdateProviderInfoRequest
}

// Used as the request interface of provider submit detials for review
export interface ProviderSubmitDetailsResponse extends ApiBaseResponse {
  data: Pick<Provider, "adminVerificationStatus">;
}

// Used as the return type for the provider fetch users for the chat side bar
export type ProviderFetchUsersForChatSidebarResponse = Array<Pick<User, "_id" | "username" | "profileImage">>

// Used as the request interface for the provider fetch dashboard data
export interface ProviderFetchDashboardStatsDataRequest {
  startDate?: Date;
  endDate?: Date;
}

// Used as the return interface for the provider fetch dashboard data
export interface ProviderFetchDashboardStatsDataResponse extends Record<string, number> {
  totalAppointments: number;
  completedAppointments: number;
  missedAppointments: number;
  cancelledAppointmentsByUser: number;
  rejectedAppointmentsByProvider: number;
  todaysAppointments: number;
}

// Used as the request interface for the provider fetch dashboard revenue data
export interface ProviderFetchDashboardRevenueStatsDataRequest {
  startDate?: Date;
  endDate?: Date;
}

// Used as the return interface for the provider fetch dashboard revenue data
export interface ProviderFetchDashboardRevenueStatsDataResponse extends Record<string, number> {
  totalSubscriptionPaidAmount: number;
  totalEarnings: number;
  totalPayoutsMade: number;
  pendingPayout: number;
}

// Used as the return interface for the provider fetch dashboard graph data
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

// Used as the response type of admin fetch provider profile details api
export type AdminFetchProviderProfileDetailsResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified" | "isAdminVerified" | "phone" | "profileImage" | "createdAt" | "trustedBySlotflow" | "adminVerificationStatus" | "isAddressVerified" | "isAvailabilityVerified" | "isProofsVerified" | "isServiceDetailsVerified">;

// Used as the response type of user fetch provider profile details api
export type UserFetchProviderProfileDetailsResponse = Pick<Provider, "username" | "email" | "phone" | "profileImage" | "trustedBySlotflow">;

// Used as the response type of admin fetch all providers api
export type AdminFetchAllProvidersResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "isEmailVerified" | "trustedBySlotflow" | "adminVerificationStatus">;

// Used as the request interfaces of admin reject provider
export type AdminRejectProviderRequest = Pick<Provider, "verificationRejectionReason" | "isAddressVerified" | "isServiceDetailsVerified" | "isAvailabilityVerified" | "isProofsVerified"> & {
    providerId: Provider["_id"];
}

// Used as the request type for the admin change provider block status api
export type AdminChangeProviderBlockStatusRequest = {
    providerId: Provider["_id"];
    isBlocked: Provider["isBlocked"];
}

// Used as the request type for the admin change provider trust tag api
export type AdminChangeProviderTrustTagRequest = {
    providerId: Provider["_id"];
    trustedBySlotflow: Provider["trustedBySlotflow"];
}

// Used as the state interface for the admin reject provider modal
export interface AdminRejectProviderModalState {
  modalState: boolean;
  providerId: string | null;
}