import {
  Ban,
  Gem,
  Zap,
  Star,
  User,
  Home,
  Mail,
  Clock,
  Users,
  UserX,
  Phone,
  Gauge,
  Rows2,
  Wallet,
  Layers,
  Rocket,
  MapPin,
  Shield,
  AtSign,
  Cookie,
  Search,
  Github,
  Youtube,
  Twitter,
  Receipt,
  XCircle,
  Linkedin,
  Facebook,
  Banknote,
  Verified,
  BookLock,
  Settings,
  Activity,
  FileText,
  BarChart,
  Sparkles,
  UserPlus,
  LockIcon,
  BookOpen,
  Instagram,
  Calendar1,
  UserCheck,
  Hourglass,
  Briefcase,
  RotateCcw,
  Handshake,
  CircleHelp,
  HelpCircle,
  ThumbsDown,
  CreditCard,
  BadgeCheck,
  LayoutGrid,
  DollarSign,
  WalletCards,
  Wallet2Icon,
  CheckCircle,
  ShieldCheck,
  MessageCircle,
  CalendarClock,
  MessageSquare,
  WalletMinimal,
  CalendarCheck,
  CircleCheckBig,
  LayoutDashboard,
  MessageSquareText,
  PictureInPicture2,
  TestTube,
  Component,
} from 'lucide-react';
import {
  Route,
  BookingSteps,
  BlogCTAItems,
  BoardingStep,
  CompanyValues,
  OnboardingStep,
  DayMapInterface,
  NotificationType,
  statsMapIntrface,
  CommonTabInterface,
  HearAboutUsOptions,
  NotificationChannel,
  PlanFeatureInterface,
  ContactSupportOptions,
  BookingStepsHeroPeople,
  LandingPageIntegrations,
  FeatureContentInterface,
  HeaderCompoenentNavsProps,
  StatsMapForAdminInterface,
  dataSelectListItemInterface,
  MapDotLitLocationsCoordinates,
  ProviderApprovalMessageInterface,
  gsapBigSvgYDirectionAnimationInterface,
  VerificationStatusConfig,
} from '../types/common';
import { OptionType } from '../types/common';
import {
  Role,
  PlanName,
  ServiceType,
  ServiceCategory,
  AdminVerificationStatus,
  HearAboutUsOptionValue,
} from '../types/enums';
import choose from '@/assets/svgs/choose.svg';
import { ContactItem } from '../types/common';
import address from '@/assets/svgs/address.svg';
import working from '@/assets/svgs/working.svg';
import { ChartConfig } from '@/components/ui/chart';
import fileUpload from '@/assets/svgs/fileUpload.svg';
import service from '@/assets/svgs/serviceDetails.svg';
import zoomLogo from '@/assets/logos/external/zoom.png';
import availability from '@/assets/svgs/availability.svg';
import gmailLogo from '@/assets/logos/external/gmail.png';
import chatImage from '@/assets/LandingPageImages/chat.jpg';
import whatsappLogo from '@/assets/logos/external/whatsapp.png';
import stripeLogo from '../../assets/logos/external/stripe.jpeg';
import googleMapsLogo from '@/assets/logos/external/googleMap.png';
import calendarImage from '../../assets/LandingPageImages/calendar2.png';
import videoCallImage from '../../assets/LandingPageImages/videoCall.jpg';
import googleCalendarLogo from '../../assets/logos/external/googleCalendar.png';
import bookingImage from '../../assets/LandingPageImages/heroSectionOneImg2.png';
import { ProviderFetchDashboardStatsDataResponse } from '../types/api/providerProfile';

// Plan Tiers
export const PLAN_TIERS = ['free', 'starter', 'professional', 'enterprise'] as const;

// Block Back Statuses
export const blockBackStatuses = [
  AdminVerificationStatus.REQUESTED,
  AdminVerificationStatus.UNDER_REVIEW,
  AdminVerificationStatus.RESUBMITTED,
] as const;

// Updatable Statuses
export const updatableStatuses = [
  AdminVerificationStatus.NOT_REQUESTED,
  AdminVerificationStatus.REJECTED,
] as const;

// Route names record
export enum RouteNames {
  DASHBOARD = 'Dashboard',
  PROFILE = 'Profile',
  BOOKINGS = 'Bookings',
  PAYMENTS = 'Payments',
  INTEGRATIONS = 'Integrations',
  CHAT = 'Chat',
  REVIEWS = 'Reviews',
  SETTINGS = 'Settings',
  CALENDAR = 'Calendar',
  SUBSCRIPTIONS = 'Subscriptions',
  REPORTS = 'Reports',
  SERVICE_PROVIDERS = 'Service Providers',
  USERS = 'Users',
  SERVICES = 'Services',
  PLANS = 'Plans',
  GRAFANA_DASHBOARD = 'Grafana Dashboard',
  CREDITS = 'Credits',
  REFERRALS = 'Referrals',
  NOTIFICATIONS = 'Notifications',
  ACCOUNT = 'Account',
  SECURITY = 'Security',
  STATS = 'Stats',
  GRAPHS = 'Grpahs',
  TESTSANDBOX = 'Test Sandbox',
  DASHBOARDDATACARD = 'Dashboard-data-card',
}

// route for sidebar
export const sidebarRoutes: Route[] = [
  {
    path: 'dashboard',
    name: RouteNames.DASHBOARD,
    icon: LayoutDashboard,
    roles: [Role.ADMIN, Role.PROVIDER],
    subroutes: [
      {
        path: 'stats',
        name: RouteNames.STATS,
        icon: Activity,
        roles: [Role.PROVIDER],
      },
      {
        path: 'graphs',
        name: RouteNames.GRAPHS,
        icon: BarChart,
        roles: [Role.PROVIDER],
      },
    ],
  },

  {
    path: 'services',
    name: RouteNames.SERVICES,
    icon: Rows2,
    roles: [Role.ADMIN, Role.USER],
  },

  {
    path: `profile`,
    name: RouteNames.PROFILE,
    icon: User,
    roles: [Role.PROVIDER],
  },

  {
    path: 'subscriptions',
    name: RouteNames.SUBSCRIPTIONS,
    icon: CreditCard,
    roles: [Role.ADMIN, Role.PROVIDER],
  },

  {
    path: 'service-providers',
    name: RouteNames.SERVICE_PROVIDERS,
    icon: Handshake,
    roles: [Role.ADMIN],
  },
  {
    path: 'users',
    name: RouteNames.USERS,
    icon: Users,
    roles: [Role.ADMIN],
  },

  {
    path: 'plans',
    name: RouteNames.PLANS,
    icon: LayoutGrid,
    roles: [Role.ADMIN],
  },

  {
    path: 'bookings',
    name: RouteNames.BOOKINGS,
    icon: CalendarCheck,
    roles: [Role.USER, Role.PROVIDER],
  },

  {
    path: 'payments',
    name: RouteNames.PAYMENTS,
    icon: Handshake,
    roles: [Role.USER, Role.PROVIDER, Role.ADMIN],
  },

  {
    path: 'calendar',
    name: RouteNames.CALENDAR,
    icon: Calendar1,
    roles: [Role.USER, Role.PROVIDER],
  },

  {
    path: 'chat',
    name: RouteNames.CHAT,
    icon: MessageSquare,
    roles: [Role.USER, Role.PROVIDER],
  },

  {
    path: 'reviews',
    name: RouteNames.REVIEWS,
    icon: Star,
    roles: [Role.USER, Role.PROVIDER],
  },

  {
    path: 'credits',
    name: RouteNames.CREDITS,
    icon: Wallet2Icon,
    roles: [Role.USER, Role.PROVIDER],
  },

  {
    path: 'referrals',
    name: RouteNames.REFERRALS,
    icon: UserPlus,
    roles: [Role.USER, Role.PROVIDER],
  },

  {
    path: 'grafana-dashboard',
    name: RouteNames.GRAFANA_DASHBOARD,
    icon: Gauge,
    roles: [Role.ADMIN],
  },

  {
    path: 'report',
    name: RouteNames.REPORTS,
    icon: BookLock,
    roles: [Role.ADMIN, Role.PROVIDER],
  },

  {
    path: 'settings',
    name: RouteNames.SETTINGS,
    icon: Settings,
    roles: [Role.USER, Role.PROVIDER],
    subroutes: [
      {
        path: 'notifications',
        name: RouteNames.NOTIFICATIONS,
        icon: Mail,
        roles: [Role.USER, Role.PROVIDER],
      },
      {
        path: 'account',
        name: RouteNames.ACCOUNT,
        icon: Shield,
        roles: [Role.USER, Role.PROVIDER],
      },
      {
        path: 'integrations',
        name: RouteNames.INTEGRATIONS,
        icon: CreditCard,
        roles: [Role.USER, Role.PROVIDER],
      },
      {
        path: 'security',
        name: RouteNames.SECURITY,
        icon: LockIcon,
        roles: [Role.USER, Role.PROVIDER],
      },
    ],
  },
  {
    path: 'test-sandbox',
    name: RouteNames.TESTSANDBOX,
    icon: TestTube,
    roles: [Role.ADMIN],
    subroutes: [
      {
        path: 'dashboard-data-card',
        name: RouteNames.DASHBOARDDATACARD,
        icon: Component,
        roles: [Role.ADMIN],
      },
    ],
  },
];

// Settings Page Tabs
export const settingsTabs: CommonTabInterface[] = [
  {
    value: 'notifications',
    label: 'Notifications',
    icon: Mail,
  },
  {
    value: 'account',
    label: 'Account',
    icon: Shield,
  },
  {
    value: 'integrations',
    label: 'Integrations',
    icon: CreditCard,
  },
  {
    value: 'security',
    label: 'Security',
    icon: LockIcon,
  },
  {
    value: 'subscription',
    label: 'Subscription',
    icon: CreditCard,
  },
];

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

// Gsap animation common oject
export const gsapBigSvgYDirectionAnimation: gsapBigSvgYDirectionAnimationInterface = {
  y: 20,
  duration: 1,
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut',
};

// Header Navigation Array
export const navigation: HeaderCompoenentNavsProps[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Pricing', href: '/pricing', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

// Tabs for provider profile showing in admin side and provider side
export const providerTabs: { tabName: string; admin: boolean; user: boolean }[] = [
  { tabName: 'Details', admin: true, user: true },
  { tabName: 'Address', admin: true, user: true },
  { tabName: 'Service', admin: true, user: true },
  { tabName: 'Availability', admin: true, user: true },
  { tabName: 'Reviews', admin: true, user: true },
  { tabName: 'Subscriptions', admin: true, user: false },
  { tabName: 'Payments', admin: true, user: false },
  { tabName: 'Proofs', admin: true, user: false },
];

export const userTabs: { tabName: string; admin: boolean; user: boolean }[] = [
  { tabName: 'Details', admin: true, user: true },
  { tabName: 'Address', admin: true, user: true },
  { tabName: 'Reviews', admin: true, user: true },
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

// FooterBar Data
export const footerLinks = {
  pages: [
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
    {
      name: 'Pricing',
      href: '/pricing',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
    {
      name: 'Faq',
      href: '/Faq',
    },
  ],

  socials: [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/slotflow',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/slotflow',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/slotflow',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/midhunkpaniker',
    },
    {
      name: 'Github',
      icon: Github,
      href: 'https://github.com/slotflow',
    },
  ],

  legal: [
    {
      name: 'Privacy Policy',
      href: '/legal/privacy-policy',
      description: 'Learn how we collect, use, protect, and process your personal information.',
      icon: Shield,
    },
    {
      name: 'Terms of Service',
      href: '/legal/terms-of-service',
      description: 'Read the terms and conditions governing the use of SlotFlow.',
      icon: FileText,
    },
    {
      name: 'Cookie Policy',
      href: '/legal',
      description: 'Read the cookie policy',
      icon: Cookie,
    },
    {
      name: 'Refund Policy',
      href: '/legal',
      description: 'Understand refunds, eligibility, processing timelines, and exceptions.',
      icon: RotateCcw,
    },
    {
      name: 'Cancellation Policy',
      href: '/legal',
      description:
        'Learn about booking cancellations, provider cancellations, and applicable charges.',
      icon: Ban,
    },
  ],

  account: [
    {
      name: 'Sign Up',
      href: '/auth/register',
    },
    {
      name: 'Login',
      href: '/auth/login',
    },
    {
      name: 'Forgot Password',
      href: '/auth/verify/email',
    },
  ],
};

// Approval Pending Page data
export const approvalMessages: ProviderApprovalMessageInterface = {
  heading: 'Approval in Progress',
  message1:
    'Thank you for your patience. Your request is currently being reviewed. We will notify you as soon as the process is complete.',
  message2: 'We will notify you via email.',
  footerNote: 'If you have any queries, please contact us.',
};

// Features Section Content
export const featureContent: FeatureContentInterface[] = [
  {
    title: 'Real-Time Slot Booking',
    description:
      'Enable customers to book available slots instantly with live updates. Maximize your scheduling efficiency and reduce double-bookings effortlessly.',
    image: bookingImage,
    icon: CalendarCheck,
    islogo: false,
  },
  {
    title: 'Integrated Chat',
    description:
      'Communicate seamlessly with your team and clients in real time. Share updates, resolve queries quickly, and keep everyone on the same page without switching tools.',
    image: chatImage,
    icon: MessageSquareText,
    islogo: false,
  },
  {
    title: 'Video Calls',
    description:
      'Host secure, high-quality video meetings directly from the platform. Connect with clients or teammates, discuss plans, and collaborate face-to-face from anywhere.',
    image: videoCallImage,
    icon: PictureInPicture2,
    islogo: false,
  },
  {
    title: 'Google Calendar Sync',
    description:
      'Automatically and asynchronously add your bookings and schedules to Google Calendar. Keep your availability up-to-date, avoid double bookings, and manage your appointments effortlessly across all devices.',
    image: calendarImage,
    logo: googleCalendarLogo,
    islogo: true,
  },
];

// Provider Dashboard Stats Cards Data
export const statsMapForProvider: Array<statsMapIntrface<ProviderFetchDashboardStatsDataResponse>> =
  [
    {
      title: 'Total Appointments',
      key: 'totalAppointments',
      icon: CalendarCheck,
      plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
    },
    {
      title: 'Today’s Appointments',
      key: 'todaysAppointments',
      icon: Clock,
      plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
    },
    {
      title: 'Completed Appointments',
      key: 'completedAppointments',
      icon: CheckCircle,
      plans: [PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
    },
    {
      title: 'Missed Appointments',
      key: 'missedAppointments',
      icon: XCircle,
      plans: [PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
    },
    {
      title: 'Cancelled by User',
      key: 'cancelledAppointmentsByUser',
      icon: Ban,
      plans: [PlanName.ENTERPRISE],
    },
    {
      title: 'Rejected by Provider',
      key: 'rejectedAppointmentsByProvider',
      icon: ThumbsDown,
      plans: [PlanName.ENTERPRISE],
    },
  ];

// Revenue status map for provider
export const revenueStatsMapForProvider = [
  {
    title: 'Subscription Payments',
    key: 'totalSubscriptionPaidAmount',
    icon: Receipt,
    price: true,
    plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: 'Total Earnings',
    key: 'totalEarnings',
    icon: Banknote,
    price: true,
    plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: 'Total Payouts Made',
    key: 'totalPayoutsMade',
    icon: Wallet,
    price: true,
    plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: 'Pending Payout',
    key: 'pendingPayout',
    icon: Hourglass,
    price: true,
    plans: [PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
];

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

// Provider and Admin Dashboard Graphs configs
export const appointmentsOverTimeChartConfig = {
  completed: {
    label: 'Completed',
    color: '#22c55e',
  },
  missed: {
    label: 'Missed',
    color: '#f97316',
  },
  cancelled: {
    label: 'Cancelled',
    color: '#ef4444',
  },
};

// Peak booking hours chart config
export const peakBookingHoursChartConfig = {
  bookings: {
    label: 'Bookings',
    color: '#22c55e',
  },
};

// Appointment mode chart config
export const appointmentModeChartConfig = {
  online: {
    label: 'Online',
    color: '#3b82f6',
  },
  offline: {
    label: 'Offline',
    color: '#10b981',
  },
};

// Completion breakdown chart config
export const completionBreakdownChartConfig = {
  completed: {
    label: 'completed',
    color: '#22c55e',
  },
  missed: {
    label: 'missed',
    color: '#f97316',
  },
  cancelled: {
    label: 'cancelled',
    color: '#ef4444',
  },
  rejected: {
    label: 'rejected',
    color: '#a855f7',
  },
  booked: {
    label: 'booked',
    color: '#3b82f6',
  },
  confirmed: {
    label: 'confirmed',
    color: '#eab308',
  },
};

// New vs retuning users chart config
export const newVsReturningUsersChartConfig = {
  newUsers: {
    label: 'New Users',
    color: '#3b82f6',
  },
  returningUsers: {
    label: 'Returning Users',
    color: '#10b981',
  },
};

// Top bookings day chart config
export const topBookingDaysChartConfig = {
  Monday: {
    label: 'Monday',
    color: '#6366F1',
  },
  Tuesday: {
    label: 'Tuesday',
    color: '#10B981',
  },
  Wednesday: {
    label: 'Wednesday',
    color: '#F59E0B',
  },
  Thursday: {
    label: 'Thursday',
    color: '#EF4444',
  },
  Friday: {
    label: 'Friday',
    color: '#3B82F6',
  },
  Saturday: {
    label: 'Saturday',
    color: '#8B5CF6',
  },
  Sunday: {
    label: 'Sunday',
    color: '#EC4899',
  },
};

// Earnings time chart config
export const earningsOverTimeChartConfig = {
  stripe: {
    label: 'Stripe',
    color: '#22c55e',
  },
  razorpay: {
    label: 'Razorpay',
    color: '#f97316',
  },
  paypal: {
    label: 'Paypal',
    color: '#ef4444',
  },
};

// Chart Line Linear Config for credit account page
export const creditAccountChartLineLinearConfig: ChartConfig = {
  totalCredits: {
    label: 'Total Credits',
    color: 'var(--mainColor)',
  },
  spentCredits: {
    label: 'Spent Credits',
    color: 'var(--mainColor)',
  },
  balanceCredits: {
    label: 'Balance Credits',
    color: 'var(--mainColor)',
  },
};

// Referral chat config
export const referralChartLineLinearConfig: ChartConfig = {
  totalReferrals: {
    label: 'Total Referrals',
    color: 'var(--mainColor)',
  },
  completedReferrals: {
    label: 'Completed Referrals',
    color: 'var(--mainColor)',
  },
  pendingReferrals: {
    label: 'Pending Referrals',
    color: 'var(--mainColor)',
  },
  rewardedReferrals: {
    label: 'Rewarded Referrals',
    color: 'var(--mainColor)',
  },
};

// Admin Dashboard Stats Cards Data
export const userStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: 'Total Users',
    key: 'totalUsers',
    icon: Users,
  },
  {
    title: 'Blocked Users',
    key: 'blockedUsers',
    icon: UserX,
  },
];

// Provider status map for admin
export const providerStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: 'Total Providers',
    key: 'totalProviders',
    icon: Users,
  },
  {
    title: 'Admin Verified Providers',
    key: 'adminVerifiedProviders',
    icon: ShieldCheck,
  },
  {
    title: 'Slotflow verified',
    key: 'slotflowTrustedProviders',
    icon: Verified,
  },
  {
    title: 'Blocked Providers',
    key: 'blockedProviders',
    icon: UserX,
  },
  {
    title: 'Address Added Providers',
    key: 'addressAddedProviders',
    icon: MapPin,
  },
  {
    title: 'Service Added Providers',
    key: 'serviceAddedProviders',
    icon: Briefcase,
  },
  {
    title: 'Availability Added Providers',
    key: 'availabilityAddedProviders',
    icon: CalendarClock,
  },
];

// Subscription status map for admin
export const subscriptionStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: 'Active Subscriptions',
    key: 'activeSubscriptions',
    icon: BadgeCheck,
  },
  {
    title: 'Expired Subscriptions',
    key: 'expiredSubscriptions',
    icon: Ban,
  },
  {
    title: 'Free-Trial Plan Subscriptions',
    key: 'subscriptionsByFreePlan',
    icon: LayoutGrid,
  },
  {
    title: 'Starter Plan Subscriptions',
    key: 'subscriptionsByStarterPlan',
    icon: Layers,
  },
  {
    title: 'Professional Plan Subscriptions',
    key: 'subscriptionsByProfessionalPlan',
    icon: Rocket,
  },
  {
    title: 'Enterprise Plan Subscriptions',
    key: 'subscriptionsByEnterprisePlan',
    icon: Gem,
  },
];

// Revenue and payment status map for admin
export const revenueAndPaymentsStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: 'Total Revenue',
    key: 'totalRevenue',
    icon: Banknote,
    price: true,
  },
  {
    title: 'Revenue via Subscriptions',
    key: 'totalRevenueViaSubscriptions',
    icon: Receipt,
    price: true,
  },
  {
    title: 'Revenue via stripe',
    key: 'revenueByStripe',
    icon: Wallet2Icon,
    price: true,
  },
  {
    title: 'Revenue via razorpay',
    key: 'revenueByRazorpay',
    icon: WalletCards,
    price: true,
  },
  {
    title: 'Revenue via paypal',
    key: 'revenueByPaypal',
    icon: WalletMinimal,
    price: true,
  },
  {
    title: 'Revenue via Appointments',
    key: 'totalRevenueViaAppointments',
    icon: CreditCard,
    price: true,
  },
  {
    title: 'Total Refunds Issued',
    key: 'totalRefundsIssued',
    icon: RotateCcw,
    price: true,
  },
  {
    title: 'Failed Payments',
    key: 'totalFailedPayments',
    icon: XCircle,
    price: false,
  },
  {
    title: 'Total Payouts to Providers',
    key: 'totalPayoutsToProviders',
    icon: Wallet,
    price: true,
  },
];

// Appointment status map for admin
export const AppointmentsStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: 'Total Appointments',
    key: 'totalAppointments',
    icon: CalendarCheck,
  },
  {
    title: 'Completed Appointments',
    key: 'completedAppointments',
    icon: CheckCircle,
  },
  {
    title: 'Cancelled Appointments',
    key: 'cancelledAppointments',
    icon: XCircle,
  },
  {
    title: 'Missed Appointments',
    key: 'missedAppointments',
    icon: Ban,
  },
  {
    title: 'Rejected Appointments',
    key: 'rejectedAppointments',
    icon: ThumbsDown,
  },
];

// boarding data for the preboarding and onboarding pages
export const boardingData: BoardingStep[] = [
  {
    id: 0,
    title: 'Account Setup',
    image: choose,
    description:
      "Choose how you'd like to use Slotflow. Whether you're booking services or offering them, we'll tailor your experience accordingly.",
  },
  {
    id: 1,
    title: 'How did you hear about us?',
    image: choose,
    description:
      'Help us understand how you discovered Slotflow. Your feedback enables us to improve and reach more users effectively.',
  },
  {
    id: 2,
    title: 'Address',
    image: address,
    description:
      'Provide your business address accurately so customers can discover your services and book appointments with confidence.',
  },
  {
    id: 3,
    title: 'Service Details',
    image: service,
    description:
      "Tell customers about the services you provide, including descriptions, pricing, and any important information they'll need before booking.",
  },
  {
    id: 4,
    title: 'Availability',
    image: availability,
    description:
      'Set your working days and available time slots to ensure customers can book appointments that fit your schedule.',
  },
  {
    id: 5,
    title: 'Upload Proofs',
    image: fileUpload,
    description:
      'Upload the required verification documents. Please ensure they are valid, clearly visible, and meet the specified file requirements.',
  },
  {
    id: 6,
    title: 'Approval',
    image: working,
    description:
      "Your application is ready for review. Please submit your information for our team to review. Once your account has been approved, you'll receive an email confirmation.",
  },
];

// Address page google map title
export const addAddressGoogleMapLinkInfoHeading: string = 'Select Your Exact Location';

// Address page google map info
export const addAddressGoogleMapLinkInfo: string = `Use the map to select your exact location.  
Click on the map to drop a marker at your address.  
This helps us provide accurate location based services and ensures more precise search results.  
Your selected location will also be used to automatically fill address details wherever possible.`;

// Hero section
export const heroSectionButtons: { text: string; href: string }[] = [
  {
    text: 'Book Appointment',
    href: '/auth/login',
  },
  {
    text: 'Provide Service',
    href: '/auth/login',
  },
];

// Contact Page
export const contactData: ContactItem[] = [
  {
    icon: Phone,
    label: 'Phone (IN)',
    value: '+91 97154 3274799',
    href: 'tel:+91971543274799',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'slotfloe.booking@gmail.com',
    href: 'mailto: slotflow.booking0@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Kerala, India',
  },
];

// Terms and Conditions
export const termsAndConditionsContent: string[] = [
  'Welcome to Slotflow. By using our platform, you agree to these Terms & Conditions, so please read them carefully before proceeding.',
  'Slotflow provides appointment scheduling and business management tools. You are responsible for the accuracy of the information you provide, including service details, availability, and contact data.',
  'You must not use Slotflow for unlawful, harmful, or fraudulent activities. We reserve the right to suspend or terminate accounts that violate these terms.',
  'Payments for paid plans are billed according to the selected subscription and must be completed on time to maintain access to premium features.',
  'Slotflow may update these terms periodically. Continued use of the platform after updates indicates your acceptance of the revised terms.',
];

// Admin dashboard overview tabs
export const adminOverviewTabs: CommonTabInterface[] = [
  { value: 'users', label: 'Users', icon: Users },
  { value: 'providers', label: 'Providers', icon: UserCheck },
  { value: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
  { value: 'revenue', label: 'Revenue', icon: DollarSign },
  { value: 'appointments', label: 'Appointments', icon: CalendarCheck },
];

// Profile tabs list
export const profileTabs: CommonTabInterface[] = [
  { value: 'tab1', label: 'Profile', icon: User, role: [Role.PROVIDER, Role.USER] },
  { value: 'tab2', label: 'Address', icon: Home, role: [Role.PROVIDER, Role.USER] },
  { value: 'tab3', label: 'Service', icon: Briefcase, role: [Role.PROVIDER] },
  { value: 'tab4', label: 'Availability', icon: Clock, role: [Role.PROVIDER] },
  { value: 'tab5', label: 'Profile Preview', icon: User, role: [Role.PROVIDER] },
];

// Advertisement visibility select field options
export const adVisibilityOptions: OptionType<boolean>[] = [
  { label: 'Ad Visible', value: true },
  { label: 'No Ad Visibility', value: false },
];

// Service type options
export const serviceTypeOptions: OptionType<ServiceType>[] = [
  { label: 'One Time', value: ServiceType.ONE_TIME },
  { label: 'Recurring', value: ServiceType.RECURRING },
];

// Group options
export const groupOptions: OptionType<boolean>[] = [
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

// Planduration options
export const planDurations: OptionType<number>[] = [
  { label: '1 Month', value: 30 },
  { label: '3 Months', value: 90 },
  { label: '6 Months', value: 180 },
  { label: '1 Year', value: 365 },
];

// admin provider verification boolean options
export const verificationOptions: OptionType<boolean>[] = [
  { label: 'Verified', value: true },
  { label: 'Rejected', value: false },
];

// common boolean selection options
export const booleanOptions: OptionType<boolean>[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

// Status text mapper
export const verificationStatusTextMap: Record<AdminVerificationStatus, string> = {
  [AdminVerificationStatus.REQUESTED]: 'Submitted for review',
  [AdminVerificationStatus.UNDER_REVIEW]: 'Currently under review',
  [AdminVerificationStatus.APPROVED]: 'Approved',
  [AdminVerificationStatus.REJECTED]: 'Rejected',
  [AdminVerificationStatus.RESUBMITTED]: 'Re-submitted for review',
  [AdminVerificationStatus.NOT_REQUESTED]: 'Not submitted',
};

// Plan options
export const planNameOptions: OptionType<PlanName>[] = [
  { label: 'Trial', value: PlanName.TRIAL },
  { label: 'Starter', value: PlanName.STARTER },
  { label: 'Professional', value: PlanName.PROFESSIONAL },
  { label: 'Enterprise', value: PlanName.ENTERPRISE },
  { label: 'No Subscription', value: PlanName.NO_SUBSCRIPTION },
];

// Redux store constant
export const storeConstants: Record<string, string> = {
  storeKey: 'slotflow',
  resetState: 'RESET_STATE',
};

// Redirect paths
export const redirectPaths: Record<string, string> = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY_EMAIL: '/auth/verify/email',
  RESET_PASSWORD: '/auth/reset/password',
  VERIFY_OTP: '/auth/verify/otp',
  PRE_BOARDING_ROLE: '/preboarding/role',
  PRE_BOARDING_HEAR_ABOUT_US: '/preboarding/hear-about-us',
  ONBOARDING_ADDRESS: '/onboarding/address',
  ONBOARDING_SERVICE: '/onboarding/service',
  ONBOARDING_AVAILABILITY: '/onboarding/availability',
  ONBOARDING_PROOFS: '/onboarding/proofs',
  ONBOARDING_PENDING: '/onboarding/pending',
  USER_HOME: '/user',
  PROVIDER_HOME: '/provider',
  ADMIN_DASHBOARD: '/admin/dashboard',
};

// Base paths
export const basePaths: Record<string, string> = {
  user: '/user',
  provider: '/provider',
  admin: '/admin',
  login: '/login',
};

// Chart config
export const chartConfig = {
  value: {
    label: 'Value',
    color: 'var(--chart-2)',
  },
  label: {
    color: 'var(--background)',
  },
} satisfies ChartConfig;

// World map points
export const mapDotLitLocationsCoordinates: MapDotLitLocationsCoordinates[] = [
  { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
  { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
  { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
  { start: { lat: 19.076, lng: 72.8777 }, end: { lat: 28.6139, lng: 77.209 } },
  { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
  { start: { lat: 22.5726, lng: 88.3639 }, end: { lat: 28.6139, lng: 77.209 } },
];

// Hear about us options
export const hearAboutUsOptions: HearAboutUsOptions[] = [
  { label: 'Google Search', value: HearAboutUsOptionValue.GOOGLE, icon: Search },
  { label: 'Friend / Referral', value: HearAboutUsOptionValue.REFERRAL, icon: Users },
  { label: 'YouTube', value: HearAboutUsOptionValue.YOUTUBE, icon: Youtube },
  { label: 'LinkedIn', value: HearAboutUsOptionValue.LINKEDIN, icon: Linkedin },
  { label: 'Twitter (X)', value: HearAboutUsOptionValue.TWITTER, icon: Twitter },
  { label: 'Instagram', value: HearAboutUsOptionValue.INSTAGRAM, icon: Instagram },
  { label: 'WhatsApp', value: HearAboutUsOptionValue.WHATSAPP, icon: MessageCircle },
  { label: 'Facebook', value: HearAboutUsOptionValue.FACEBOOK, icon: Facebook },
  { label: 'Threads', value: HearAboutUsOptionValue.THREADS, icon: AtSign },
  { label: 'Other', value: HearAboutUsOptionValue.OTHER, icon: HelpCircle },
];

// Onboarding titles
export const onboardingContent: Record<
  string,
  {
    title: string;
    description: string;
    description2?: string;
    description3?: string;
  }
> = {
  setupRole: {
    title: 'Select Your Account Type',
    description: 'Choose how you will use the platform.',
  },
  hearAboutUs: {
    title: 'Source of Discovery',
    description: 'Tell us how you found our platform.',
  },
  address: {
    title: 'Provide Your Address',
    description: 'Enter your location for accurate service matching.',
  },
  serviceDetails: {
    title: 'Define Your Services',
    description: 'Describe the services you offer to customers.',
  },
  availability: {
    title: 'Set Your Availability',
    description: 'Specify when you are available for bookings.',
  },
  proofs: {
    title: 'Upload Verification Documents',
    description: 'Submit required documents for identity verification.',
  },
  profileApproval: {
    title: 'Profile Review and Approval',
    description: 'Submit your profile for verification and approval.',
    description2:
      'Submit your profile for review. Our team will verify your details within one business day.',
    description3: 'Your profile is under review. This may take up to 24 hours.',
  },
};

export const ONBOARDING_CONFIG: Record<string, OnboardingStep> = {
  '/preboarding/role': {
    pageNumber: 0,
    heading: onboardingContent.setupRole.title,
    description: onboardingContent.setupRole.description,
    path: '/preboarding/role',
  },
  '/preboarding/hear-about-us': {
    pageNumber: 1,
    heading: onboardingContent.hearAboutUs.title,
    description: onboardingContent.hearAboutUs.description,
    path: '/preboarding/hear-about-us',
  },
  '/onboarding/address': {
    pageNumber: 2,
    heading: onboardingContent.address.title,
    description: onboardingContent.address.description,
    path: '/onboarding/address',
  },
  '/onboarding/service': {
    pageNumber: 3,
    heading: onboardingContent.serviceDetails.title,
    description: onboardingContent.serviceDetails.description,
    path: '/onboarding/service',
  },
  '/onboarding/availability': {
    pageNumber: 4,
    heading: onboardingContent.availability.title,
    description: onboardingContent.availability.description,
    path: '/onboarding/availability',
  },
  '/onboarding/proofs': {
    pageNumber: 5,
    heading: onboardingContent.proofs.title,
    description: onboardingContent.proofs.description,
    path: '/onboarding/proofs',
  },
  '/onboarding/pending': {
    pageNumber: 6,
    heading: onboardingContent.profileApproval.title,
    description: onboardingContent.profileApproval.description,
    path: '/onboarding/pending',
  },
};

// Default button className
export const defaultButtonClassName: string =
  'cursor-pointer transition-colors duration-300 hover:text-white hover:bg-[var(--mainColor)]';

// Destructive button className
export const destructiveButtonClassName: string =
  'cursor-pointer transition-colors duration-300 hover:text-white hover:bg-red-500';

// Status preset data for the data cards
export const STATUS_PRESETS: Record<
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

// Landing page workflow booking steps
export const bookingSteps: BookingSteps[] = [
  {
    title: 'Create an Account',
    description: 'Sign up to access trusted services and manage your bookings.',
    icon: UserPlus,
  },
  {
    title: 'Find a Service',
    description: 'Search for the service you need by category or location.',
    icon: Search,
  },
  {
    title: 'Choose a Provider',
    description: 'Compare verified providers and select the right one.',
    icon: BadgeCheck,
  },
  {
    title: 'Select a Time',
    description: 'Pick an available date and time that works for you.',
    icon: CalendarClock,
  },
  {
    title: 'Pay Securely',
    description: 'Complete your booking using our secure payment process.',
    icon: CreditCard,
  },
  {
    title: 'Booking Confirmed',
    description: "Receive instant confirmation and you're ready to go.",
    icon: CircleCheckBig,
  },
];

// Landing page hero section people list
export const heroPeople: BookingStepsHeroPeople[] = [
  {
    id: 1,
    name: 'Rahul Sharma',
    designation: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
  },
  {
    id: 2,
    name: 'Neeraj Gupta',
    designation: 'Product Manager',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Neha Kapoor',
    designation: 'Data Scientist',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Isha Gupta',
    designation: 'UX Designer',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Devansh Agarwal',
    designation: 'Soap Developer',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
  },
  {
    id: 6,
    name: 'Kritika Desai',
    designation: 'Architecht',
    image:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80',
  },
];

// Landing page integrations section data
export const landingPageIntegrations: LandingPageIntegrations[] = [
  {
    title: 'Google Calendar',
    description: 'Two-way appointment synchronization.',
    logo: googleCalendarLogo,
    isActive: true,
  },
  {
    title: 'Stripe',
    description: 'Secure online payments.',
    logo: stripeLogo,
    isActive: true,
  },
  {
    title: 'Google Maps',
    description: 'Location and navigation.',
    logo: googleMapsLogo,
    isActive: true,
  },
  {
    title: 'Gmail',
    description: 'Booking confirmations.',
    logo: gmailLogo,
    isActive: true,
  },
  {
    title: 'WhatsApp',
    description: 'Instant booking notifications.',
    logo: whatsappLogo,
    isActive: false,
  },
  {
    title: 'Zoom',
    description: 'Online consultations.',
    logo: zoomLogo,
    isActive: false,
  },
];

// blogCTA items
export const blogCTAItems: BlogCTAItems[] = [
  {
    title: '25k+',
    subTitle: 'Appointments Managed',
  },
  {
    title: '98%',
    subTitle: 'Customer Satisfaction',
  },
  {
    title: '24/7',
    subTitle: 'Online Booking',
  },
  {
    title: 'AI',
    subTitle: 'Smart Scheduling',
  },
];

// company values
export const companyValues: CompanyValues[] = [
  {
    icon: Zap,
    title: 'Built for Speed',
    description:
      'From booking to confirmations, every interaction is optimized to save valuable time.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable & Secure',
    description:
      'Your scheduling data and customer information are protected with modern security practices.',
  },
  {
    icon: Sparkles,
    title: 'Simple Experience',
    description:
      'A clean interface that makes appointment management effortless for businesses and customers.',
  },
  {
    icon: BadgeCheck,
    title: 'Designed to Scale',
    description:
      "Whether you're an individual or an enterprise, Slotflow grows alongside your business.",
  },
];

//
export const contactSupportOptions: ContactSupportOptions[] = [
  {
    id: 1,
    icon: MessageCircle,
    title: 'Live Chat',
    button: 'Start Chat',
    action: 'chat',
  },
  {
    id: 2,
    icon: BookOpen,
    title: 'Help Center',
    button: 'Browse Docs',
    action: 'help',
  },
  {
    id: 3,
    icon: CircleHelp,
    title: 'FAQ',
    button: 'View FAQ',
    action: 'faq',
  },
] as const;

export const NOTIFICATION_CHANNEL = {
  EMAIL: 'email',
  PUSH: 'push',
  IN_APP: 'in_app',
} as const satisfies Record<string, NotificationChannel>;

export const NOTIFICATION_TYPE = {
  APPOINTMENT_UPDATES: 'appointment_updates',
  APPOINTMENT_REMINDERS: 'appointment_reminders',
  APPOINTMENT_CHANGES: 'appointment_changes',
  NEW_APPOINTMENTS: 'new_appointments',
  PAYMENT_NOTIFICATIONS: 'payment_notifications',
  PAYMENT_ACTIVITY: 'payment_activity',
  ACCOUNT_ACTIVITY: 'account_activity',
  SYSTEM_UPDATES: 'system_updates',
  PROMOTIONAL_UPDATES: 'promotional_updates',
} as const satisfies Record<string, NotificationType>;

//
export const QUERY_KEYS = {
  PLAN: 'plan',
  PLANS: 'plans',
  USERS: 'users',
  REVENUE: 'revenue',
  REVIEWS: 'reviews',
  BOOKING: 'booking',
  BOOKINGS: 'bookings',
  PAYMENT: 'payment',
  PAYMENTS: 'payments',
  PROVIDERS: 'providers',
  REFERRALS: 'REFERRALS',
  SUBSCRIPTIONS: 'subscriptions',
  SUBSCRIPTION: 'subscription',
  NOTIFICATIONS: 'notifications',
  APP_SERVICES: 'app-services',
  PLAN_DETAILS: 'plan-details',
  REFERRAL_DETAILS: 'referral-details',
  MY_ADDRESS: 'my-address',
  CREDIT_DETAILS: 'credit-details',
  CREDIT_TRANSACTIONS: 'credit-transactions',
  CALENDAR_EVENTS: 'calendar-events',
  PROVIDER_SERVICE: 'provider-service',
  PROVIDER_ADDRESS: 'provider-address',
  USER_ADDRESS: 'user-address',
  PROVIDER_PROFILE: 'provider-profile',
  USER_PROFILE: 'user-profile',
  DASHBOARD_STATS: 'dashboard-stats',
  PROVIDER_PROOFS: 'provider-proofs',
  PROVIDER_SUBSCRIPTION: 'provider-subscription',
  DASHBOARD_USERS_STATS: 'dashboard-users-stats',
  DASHBOARD_PROVIDERS_STATS: 'dashboard-providers-stats',
  DASHBOARD_SUBSCRIPTION_STATS: 'dashboard-subscription-stats',
  DASHBOARD_REVENUE_STATS: 'dashboard-revenue-stats',
  DASHBOARD_APPOINTMENTS_STATS: 'dashboard-appointments-stats',
  ADMIN_LATEST_PAYMENTS: 'admin-latest-payments',
  ADMIN_LATEST_PROVIDERS: 'admin-latest-providers',
  ADMIN_LATEST_USERS: 'admin-latest-users',
  PROVIDER_DASHBOARD_GRAPH: 'provider-dashboard-graph',
  PROVIDER_SERVICE_AVAILABILITY: 'provider-service-availability',
} as const;

//
export const VERIFICATION_STATUS_CONFIG: Record<string, VerificationStatusConfig> = {
  [AdminVerificationStatus.REQUESTED]: {
    type: 'pending',
    label: 'Requested',
  },
  [AdminVerificationStatus.UNDER_REVIEW]: {
    type: 'pending',
    label: 'Under Review',
  },
  [AdminVerificationStatus.APPROVED]: {
    type: 'verified',
    label: 'Approved',
  },
  [AdminVerificationStatus.REJECTED]: {
    type: 'unverified',
    label: 'Rejected',
  },
  [AdminVerificationStatus.RESUBMITTED]: {
    type: 'pending',
    label: 'Re-submitted',
  },
  [AdminVerificationStatus.NOT_REQUESTED]: {
    type: 'standard',
    label: 'Not Requested',
  },
};
