import {
  ServiceType,
  ServiceCategory,
  AdminVerificationStatus,
} from '../types/enums';
import {
  TabItem,
  DayMapInterface,
  NotificationType,
  NotificationChannel,
  VerificationStatusConfig,
  dataSelectListItemInterface,
} from '../types/common';
import { OptionType } from '../types/common';
import { Variants } from 'framer-motion';


// Block Back Statuses
export const blockBackStatuses = [
  AdminVerificationStatus.REQUESTED,
  AdminVerificationStatus.UNDER_REVIEW,
  AdminVerificationStatus.RESUBMITTED,
] as const;

// Tabs for provider profile showing in admin side and provider side
export const providerTabs: TabItem[] = [
  { tabName: 'Address', value: 'address', admin: true, user: true },
  { tabName: 'Service', value: 'service', admin: true, user: true },
  { tabName: 'Availability', value: 'availability', admin: true, user: true },
  { tabName: 'Reviews', value: 'reviews', admin: true, user: true },
  { tabName: 'Subscriptions', value: 'subscriptions', admin: true, user: false },
  { tabName: 'Payments', value: 'payments', admin: true, user: false },
  { tabName: 'Proofs', value: 'proofs', admin: true, user: false },
];

// Tabs for user profile showing in admin side and user side
export const userTabs: TabItem[] = [
  { tabName: 'Address', value: 'address', admin: true, user: true },
  { tabName: 'Reviews', value: 'reviews', admin: true, user: true },
];

// Admin dashboard overview tabs
export const adminDashboardTabs: TabItem[] = [
  { tabName: 'Users', value: 'users', admin: true, user: false },
  { tabName: 'Providers', value: 'providers', admin: true, user: false },
  { tabName: 'Subscriptions', value: 'subscriptions', admin: true, user: false },
  { tabName: 'Revenue', value: 'revenue', admin: true, user: false },
  { tabName: 'Appointments', value: 'appointments', admin: true, user: false },
];

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

// Not chat selected shimmer constants
export const shimmerMessages: { align: string; height: string; width: string }[] = [
  { align: 'end', height: 'h-10', width: 'w-64' },
  { align: 'start', height: 'h-24', width: 'w-60' },
  { align: 'end', height: 'h-36', width: 'w-72' },
  { align: 'start', height: 'h-12', width: 'w-44' },
  { align: 'end', height: 'h-14', width: 'w-56' },
  { align: 'start', height: 'h-10', width: 'w-60' },
  { align: 'end', height: 'h-28', width: 'w-64' },
  { align: 'start', height: 'h-32', width: 'w-72' },
  { align: 'end', height: 'h-24', width: 'w-56' },
];

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

// Service type options
export const serviceTypeOptions: OptionType<ServiceType>[] = [
  { label: 'One Time', value: ServiceType.ONE_TIME },
  { label: 'Recurring', value: ServiceType.RECURRING },
];

// Group options
export const bookingTypeOptions: OptionType<boolean>[] = [
  { label: 'Group', value: true },
  { label: 'Individual', value: false },
];

// Days of Week Options
export const daysOfWeekOptions: OptionType<string>[] = [
  { label: 'Sunday', value: 'Sunday' },
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
];

// isAvailable for the day options
export const isAvailableOptions: OptionType<boolean>[] = [
  { label: 'Available', value: true },
  { label: 'Not Available', value: false },
];

// Service Duration Options
export const serviceDurationsOptions: OptionType<number>[] = [
  { label: '10 minutes', value: 10 },
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '45 minutes', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '1 hour 15 minutes', value: 75 },
  { label: '1 hour 30 minutes', value: 90 },
  { label: '1 hour 45 minutes', value: 105 },
  { label: '2 hours', value: 120 },
  { label: '3 hours', value: 180 },
  { label: '4hour', value: 240 },
  { label: '5 hours', value: 300 },
  { label: '6 hours', value: 360 },
  { label: '7 hours', value: 420 },
  { label: '8 hours', value: 480 },
];

// Service Categories Options
export const serviceCategoryOptions: OptionType<ServiceCategory>[] = [
  {
    label: 'Healthcare & Wellness',
    value: ServiceCategory.HEALTHCARE_AND_WELLNESS,
  },
  {
    label: 'Professional Services',
    value: ServiceCategory.PROFESSIONAL_SERVICES,
  },
  {
    label: 'Education & Training',
    value: ServiceCategory.EDUCATION_AND_TRAINING,
  },
  {
    label: 'Home & Maintenance',
    value: ServiceCategory.HOME_AND_MAINTENANCE,
  },
  {
    label: 'Beauty & Personal Care',
    value: ServiceCategory.BEAUTY_AND_PERSONAL_CARE,
  },
  {
    label: 'Fitness & Lifestyle',
    value: ServiceCategory.FITNESS_AND_LIFESTYLE,
  },
  {
    label: 'Automotive Services',
    value: ServiceCategory.AUTOMOTIVE_SERVICES,
  },
  {
    label: 'Events & Creative Services',
    value: ServiceCategory.EVENTS_AND_CREATIVE_SERVICES,
  },
  {
    label: 'Technology Services',
    value: ServiceCategory.TECHNOLOGY_SERVICES,
  },
  {
    label: 'Real Estate & Property',
    value: ServiceCategory.REAL_ESTATE_AND_PROPERTY,
  },
  {
    label: 'Food & Catering',
    value: ServiceCategory.FOOD_AND_CATERING,
  },
  {
    label: 'Travel & Hospitality',
    value: ServiceCategory.TRAVEL_AND_HOSPITALITY,
  },
  {
    label: 'Financial & Insurance',
    value: ServiceCategory.FINANCIAL_AND_INSURANCE,
  },
  {
    label: 'Pets & Animal Care',
    value: ServiceCategory.PETS_AND_ANIMAL_CARE,
  },
  {
    label: 'Legal & Government Services',
    value: ServiceCategory.LEGAL_AND_GOVERNMENT,
  },
  {
    label: 'Spiritual & Religious Services',
    value: ServiceCategory.SPIRITUAL_AND_RELIGIOUS,
  },
  {
    label: 'Childcare & Family Services',
    value: ServiceCategory.CHILDCARE_AND_FAMILY,
  },
  {
    label: 'Fashion & Tailoring',
    value: ServiceCategory.FASHION_AND_TAILORING,
  },
  {
    label: 'Photography & Media',
    value: ServiceCategory.PHOTOGRAPHY_AND_MEDIA,
  },
  {
    label: 'Business & Marketing',
    value: ServiceCategory.BUSINESS_AND_MARKETING,
  },
];

// Redux store constant
export const storeConstants: Record<string, string> = {
  storeKey: 'slotflow',
  resetState: 'RESET_STATE',
};

// Redirect paths
export const redirectPaths = {
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify/email',
  RESET_PASSWORD: '/reset/password',
  VERIFY_OTP: '/verify/otp',
  PRE_BOARDING_ROLE: '/preboarding/role',
  PRE_BOARDING_HEAR_ABOUT_US: '/preboarding/hear-about-us',
  ONBOARDING_ADDRESS: '/onboarding/address',
  ONBOARDING_SERVICE: '/onboarding/service',
  ONBOARDING_AVAILABILITY: '/onboarding/availability',
  ONBOARDING_PROOFS: '/onboarding/proofs',
  ONBOARDING_PENDING: '/onboarding/pending',
  SERVICES: '/services',
  DASHBOARD: '/dashboard',
  SERVICE_PROVIDERS: 'service-providers',

  BOOKINGS: '/bookings',
  SETTINGS: '/settings',
  UPGRADE: '/upgrade',
  INTEGRATIONS: '/settings/integrations'
} as const;

// Standalone routes to hide the sidebars and headers
export const standaloneRoutes = [redirectPaths.UPGRADE];

// to show user services page filters
export const filterShowsRoutes = [redirectPaths.SERVICE_PROVIDERS];


// Button classNames

// 1. Primary Page & Form Actions (Submit, Create, Save, Continue)
export const defaultBtnClass =
  "cursor-pointer inline-flex items-center justify-center bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] text-white transition-colors duration-200 disabled:opacity-50";
// Variant: "default"

// 2. Table Row & Action Bar Buttons (Filter, Export, Secondary Actions)
export const actionBtnClass =
  "cursor-pointer inline-flex items-center gap-2 px-3 py-2 font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all disabled:opacity-50";
// Variant: "secondary" (or "outline")

// 4. Irreversible Danger Actions (Delete, Remove, Revoke)
export const destructiveBtnClass =
  "cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium transition-colors shadow-sm disabled:opacity-50";
// Variant: "destructive"

// 5. Close button with only Cross
export const closeBtnClass = "cursor-pointer h-9 w-9 rounded-xl text-muted-foreground transition-colors"
// Variant: "ghost"


// Status preset data for the data cards
export const statsPresents: Record<
  string,
  { trueText: string; falseText: string; trueClass: string; falseClass: string }
> = {
  accountStatus: {
    trueText: 'Blocked',
    falseText: 'Active',
    trueClass: 'text-red-500',
    falseClass: 'text-green-500',
  },
  trustStatus: {
    trueText: 'Trusted',
    falseText: 'Not Trusted',
    trueClass: 'text-green-500',
    falseClass: 'text-gray-400',
  },
  verificationStatus: {
    trueText: 'Verified',
    falseText: 'Not Verified',
    trueClass: 'text-green-500',
    falseClass: 'text-red-500',
  },
  addressStatus: {
    trueText: 'Verified',
    falseText: 'Not Verified',
    trueClass: 'text-green-500',
    falseClass: 'text-red-500',
  },
  availabilityStatus: {
    trueText: 'Available',
    falseText: 'Not Available',
    trueClass: 'text-green-500',
    falseClass: 'text-red-500',
  },
};

// User dashboard providers list card gradients
export const cardGradients: string[] = [
  'bg-gradient-to-r from-violet-200 to-violet-400',
  'bg-gradient-to-r from-lime-100 to-green-300',
  'bg-gradient-to-r from-red-100 to-orange-200',
  'bg-gradient-to-r from-amber-100 to-yellow-200',
  'bg-gradient-to-r from-sky-100 to-blue-300',
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
export const adminVerificationStatusConfig: Record<AdminVerificationStatus, VerificationStatusConfig> = {
  [AdminVerificationStatus.REQUESTED]: {
    type: 'pending',
    label: 'Requested',
    desc: 'Submitted for review',
  },
  [AdminVerificationStatus.UNDER_REVIEW]: {
    type: 'pending',
    label: 'Under Review',
    desc: 'Currently under review',
  },
  [AdminVerificationStatus.APPROVED]: {
    type: 'verified',
    label: 'Approved',
    desc: 'Approved',
  },
  [AdminVerificationStatus.REJECTED]: {
    type: 'unverified',
    label: 'Rejected',
    desc: 'Rejected',
  },
  [AdminVerificationStatus.RESUBMITTED]: {
    type: 'pending',
    label: 'Re-submitted',
    desc: 'Re-submitted for review',
  },
  [AdminVerificationStatus.NOT_REQUESTED]: {
    type: 'standard',
    label: 'Not Requested',
    desc: 'Not submitted',
  },
};

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

// motion constant
export const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};