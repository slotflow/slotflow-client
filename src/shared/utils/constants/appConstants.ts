import { NotificationType } from '@/shared/types/entity/notification';
import {
  DayMapInterface,
  NotificationChannel,
  dataSelectListItemInterface,
} from '../../types/common';


// Provider service availability component day map
export const dayMap: DayMapInterface = {
  Sun: { day: 'Sunday', tab: 0 },
  Mon: { day: 'Monday', tab: 1 },
  Tue: { day: 'Tuesday', tab: 2 },
  Wed: { day: 'Wednesday', tab: 3 },
  Thu: { day: 'Thursday', tab: 4 },
  Fri: { day: 'Friday', tab: 5 },
  Sat: { day: 'Saturday', tab: 6 },
};

// ChartHeader date selector data
export const dateSelectList: dataSelectListItemInterface[] = [
  { value: '7d', content: 'Last 7 days' },
  { value: '14d', content: 'Last 14 days' },
  { value: '30d', content: 'Last month' },
  { value: '60d', content: 'Last 2 months' },
  { value: '90d', content: 'Last 3 months' },
  { value: '180d', content: 'Last 6 months' },
  { value: '365d', content: 'Last year' },
];

export const notificationChannel = {
  EMAIL: 'email',
  PUSH: 'push',
  IN_APP: 'in_app',
} as const satisfies Record<string, NotificationChannel>;

export const notificationType = {
  ACCOUNT_ACTIVITY: 'account_activity',
  SYSTEM_UPDATES: 'system_updates',
  PROMOTIONAL_UPDATES: 'promotional_updates',
} as const satisfies Record<string, NotificationType>;

//
export const queryKeys = {
  PLANS: 'plans',
  USERS: 'users',
  REVIEWS: 'reviews',
  BOOKINGS: 'bookings',
  PAYMENTS: 'payments',
  PROVIDERS: 'providers',
  REFERRALS: 'REFERRALS',
  SUBSCRIPTIONS: 'subscriptions',
  NOTIFICATIONS: 'notifications',
  APP_SERVICES: 'app-services',

  PLAN: 'plan',
  REVENUE: 'revenue',
  BOOKING: 'booking',
  PAYMENT: 'payment',

  PLAN_DETAILS: 'plan-details',
  REFERRAL_DETAILS: 'referral-details',
  CREDIT_DETAILS: 'credit-details',

  USER_ENGAGEMENT_AI_RES: 'user-engagement-ai-res',
  PROVIDER_ENGAGEMENT_AI_RES: 'provider-engagement-ai-res',
  SUBSCRIPTION_USAGE_AI_RES: 'subscription-usage-ai-res',
  REVENUE_STATS_AI_RES: 'revenue-stats-ai-res',
  APPOINTMENT_AI_RES: 'appointment-ai-res',

  CREDIT_TRANSACTIONS: 'credit-transactions',
  CALENDAR_EVENTS: 'calendar-events',

  PROFILE: 'profile',
  ADDRESS: 'address',
  SERVICE: 'service',
  PROOFS: 'proofs',
  SUBSCRIPTION: 'subscription',
  SERVICE_AVAILABILITY: 'service-availability',

  DASHBOARD_STATS: 'dashboard-stats',
  DASHBOARD_GRAPH: 'dashboard-graph',
  DASHBOARD_USERS_STATS: 'dashboard-users-stats',
  DASHBOARD_PROVIDERS_STATS: 'dashboard-providers-stats',
  DASHBOARD_SUBSCRIPTION_STATS: 'dashboard-subscription-stats',
  DASHBOARD_REVENUE_STATS: 'dashboard-revenue-stats',
  DASHBOARD_APPOINTMENTS_STATS: 'dashboard-appointments-stats',

  LATEST_USERS: 'latest-users',
  LATEST_PROVIDERS: 'latest-providers',
  LATEST_SUBSCRIPTIONS: 'latest-subscriptions',
  LATEST_PAYMENTS: 'latest-payments',
  LATEST_APPOINTMENTS: 'latest-appointments',

  DASHBOARD_USERS_CHART: 'dashboard-users-chart',
  DASHBOARD_PROVIDERS_CHART: 'dashboard-providers-chart',
  DASHBOARD_APPOINTMENTS_CHART: 'dashboard-appointments-chart',
  DASHBOARD_REVENUE_CHART: 'dashboard-revenue-chart',
  DASHBOARD_SUBSCRPITION_CHART: 'dashboard-subscription-chart',
} as const;

//
export const aiResponseEntities = {
  USER: 'user',
  PROVIDER: 'provider',
  SUBSCRIPTION: 'subscription',
  REVENUE: 'revenue',
  APPOINTMENTS: 'appointments',
} as const;

//
export const dateFormats = {
  SHORT: 'dd MMM yyyy',                 // 16 Sep 2026
  FULL: 'dd MMMM yyyy',                  // 16 September 2026
  WITH_TIME: 'dd MMM yyyy, hh:mm a',        // 16 Sep 2026, 02:55 PM
  WITH_FULL_TIME: 'MM/dd/yyyy, hh:mm:ss a', // 09/16/2026, 02:55:16 PM (Replaces toLocaleString)
  ISO_DATE: 'yyyy-MM-dd',                // 2026-09-16
  TIME_12H: 'hh:mm a',                   // 02:55 PM
  TIME_12H_LOWER: 'hh:mm aa',             // 02:55 pm
  TIME_24H: 'HH:mm',                     // 14:55
  RANGE_MONTH_DAY: 'LLL dd',             // Sep 16
  RANGE_FULL: 'LLL dd, yyyy',            // Sep 16, 2026
} as const;

//
export const DEFAULT_ITEMS = [
    'AC Repairing',
    'Home Cleaning',
    'Plumbing Services',
    'Electrician near me',
    'Beauty & Spa',
];