import { User } from '../entity/user';
import { ProviderProfile } from '../entity/providerProfile';
import { StatMetric } from '../common';

// Fetch self profile details ( by provider )
export type ProviderFetchMyProfileDetailsResponse = Pick<
  ProviderProfile,
  | 'isAdminVerified'
  | 'trustedBySlotflow'
  | 'adminVerificationStatus'
  | 'isAddressVerified'
  | 'isAvailabilityVerified'
  | 'isProofsVerified'
  | 'isServiceDetailsVerified'
> &
  Pick<
    User,
    'username' | 'email' | 'isBlocked' | 'phone' | 'createdAt' | 'updatedAt' | 'referralCode'
  >;

// Submit detials for review ( by provider )
export type ProviderSubmitDetailsResponse = Pick<ProviderProfile, 'adminVerificationStatus'>;

// Fetch dashboard stats data ( by provider )
export interface ProviderFetchDashboardStatsDataRequest {
  startDate?: Date;
  endDate?: Date;
}

// Fetch dashboard stats data ( by provider )
export interface ProviderFetchDashboardBookingStatsDataResponse extends Record<string, StatMetric | undefined> {
  totalAppointments: StatMetric;
  completedAppointments: StatMetric;
  missedAppointments: StatMetric;
  cancelledAppointmentsByUser: StatMetric;
  rejectedAppointmentsByProvider: StatMetric;
  todaysAppointments: StatMetric;
}

// Fetch dashboard revenue stats data ( by provider )
export interface ProviderFetchDashboardRevenueStatsDataRequest {
  startDate?: Date;
  endDate?: Date;
}

// Fetch dashboard revenue stats data ( by provider )
export interface ProviderFetchDashboardRevenueStatsDataResponse extends Record<string, StatMetric | undefined> {
  totalSubscriptionPaidAmount: StatMetric;
  totalEarnings: StatMetric;
  totalPayoutsMade: StatMetric;
  pendingPayout: StatMetric;
}

// Fetch dashboard graph data ( by provider )
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
    status: 'completed' | 'missed' | 'cancelled' | 'rejected' | 'confirmed' | 'booked';
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

// Fetch provider profile details ( by admin )
export type AdminFetchProviderProfileDetailsResponse = Pick<
  ProviderProfile,
  | 'isAdminVerified'
  | 'trustedBySlotflow'
  | 'adminVerificationStatus'
  | 'isAddressVerified'
  | 'isAvailabilityVerified'
  | 'isProofsVerified'
  | 'isServiceDetailsVerified'
> &
  Pick<User, '_id' | 'username' | 'email' | 'isBlocked' | 'phone' | 'createdAt' | 'profileImage'>;

// Fetch provider profile details ( by user )
export type UserFetchProviderProfileDetailsResponse = Pick<ProviderProfile, 'trustedBySlotflow'> &
  Pick<User, 'username' | 'profileImage'>;

// Fetch all providers ( by admin )
export type AdminFetchAllProvidersResponse = Pick<
  ProviderProfile,
  'isAdminVerified' | 'trustedBySlotflow' | 'adminVerificationStatus'
> &
  Pick<User, '_id' | 'username' | 'email' | 'isBlocked'>;

// Reject provider ( by admin )
export type AdminRejectProviderRequest = Pick<
  ProviderProfile,
  | 'verificationRejectionReason'
  | 'isAddressVerified'
  | 'isServiceDetailsVerified'
  | 'isAvailabilityVerified'
  | 'isProofsVerified'
> & {
  providerId: User['_id'];
};
export type AdminRejectProviderResponse = Pick<User, '_id'> &
  Pick<
    ProviderProfile,
    'isAddressVerified' | 'isServiceDetailsVerified' | 'isAvailabilityVerified' | 'isProofsVerified'
  >;

// Change provider block status ( by admin )
export type AdminChangeProviderBlockStatusRequest = {
  providerId: User['_id'];
  isBlocked: User['isBlocked'];
};
export type AdminChangeProviderBlockStatusResponse = Pick<User, '_id' | 'isBlocked'>;

// Change provider trust tag ( by admin )
export type AdminChangeProviderTrustTagRequest = {
  providerId: User['_id'];
} & Pick<ProviderProfile, 'trustedBySlotflow'>;
export type AdminChangeProviderTrustTagResponse = Pick<User, '_id'> &
  Pick<ProviderProfile, 'trustedBySlotflow'>;

// Approve provider ( by admin )
export interface AdminApproveProviderRequest {
  providerId: User['_id'];
}
export type AdminApproveProviderResponse = Pick<User, '_id'> &
  Pick<ProviderProfile, 'isAdminVerified' | 'adminVerificationStatus'>;
