import { Role } from '../enums';
import { StatMetric } from '../common';
import { DateRange } from 'react-day-picker';

// request type of the admin fetch dashboard stats data
export interface AdminStatsDataRequest extends Record<string, Date | undefined> {
  startDate?: Date;
  endDate?: Date;
}

// response type of admin fetch dashboard user stats data
export interface AdminFetchDashboardUserStatsDataResponse extends Record<
  string,
  StatMetric | undefined
> {
  totalUsers: StatMetric;
  blockedUsers?: StatMetric;
  NewUsers?: StatMetric;
  ReturningUsers?: StatMetric;
}

// response type of the admin fetch dashboard provider stats data
export interface AdminFetchDashboardProviderStatsDataResponse extends Record<
  string,
  StatMetric | undefined
> {
  totalProviders: StatMetric;
  adminVerifiedProviders: StatMetric;
  blockedProviders: StatMetric;
  slotflowTrustedProviders: StatMetric;
}

// response type of the admin fetch dashboard subscription stats data
export interface AdminFetchDashboardSubscriptionStatsDataResponse extends Record<
  string,
  StatMetric | undefined
> {
  activeSubscriptions: StatMetric;
  expiredSubscriptions: StatMetric;
  subscriptionsByFreePlan: StatMetric;
  subscriptionsByStarterPlan: StatMetric;
  subscriptionsByProfessionalPlan: StatMetric;
  subscriptionsByEnterprisePlan: StatMetric;
}

// response type of the admin fetch dashboard revenue stats data
export interface AdminFetchDashboardRevenueAndPaymentsStatsDataResponse extends Record<
  string,
  StatMetric | undefined
> {
  totalRevenue: StatMetric;
  totalRevenueViaSubscriptions: StatMetric;
  totalRevenueViaAppointments: StatMetric;
  totalRefundsIssued: StatMetric;
  totalFailedPayments: StatMetric;
  totalPayoutsToProviders: StatMetric;
}

// response type of the admin fetch dashboard appointments stats data
export interface AdminFetchDashboardAppointmentStatsDataResponse extends Record<
  string,
  StatMetric | undefined
> {
  totalAppointments: StatMetric;
  completedAppointments: StatMetric;
  cancelledAppointments: StatMetric;
  missedAppointments: StatMetric;
  rejectedAppointments: StatMetric;
}

// analytics ai
export interface AnalyticsAiRequest {
  dateRange: DateRange;
  entity: string;
}
export interface AnalyticsAiResponse {
  aiResponse: string;
}

// admin dashboard user chart data
export type AdminDashboardUserChartDataRequest = {
  startDate?: Date;
  endDate?: Date;
  role: Role;
};
export interface AdminDashboardUserChartDataResponse extends Record<
  string,
  string | number | undefined
> {
  date: string;
  newUsers: number;
  returningUsers: number;
}

// admin dashboard revenue chart data
export interface AdminDashboardRevenueChartDataResponse extends Record<
  string,
  string | number | undefined
> {
  date: string;
  totalRevenue: number;
  totalRefunds: number;
  netRevenue: number;
}

// admin dashboard subscription chart data
export interface AdminDashboardSubscriptionChartDataResponse extends Record<
  string,
  string | number | undefined
> {
  status: string;
  value: number;
}

// admin dashboard appointments charts data
export interface AdminGetBookingGraphDataResponse {
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
    status: 'completed' | 'missed' | 'cancelled' | 'rejected' | 'confirmed' | 'booked' | 'pending';
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
