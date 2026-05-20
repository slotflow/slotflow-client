import { User } from "../entityInterface/userInterface";
import { ProviderProfile } from "../entityInterface/providerProfileInterface";

// response type of provider fetch self profile details api
export type ProviderFetchMyProfileDetailsResponse = Pick<ProviderProfile, "isAdminVerified" | "trustedBySlotflow" | "adminVerificationStatus" | "isAddressVerified" | "isAvailabilityVerified" | "isProofsVerified" | "isServiceDetailsVerified"> & Pick<User, "username" | "email" | "isBlocked" | "phone" | "createdAt" | "updatedAt" | "referralCode">;

// response type of provider submit detials for review api
export type ProviderSubmitDetailsResponse = Pick<ProviderProfile, "adminVerificationStatus">;

// request type of provider fetch dashboard stats data api
export interface ProviderFetchDashboardStatsDataRequest {
  startDate?: Date;
  endDate?: Date;
}

// response type of provider fetch dashboard stats data api
export interface ProviderFetchDashboardStatsDataResponse extends Record<string, number> {
  totalAppointments: number;
  completedAppointments: number;
  missedAppointments: number;
  cancelledAppointmentsByUser: number;
  rejectedAppointmentsByProvider: number;
  todaysAppointments: number;
}

// request type of provider fetch dashboard revenue stats data api
export interface ProviderFetchDashboardRevenueStatsDataRequest {
  startDate?: Date;
  endDate?: Date;
}

// response type of provider fetch dashboard revenue stats data api
export interface ProviderFetchDashboardRevenueStatsDataResponse extends Record<string, number> {
  totalSubscriptionPaidAmount: number;
  totalEarnings: number;
  totalPayoutsMade: number;
  pendingPayout: number;
}

// response type of provider fetch dashboard graph data api
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

// response type of admin fetch provider profile details api
export type AdminFetchProviderProfileDetailsResponse = Pick<ProviderProfile, "isAdminVerified" | "trustedBySlotflow" | "adminVerificationStatus" | "isAddressVerified" | "isAvailabilityVerified" | "isProofsVerified" | "isServiceDetailsVerified"> & Pick<User, "_id" | "username" | "email" | "isBlocked" | "phone" | "createdAt" | "profileImage">;

// response type of user fetch provider profile details api
export type UserFetchProviderProfileDetailsResponse = Pick<ProviderProfile, "trustedBySlotflow"> & Pick<User, "username" | "profileImage">;

// response type of admin fetch all providers api
export type AdminFetchAllProvidersResponse = Pick<ProviderProfile, "isAdminVerified" | "trustedBySlotflow" | "adminVerificationStatus"> & Pick<User, "_id" | "username" | "email" | "isBlocked">;

// request type of admin reject provider api
export type AdminRejectProviderRequest = Pick<ProviderProfile, "verificationRejectionReason" | "isAddressVerified" | "isServiceDetailsVerified" | "isAvailabilityVerified" | "isProofsVerified"> & {
  providerId: User["_id"];
}

// request type of admin change provider block status api
export type AdminChangeProviderBlockStatusRequest = {
  providerId: User["_id"];
  isBlocked: User["isBlocked"];
}

// request type of admin change provider trust tag api
export type AdminChangeProviderTrustTagRequest = {
  providerId: User["_id"];
  trustedBySlotflow: ProviderProfile["trustedBySlotflow"];
}