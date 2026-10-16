import { OptionType, PlanFeatureInterface } from '@/shared/types/common';
import { RouteNames } from './routeConstants';
import { PlanName } from '@/shared/types/enums';

// Access Control For Provider
export const planAccessMap: Record<PlanName, RouteNames[]> = {
  [PlanName.NO_SUBSCRIPTION]: [
    RouteNames.DASHBOARD,
    RouteNames.PROFILE,
    RouteNames.SUBSCRIPTIONS,
    RouteNames.CREDITS,
    RouteNames.REFERRALS,
    RouteNames.SETTINGS,
  ],
  [PlanName.TRIAL]: [
    RouteNames.DASHBOARD,
    RouteNames.PROFILE,
    RouteNames.BOOKINGS,
    RouteNames.SUBSCRIPTIONS,
    RouteNames.CREDITS,
    RouteNames.REFERRALS,
    RouteNames.SETTINGS,
  ],
  [PlanName.STARTER]: [
    RouteNames.DASHBOARD,
    RouteNames.PROFILE,
    RouteNames.BOOKINGS,
    RouteNames.SUBSCRIPTIONS,
    RouteNames.PAYMENTS,
    RouteNames.CALENDAR,
    RouteNames.CREDITS,
    RouteNames.REFERRALS,
    RouteNames.SETTINGS,
  ],
  [PlanName.PROFESSIONAL]: [
    RouteNames.DASHBOARD,
    RouteNames.PROFILE,
    RouteNames.BOOKINGS,
    RouteNames.SUBSCRIPTIONS,
    RouteNames.PAYMENTS,
    RouteNames.CALENDAR,
    RouteNames.CREDITS,
    RouteNames.REFERRALS,
    RouteNames.CHAT,
    RouteNames.REVIEWS,
    RouteNames.SETTINGS,
  ],
  [PlanName.ENTERPRISE]: [
    RouteNames.DASHBOARD,
    RouteNames.PROFILE,
    RouteNames.BOOKINGS,
    RouteNames.SUBSCRIPTIONS,
    RouteNames.PAYMENTS,
    RouteNames.CALENDAR,
    RouteNames.CREDITS,
    RouteNames.REFERRALS,
    RouteNames.CHAT,
    RouteNames.REVIEWS,
    RouteNames.SETTINGS,
  ],
};

//// Plan feature comparison table
export const planFeatures: PlanFeatureInterface[] = [
  {
    type: 'Booking',
    features: [
      {
        name: 'Appointment booking',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'Booking limit',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
        limit: {
          trial: '30 bookings (14 days)',
          starter: '300 bookings/month',
          professional: 'Unlimited',
          enterprise: 'Unlimited',
        },
      },
      {
        name: 'Online appointment booking',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
    ],
  },
  {
    type: 'Notifications',
    features: [
      {
        name: 'In-app notifications',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'Email notifications',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'Push notifications',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'WhatsApp notifications',
        trial: false,
        starter: false,
        professional: true,
        enterprise: true,
        inDevelopment: true,
      },
      {
        name: 'Mobile/SMS notifications',
        trial: false,
        starter: false,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
    ],
  },
  {
    type: 'Integrations',
    features: [
      {
        name: 'Google Calendar integration',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'Stripe payout integration',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'WhatsApp integration',
        trial: false,
        starter: false,
        professional: true,
        enterprise: true,
        inDevelopment: true,
      },
      {
        name: 'Notion integration',
        trial: false,
        starter: false,
        professional: true,
        enterprise: true,
        inDevelopment: true,
      },
      {
        name: 'Custom integrations & Webhooks',
        trial: false,
        starter: false,
        professional: false,
        enterprise: true,
        inDevelopment: false,
      },
    ],
  },
  {
    type: 'Communication',
    features: [
      {
        name: 'Real-time Chat',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'Video Calls for online appointments',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
    ],
  },
  {
    type: 'Analytics',
    features: [
      {
        name: 'Basic Dashboard',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'Advanced Reports & Insights',
        trial: true,
        starter: false,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'AI Analytics Dashboard',
        trial: false,
        starter: false,
        professional: false,
        enterprise: true,
        inDevelopment: false,
      },
    ],
  },
  {
    type: 'AI',
    features: [
      {
        name: 'AI-powered features',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: true,
      },
    ],
  },
  {
    type: 'Marketing',
    features: [
      {
        name: 'Ad Visibility',
        trial: false,
        starter: false,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
    ],
  },
  {
    type: 'Support',
    features: [
      {
        name: 'Email support',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'Priority support',
        trial: true,
        starter: false,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
      {
        name: 'Premium support',
        trial: false,
        starter: false,
        professional: false,
        enterprise: true,
        inDevelopment: false,
      },
    ],
  },
  {
    type: 'Plan Control',
    features: [
      {
        name: '14-day Professional trial',
        trial: true,
        starter: false,
        professional: false,
        enterprise: false,
        inDevelopment: false,
      },
      {
        name: 'Cancel anytime',
        trial: true,
        starter: true,
        professional: true,
        enterprise: true,
        inDevelopment: false,
      },
    ],
  },
  {
    type: 'Developer Tools',
    features: [
      {
        name: 'Slot Availability API',
        trial: true,
        starter: false,
        professional: true,
        enterprise: true,
        inDevelopment: false,
        limit: {
          trial: '10,000 req/month',
          starter: 'Not available',
          professional: '10,000 req/month',
          enterprise: '30,000 req/month',
        },
      },
    ],
  },
];

// Plan Tiers
export const PLAN_TIERS = ['trial', 'starter', 'professional', 'enterprise'] as const;

// Provider Dashboard Graphs map according to plan
export const planChartAccess: Record<string, string[]> = {
  STARTER: ['AppointmentsOverTime', 'TopBookingDays'],
  PROFESSIONAL: [
    'AppointmentsOverTime',
    'TopBookingDays',
    'AppointmentModeTrend',
    'NewVsReturningUsers',
  ],
  ENTERPRISE: [
    'AppointmentsOverTime',
    'TopBookingDays',
    'AppointmentModeTrend',
    'NewVsReturningUsers',
    'AppointmentDistribution',
    'PeakBookingHours',
    'AppointmentCompletionBreakdown',
  ],
};

// Plan options
export const planNameOptions: OptionType<PlanName>[] = [
  { label: 'Trial', value: PlanName.TRIAL },
  { label: 'Starter', value: PlanName.STARTER },
  { label: 'Professional', value: PlanName.PROFESSIONAL },
  { label: 'Enterprise', value: PlanName.ENTERPRISE },
  { label: 'No Subscription', value: PlanName.NO_SUBSCRIPTION },
];
