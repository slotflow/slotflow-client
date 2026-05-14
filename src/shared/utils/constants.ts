import {
  Ban,
  Gem,
  Star,
  User,
  Home,
  Mail,
  Clock,
  Users,
  UserX,
  Phone,
  Gauge,
  Wallet,
  Layers,
  Rocket,
  MapPin,
  Shield,
  AtSign,
  Search,
  Youtube,
  Twitter,
  Combine,
  Palette,
  Receipt,
  XCircle,
  Linkedin,
  Facebook,
  Banknote,
  Verified,
  BookLock,
  Settings,
  Activity,
  BarChart,
  Instagram,
  Calendar1,
  UserCheck,
  Hourglass,
  Briefcase,
  RotateCcw,
  Handshake,
  ScanHeart,
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
  MessageSquareText,
  PictureInPicture2,
  UserPlus,
} from "lucide-react";
import {
  Route,
  PlanListType,
  DayMapInterface,
  statsMapIntrface,
  CommonTabInterface,
  HearAboutUsOptions,
  FooterLinkInterface,
  PlanFeatureInterface,
  FeatureContentInterface,
  HeaderCompoenentNavsProps,
  FooterColumnDataInterface,
  StatsMapForAdminInterface,
  dataSelectListItemInterface,
  MapDotLitLocationsCoordinates,
  ProviderApprovalMessageInterface,
  gsapBigSvgYDirectionAnimationInterface,
} from "../interface/commonInterface";
import { ChartConfig } from "@/components/ui/chart";
import chatImage from '../../assets/heroImages/chat.jpg';
import { OptionType } from '../interface/commonInterface';
import { ContactItem } from "../interface/commonInterface";
import gCalendar from '../../assets/iconImages/gCalendar.png';
import calendarImage from '../../assets/heroImages/calendar2.png';
import videoCallImage from '../../assets/heroImages/videoCall.jpg';
import bookingImage from '../../assets/heroImages/heroSectionOneImg2.png';
import { ProviderFetchDashboardStatsDataResponse } from "../interface/api/providerProfile";
import { AdminVerificationStatus, HearAboutUsOptionValue, PlanName, Role, ServiceCategory, ServiceMode, ServiceType } from "../interface/enums";

// Plan Tiers 
export const PLAN_TIERS = ["free", "starter", "professional", "enterprise"] as const;

// Block Back Statuses
export const blockBackStatuses = [AdminVerificationStatus.REQUESTED, AdminVerificationStatus.UNDER_REVIEW, AdminVerificationStatus.RESUBMITTED] as const;

// Updatable Statuses
export const updatableStatuses = [AdminVerificationStatus.NOT_REQUESTED, AdminVerificationStatus.REJECTED] as const;

export enum RouteNames {
  DASHBOARD = "Dashboard",
  PROFILE = "Profile",
  BOOKINGS = "Bookings",
  PAYMENTS = "Payments",
  INTEGRATIONS = "Integrations",
  CHAT = "Chat",
  REVIEWS = "Reviews",
  SETTINGS = "Settings",
  CALENDAR = "Calendar",
  SUBSCRIPTIONS = "Subscriptions",
  REPORTS = "Reports",
  SERVICE_PROVIDERS = "Service Providers",
  USERS = "Users",
  SERVICES = "Services",
  PLANS = "Plans",
  GRAFANA_DASHBOARD = "Grafana Dashboard",
  CREDITS = "Credits",
  REFERRALS = "Referrals"
}

// Routes for admin
export const adminRoutes: Route[] = [
  { path: "dashboard", name: RouteNames.DASHBOARD, icon: Gauge },
  { path: "report", name: RouteNames.REPORTS, icon: BookLock },
  { path: "service-providers", name: RouteNames.SERVICE_PROVIDERS, icon: Handshake },
  { path: "users", name: RouteNames.USERS, icon: Users },
  { path: "services", name: RouteNames.SERVICES, icon: Briefcase },
  { path: "plans", name: RouteNames.PLANS, icon: LayoutGrid },
  { path: "subscriptions", name: RouteNames.SUBSCRIPTIONS, icon: CreditCard },
  { path: "payments", name: RouteNames.PAYMENTS, icon: Handshake },
  { path: "grafana-dashboard", name: RouteNames.GRAFANA_DASHBOARD, icon: ScanHeart },
]

// Routes for user
export const userRoutes: Route[] = [
  { path: "dashboard", name: RouteNames.SERVICES, icon: Gauge },
  { path: "profile", name: RouteNames.PROFILE, icon: User },
  { path: "bookings", name: RouteNames.BOOKINGS, icon: CalendarCheck },
  { path: "payments", name: RouteNames.PAYMENTS, icon: CreditCard },
  { path: "integrations", name: RouteNames.INTEGRATIONS, icon: Combine },
  { path: "chat", name: RouteNames.CHAT, icon: MessageSquare },
  { path: "calendar", name: RouteNames.CALENDAR, icon: Calendar1 },
  { path: "reviews", name: RouteNames.REVIEWS, icon: Star },
  { path: "credits", name: RouteNames.CREDITS, icon: Wallet2Icon },
  { path: "referrals", name: RouteNames.REFERRALS, icon: UserPlus },
  { path: "settings", name: RouteNames.SETTINGS, icon: Settings },
]

// Routes for provider
export const providerRoutes: Route[] = [
  { path: "dashboard", name: RouteNames.DASHBOARD, icon: Gauge },
  { path: "profile", name: RouteNames.PROFILE, icon: User },
  { path: "bookings", name: RouteNames.BOOKINGS, icon: CalendarCheck },
  { path: "subscriptions", name: RouteNames.SUBSCRIPTIONS, icon: CreditCard },
  { path: "payments", name: RouteNames.PAYMENTS, icon: Handshake },
  { path: "integrations", name: RouteNames.INTEGRATIONS, icon: Combine },
  { path: "calendar", name: RouteNames.CALENDAR, icon: Calendar1 },
  { path: "chat", name: RouteNames.CHAT, icon: MessageSquare },
  { path: "reviews", name: RouteNames.REVIEWS, icon: Star },
  { path: "credits", name: RouteNames.CREDITS, icon: Wallet2Icon },
  { path: "settings", name: RouteNames.SETTINGS, icon: Settings },
]

// Access Control For Provider
export const planAccessMap: Record<PlanName, RouteNames[]> = {
  [PlanName.NO_SUBSCRIPTION]: [
    RouteNames.DASHBOARD,
    RouteNames.PROFILE,
    RouteNames.SUBSCRIPTIONS,
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
    RouteNames.INTEGRATIONS,
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
    RouteNames.INTEGRATIONS,
    RouteNames.CHAT,
    RouteNames.REVIEWS,
    RouteNames.CREDITS,
    RouteNames.REFERRALS,
    RouteNames.SETTINGS,
  ],
  [PlanName.ENTERPRISE]: [
    RouteNames.DASHBOARD,
    RouteNames.PROFILE,
    RouteNames.BOOKINGS,
    RouteNames.SUBSCRIPTIONS,
    RouteNames.PAYMENTS,
    RouteNames.INTEGRATIONS,
    RouteNames.CHAT,
    RouteNames.REVIEWS,
    RouteNames.CALENDAR,
    RouteNames.CREDITS,
    RouteNames.REFERRALS,
    RouteNames.SETTINGS,
  ],
};

// Gsap animation common oject
export const gsapBigSvgYDirectionAnimation: gsapBigSvgYDirectionAnimationInterface = {
  y: 20,
  duration: 1,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
}

// Header Navigation Array
export const navigation: HeaderCompoenentNavsProps[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Features', href: '/#features', current: false },
  { name: 'Pricing', href: '/#pricing', current: false },
  { name: 'Reviews', href: '/#reviews', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
]

// Tabs for provider profile showing in admin side and provider side
export const providerTabs: { tabName: string, admin: boolean, user: boolean }[] = [
  { tabName: "Details", admin: true, user: true },
  { tabName: "Address", admin: true, user: true },
  { tabName: "Service", admin: true, user: true },
  { tabName: "Availability", admin: true, user: true },
  { tabName: "Reviews", admin: true, user: true },
  { tabName: "Subscriptions", admin: true, user: false },
  { tabName: "Payments", admin: true, user: false },
  { tabName: "Proofs", admin: true, user: false }
];

export const userTabs: { tabName: string, admin: boolean, user: boolean }[] = [
  { tabName: "Details", admin: true, user: true },
  { tabName: "Address", admin: true, user: true },
  { tabName: "Reviews", admin: true, user: true },
];

// Provider service availability component day map
export const dayMap: DayMapInterface = {
  "Sun": { day: "Sunday", tab: 0 },
  "Mon": { day: "Monday", tab: 1 },
  "Tue": { day: "Tuesday", tab: 2 },
  "Wed": { day: "Wednesday", tab: 3 },
  "Thu": { day: "Thursday", tab: 4 },
  "Fri": { day: "Friday", tab: 5 },
  "Sat": { day: "Saturday", tab: 6 }
}

// Not chat selected shimmer constants
export const shimmerMessages: { align: string, height: string, width: string }[] = [
  { align: "end", height: "h-10", width: "w-64" },
  { align: "start", height: "h-24", width: "w-60" },
  { align: "end", height: "h-36", width: "w-72" },
  { align: "start", height: "h-12", width: "w-44" },
  { align: "end", height: "h-14", width: "w-56" },
  { align: "start", height: "h-10", width: "w-60" },
  { align: "end", height: "h-28", width: "w-64" },
  { align: "start", height: "h-32", width: "w-72" },
  { align: "end", height: "h-24", width: "w-56" },
];

// ChartHeader date selector data
export const dateSelectList: dataSelectListItemInterface[] = [
  { value: "7d", content: "Last 7 days" },
  { value: "14d", content: "Last 14 days" },
  { value: "30d", content: "Last month" },
  { value: "60d", content: "Last 2 months" },
  { value: "90d", content: "Last 3 months" },
  { value: "180d", content: "Last 6 months" },
  { value: "365d", content: "Last year" },
]


// Pricing Setion Data
export const PlanList: PlanListType = [
  {
    _id: "0",
    planName: PlanName.TRIAL,
    description: "Perfect for individuals or freelancers getting started with appointment scheduling.",
    features: [
      "Basic slot creation & booking",
      "Email notifications for bookings",
      "Cancel anytime",
      "Up to 7 bookings",
      "7 days validity",
    ],
    price: 0
  },
  {
    _id: "1",
    planName: PlanName.STARTER,
    description: "Ideal for solo professionals looking for a branded experience and better control.",
    features: [
      "Everything in Free Plan",
      "Up to 100 bookings per month",
      "Starter dashboard",
      "Custom branding theme",
      "Email Support",
      "Basic Dashboard"
    ],
    price: 499
  },
  {
    _id: "2",
    planName: PlanName.PROFESSIONAL,
    description: "Designed for growing teams or businesses that require advanced scheduling and integrations.",
    features: [
      "Everything in Starter Plan",
      "Up to 500 bookings per month",
      "Custom branding logo",
      "Chat service",
      "Google Calendar sync",
      "24/7 Chat support",
      "Medium analytics dashborad",
    ],
    price: 1499
  },
  {
    _id: "3",
    planName: PlanName.ENTERPRISE,
    description: "Best suited for organizations that need scalable, secure, and fully customizable scheduling solutions.",
    features: [
      "Everything in Professional Plan",
      "Unlimited bookings",
      "Video call service",
      "Advertisement visibility",
      "24/7 premium support",
      "Advanced analytics dashboard",
    ],
    price: 4999
  }
]

//// Plan feature comparison table
export const planFeatures: PlanFeatureInterface[] = [
  {
    type: "Support",
    features: [
      {
        name: "Email support",
        free: false,
        starter: true,
        professional: true,
        enterprise: true
      },
      {
        name: "Chat support",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: "24/7 premium support",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  },
  {
    type: "Booking",
    features: [
      {
        name: "Booking limit: 7",
        free: true,
        starter: false,
        professional: false,
        enterprise: false
      },
      {
        name: "Booking limit: 100/month",
        free: false,
        starter: true,
        professional: false,
        enterprise: false
      },
      {
        name: "Booking limit: 500/month",
        free: false,
        starter: false,
        professional: true,
        enterprise: false
      },
      {
        name: "Unlimited bookings",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  },
  {
    type: "Integrations",
    features: [
      {
        name: "Chat service",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: "Google Calendar sync",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: "Video call service",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  },
  {
    type: "Analytics & Branding",
    features: [
      {
        name: "Starter dashboard",
        free: false,
        starter: true,
        professional: false,
        enterprise: false
      },
      {
        name: "Medium analytics dashboard",
        free: false,
        starter: false,
        professional: true,
        enterprise: false
      },
      {
        name: "Advanced analytics dashboard",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: "Custom branding theme",
        free: false,
        starter: true,
        professional: true,
        enterprise: true
      },
      {
        name: "Custom branding logo",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      }
    ]
  },
  {
    type: "Advertisement",
    features: [
      {
        name: "Advertisement visibility",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      }
    ]
  },
  {
    type: "Plan Control",
    features: [
      {
        name: "Cancel anytime",
        free: true,
        starter: true,
        professional: true,
        enterprise: true
      },
      {
        name: "7 days validity",
        free: true,
        starter: false,
        professional: false,
        enterprise: false
      }
    ]
  },
  {
    type: "Purpose",
    features: [
      {
        name: "Recommended for testing purpose",
        free: true,
        starter: false,
        professional: false,
        enterprise: false
      },
      {
        name: "Recommended for solo professionals",
        free: false,
        starter: true,
        professional: false,
        enterprise: false
      },
      {
        name: "Recommended for growing teams",
        free: false,
        starter: false,
        professional: true,
        enterprise: false
      },
      {
        name: "Recommended for enterprises",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  }
];


// FooterBar Data
export const footerColumnData: FooterColumnDataInterface[] = [
  {
    title: "Plans For your service",
    links: [
      { text: "Free", href: "" },
      { text: "Standard", href: "" },
      { text: "Enterprise", href: "" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About", href: "" },
      { text: "Careers", href: "" },
      { text: "Blog", href: "" },
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Terms of Service", href: "/terms-and-conditions" },
    ],
  },
  {
    title: "Connect",
    links: [
      { text: "Email", href: "mailto:slotflow.booking@gmail.com" },
      { text: "Facebook", href: "https://github.com/slotflow" },
      { text: "Instagram", href: "https://github.com/slotflow" },
      { text: "LinkedIn", href: "https://www.linkedin.com/in/midhunkpaniker" },
      { text: "Github", href: "https://github.com/slotflow" },
      { text: "Github", href: "https://github.com/slotflow" },
    ],
  },
]
export const copyright: string = " slotflow All rights reserved"
export const policies: FooterLinkInterface[] = [
  { text: "Privacy Policy", href: "/privacy-policy" },
  { text: "Terms of Service", href: "/terms-and-conditions" },
]
export const about: string = "Simplifying appointment scheduling for individuals and professionals. Stay organized, save time, and make every slot count.";


// Approval Pending Page data
export const approvalMessages: ProviderApprovalMessageInterface = {
  heading: "Approval in Progress",
  message1: "Thank you for your patience. Your request is currently being reviewed. We will notify you as soon as the process is complete.",
  message2: "We will notify you via email.",
  footerNote: "If you have any queries, please contact us.",
};


// Features Section Content
export const featureContent: FeatureContentInterface[] = [
  {
    title: "Real-Time Slot Booking",
    description:
      "Enable customers to book available slots instantly with live updates. Maximize your scheduling efficiency and reduce double-bookings effortlessly.",
    image: bookingImage,
    icon: CalendarCheck,
    islogo: false,
  },
  {
    title: "Integrated Chat",
    description:
      "Communicate seamlessly with your team and clients in real time. Share updates, resolve queries quickly, and keep everyone on the same page without switching tools.",
    image: chatImage,
    icon: MessageSquareText,
    islogo: false,
  },
  {
    title: "HD Video Calls",
    description:
      "Host secure, high-quality video meetings directly from the platform. Connect with clients or teammates, discuss plans, and collaborate face-to-face from anywhere.",
    image: videoCallImage,
    icon: PictureInPicture2,
    islogo: false,
  },
  {
    title: "Google Calendar Sync",
    description:
      "Automatically and asynchronously add your bookings and schedules to Google Calendar. Keep your availability up-to-date, avoid double bookings, and manage your appointments effortlessly across all devices.",
    image: calendarImage,
    logo: gCalendar,
    islogo: true,
  },
];


// Provider Dashboard Stats Cards Data
export const statsMapForProvider: Array<statsMapIntrface<ProviderFetchDashboardStatsDataResponse>> = [
  {
    title: "Total Appointments",
    key: "totalAppointments",
    icon: CalendarCheck,
    plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: "Today’s Appointments",
    key: "todaysAppointments",
    icon: Clock,
    plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: "Completed Appointments",
    key: "completedAppointments",
    icon: CheckCircle,
    plans: [PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: "Missed Appointments",
    key: "missedAppointments",
    icon: XCircle,
    plans: [PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: "Cancelled by User",
    key: "cancelledAppointmentsByUser",
    icon: Ban,
    plans: [PlanName.ENTERPRISE],
  },
  {
    title: "Rejected by Provider",
    key: "rejectedAppointmentsByProvider",
    icon: ThumbsDown,
    plans: [PlanName.ENTERPRISE],
  },
];



export const revenueStatsMapForProvider = [
  {
    title: "Subscription Payments",
    key: "totalSubscriptionPaidAmount",
    icon: Receipt,
    price: true,
    plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: "Total Earnings",
    key: "totalEarnings",
    icon: Banknote,
    price: true,
    plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: "Total Payouts Made",
    key: "totalPayoutsMade",
    icon: Wallet,
    price: true,
    plans: [PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
  {
    title: "Pending Payout",
    key: "pendingPayout",
    icon: Hourglass,
    price: true,
    plans: [PlanName.PROFESSIONAL, PlanName.ENTERPRISE],
  },
]


// Provider Dashboard Graphs map according to plan
export const planChartAccess: Record<string, string[]> = {
  STARTER: [
    "AppointmentsOverTime",
    "TopBookingDays",
  ],
  PROFESSIONAL: [
    "AppointmentsOverTime",
    "TopBookingDays",
    "AppointmentModeTrend",
    "NewVsReturningUsers",
  ],
  ENTERPRISE: [
    "AppointmentsOverTime",
    "TopBookingDays",
    "AppointmentModeTrend",
    "NewVsReturningUsers",
    "AppointmentDistribution",
    "PeakBookingHours",
    "AppointmentCompletionBreakdown",
  ],
};


// Provider and Admin Dashboard Graphs configs
export const appointmentsOverTimeChartConfig = {
  completed: {
    label: "Completed",
    color: "#22c55e",
  },
  missed: {
    label: "Missed",
    color: "#f97316",
  },
  cancelled: {
    label: "Cancelled",
    color: "#ef4444",
  },
}
export const peakBookingHoursChartConfig = {
  bookings: {
    label: "Bookings",
    color: "#22c55e",
  },
}
export const appointmentModeChartConfig = {
  online: {
    label: "Online",
    color: "#3b82f6",
  },
  offline: {
    label: "Offline",
    color: "#10b981",
  },
};
export const completionBreakdownChartConfig = {
  completed: {
    label: "completed",
    color: "#22c55e",
  },
  missed: {
    label: "missed",
    color: "#f97316",
  },
  cancelled: {
    label: "cancelled",
    color: "#ef4444",
  },
  rejected: {
    label: "rejected",
    color: "#a855f7",
  },
  booked: {
    label: "booked",
    color: "#3b82f6",
  },
  confirmed: {
    label: "confirmed",
    color: "#eab308",
  },
};
export const newVsReturningUsersChartConfig = {
  newUsers: {
    label: "New Users",
    color: "#3b82f6",
  },
  returningUsers: {
    label: "Returning Users",
    color: "#10b981",
  },
}
export const topBookingDaysChartConfig = {
  Monday: {
    label: "Monday",
    color: "#6366F1",
  },
  Tuesday: {
    label: "Tuesday",
    color: "#10B981",
  },
  Wednesday: {
    label: "Wednesday",
    color: "#F59E0B",
  },
  Thursday: {
    label: "Thursday",
    color: "#EF4444",
  },
  Friday: {
    label: "Friday",
    color: "#3B82F6",
  },
  Saturday: {
    label: "Saturday",
    color: "#8B5CF6",
  },
  Sunday: {
    label: "Sunday",
    color: "#EC4899",
  },
};
export const earningsOverTimeChartConfig = {
  stripe: {
    label: "Stripe",
    color: "#22c55e",
  },
  razorpay: {
    label: "Razorpay",
    color: "#f97316",
  },
  paypal: {
    label: "Paypal",
    color: "#ef4444",
  },
}

// Chart Line Linear Config for credit account page
export const creditAccountChartLineLinearConfig: ChartConfig = {
  totalCredits: {
    label: "Total Credits",
    color: "var(--mainColor)",
  },
  spentCredits: {
    label: "Spent Credits",
    color: "var(--mainColor)",
  },
  balanceCredits: {
    label: "Balance Credits",
    color: "var(--mainColor)",
  }
}

export const referralChartLineLinearConfig: ChartConfig = {
  totalReferrals: {
    label: "Total Referrals",
    color: "var(--mainColor)",
  },
  completedReferrals: {
    label: "Completed Referrals",
    color: "var(--mainColor)",
  },
  pendingReferrals: {
    label: "Pending Referrals",
    color: "var(--mainColor)",
  },
  rewardedReferrals: {
    label: "Rewarded Referrals",
    color: "var(--mainColor)",
  },
}

// Admin Dashboard Stats Cards Data
export const userStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: "Total Users",
    key: "totalUsers",
    icon: Users,
  },
  {
    title: "Email Verified Users",
    key: "emailVerifiedUsers",
    icon: UserCheck,
  },
  {
    title: "Blocked Users",
    key: "blockedUsers",
    icon: UserX,
  },
]

export const providerStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: "Total Providers",
    key: "totalProviders",
    icon: Users,
  },
  {
    title: "Email Verified Providers",
    key: "emailVerifiedProviders",
    icon: UserCheck,
  },
  {
    title: "Admin Verified Providers",
    key: "adminVerifiedProviders",
    icon: ShieldCheck,
  },
  {
    title: "Slotflow verified",
    key: "slotflowTrustedProviders",
    icon: Verified,
  },
  {
    title: "Blocked Providers",
    key: "blockedProviders",
    icon: UserX,
  },
  {
    title: "Address Added Providers",
    key: "addressAddedProviders",
    icon: MapPin,
  },
  {
    title: "Service Added Providers",
    key: "serviceAddedProviders",
    icon: Briefcase,
  },
  {
    title: "Availability Added Providers",
    key: "availabilityAddedProviders",
    icon: CalendarClock,
  },
]

export const subscriptionStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: "Active Subscriptions",
    key: "activeSubscriptions",
    icon: BadgeCheck,
  },
  {
    title: "Expired Subscriptions",
    key: "expiredSubscriptions",
    icon: Ban,
  },
  {
    title: "Free-Trial Plan Subscriptions",
    key: "subscriptionsByFreePlan",
    icon: LayoutGrid,
  },
  {
    title: "Starter Plan Subscriptions",
    key: "subscriptionsByStarterPlan",
    icon: Layers,
  },
  {
    title: "Professional Plan Subscriptions",
    key: "subscriptionsByProfessionalPlan",
    icon: Rocket,
  },
  {
    title: "Enterprise Plan Subscriptions",
    key: "subscriptionsByEnterprisePlan",
    icon: Gem,
  },
]

export const revenueAnAndPaymentsStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: "Total Revenue",
    key: "totalRevenue",
    icon: Banknote,
    price: true,
  },
  {
    title: "Revenue via Subscriptions",
    key: "totalRevenueViaSubscriptions",
    icon: Receipt,
    price: true,
  },
  {
    title: "Revenue via stripe",
    key: "revenueByStripe",
    icon: Wallet2Icon,
    price: true,
  },
  {
    title: "Revenue via razorpay",
    key: "revenueByRazorpay",
    icon: WalletCards,
    price: true,
  },
  {
    title: "Revenue via paypal",
    key: "revenueByPaypal",
    icon: WalletMinimal,
    price: true,
  },
  {
    title: "Revenue via Appointments",
    key: "totalRevenueViaAppointments",
    icon: CreditCard,
    price: true,
  },
  {
    title: "Total Refunds Issued",
    key: "totalRefundsIssued",
    icon: RotateCcw,
    price: true,
  },
  {
    title: "Failed Payments",
    key: "totalFailedPayments",
    icon: XCircle,
    price: false,
  },
  {
    title: "Total Payouts to Providers",
    key: "totalPayoutsToProviders",
    icon: Wallet,
    price: true,
  },
]

export const AppointmentsStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: "Total Appointments",
    key: "totalAppointments",
    icon: CalendarCheck,
  },
  {
    title: "Completed Appointments",
    key: "completedAppointments",
    icon: CheckCircle,
  },
  {
    title: "Cancelled Appointments",
    key: "cancelledAppointments",
    icon: XCircle,
  },
  {
    title: "Missed Appointments",
    key: "missedAppointments",
    icon: Ban,
  },
  {
    title: "Rejected Appointments",
    key: "rejectedAppointments",
    icon: ThumbsDown,
  },
];


// Address creating, service details creating and service availability creating page side box data
export const progressBars: { [key: number]: boolean[] } = {
  0: [true, false, false, false, false],
  1: [true, false, false, false, false],
  2: [true, true, false, false, false],
  3: [true, true, true, false, false],
  4: [true, true, true, true, false],
  5: [true, true, true, true, true],
};

const sidebarHeadings: string[] = [
  'Setup',
  'Address',
  'Service',
  'Availability',
  "Upload Proofs",
  "Approval"
];

export const pageLabels: { [key: number]: string[] } = {
  0: sidebarHeadings,
  1: sidebarHeadings,
  2: sidebarHeadings,
  3: sidebarHeadings,
  4: sidebarHeadings,
  5: sidebarHeadings
};

export const pageDescriptions: { [key: number]: string } = {
  0: "Welcome to Slotflow! We're excited to have you on board. Let’s get you set up what would you like to do?.",
  1: "Provide your service address accurately to ensure seamless customer bookings.",
  2: "Provide detailed information about your services for clarity and transparency.",
  3: "Set your service availability to manage customer appointments efficiently.",
  4: "Upload your proof of identity. Make sure to upload the current documents within the specified size and format limits.",
  5: "Our team is reviewing your service registration request. You will be notified via email once your request is approved. Thank you for your patience.",
};

export const addAddressGoogleMapLinkInfoHeading: string = "Select Your Exact Location";

export const addAddressGoogleMapLinkInfo: string = `Use the map to select your exact location.  
Click on the map to drop a marker at your address.  
This helps us provide accurate location based services and ensures more precise search results.  
Your selected location will also be used to automatically fill address details wherever possible.`;


// Hero section
export const heroSectionButtons: { text: string, href: string }[] = [
  {
    text: "Book Appointment",
    href: "/auth/login"
  },
  {
    text: "Provide Service",
    href: "/auth/login"
  },
]


// About Page
export const aboutIntro: string[] = [
  "Slotflow is more than just a booking tool, it is your complete scheduling companion for the digital age. We empower businesses, professionals, and teams to manage appointments, streamline operations, and provide a frictionless experience to their customers. Whether you are a solo entrepreneur or an enterprise level service provider, Slotflow adapts to your needs and scales with your growth.",
  "Built with modern technology and designed with a human first approach, Slotflow integrates real time booking, instant notifications, and smooth Google Calendar sync so you never miss an appointment. Features like in app chat and video calls allow you to connect with clients instantly, while our intuitive interface ensures both providers and customers enjoy a clean and effortless experience.",
  "Our mission is to create a platform that removes the chaos from scheduling, saves time for businesses, and delivers a polished, professional experience every step of the way. With continuous improvements, innovative integrations, and an obsession for user experience, Slotflow is the future of appointment management."
];

export const aboutFeatures: string[] = [
  "From smart scheduling to automated workflows, Slotflow takes care of the details so you can focus on what matters most, your clients. Our platform supports role based dashboards for users, providers, and admins, ensuring each stakeholder gets the tools they need. Flexible subscription tiers let you start for free and upgrade as your business grows, while automation handles confirmations, reminders, and updates without requiring constant manual effort.",
  "Real time synchronization keeps everyone aligned, preventing double bookings and miscommunication. We prioritize scalability and security so your data is safe and performance stays smooth as demand increases. Detailed analytics provide insights into revenue and customer trends, helping you make smarter business decisions. And because we are future focused, Slotflow evolves continuously with new features, integrations, and optimizations driven by user feedback."
];

export const devWebPortfoilio: string = "https://midhunkpaniker.vercel.app/";


// Contact Page
export const contactData: ContactItem[] = [
  {
    icon: Phone,
    label: "Phone (IN)",
    value: "+91 97154 3274799",
    href: "tel:+91971543274799",
  },
  {
    icon: Mail,
    label: "Email",
    value: "slotfloe.booking@gmail.com",
    href: "mailto: slotflow.booking0@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Kerala, India",
  },
];


// Privacy Policy
export const privacyPolicyContent: string[] = [
  "At Slotflow, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our platform.",
  "We collect information such as your name, email, contact details, and booking data to deliver a seamless scheduling experience. Your data helps us confirm appointments, send reminders, and improve our services.",
  "Slotflow does not sell, rent, or trade your information to third parties. We only share data with trusted service providers (like payment processors or communication tools) when necessary to operate our platform.",
  "You can update or delete your data anytime by contacting our support team. We implement industry-standard security practices to protect your information from unauthorized access or misuse.",
  "By using Slotflow, you consent to the terms outlined in this Privacy Policy. Updates to this policy will be communicated through our website or email."
];


// Terms and Conditions
export const termsAndConditionsContent: string[] = [
  "Welcome to Slotflow. By using our platform, you agree to these Terms & Conditions, so please read them carefully before proceeding.",
  "Slotflow provides appointment scheduling and business management tools. You are responsible for the accuracy of the information you provide, including service details, availability, and contact data.",
  "You must not use Slotflow for unlawful, harmful, or fraudulent activities. We reserve the right to suspend or terminate accounts that violate these terms.",
  "Payments for paid plans are billed according to the selected subscription and must be completed on time to maintain access to premium features.",
  "Slotflow may update these terms periodically. Continued use of the platform after updates indicates your acceptance of the revised terms."
];

// Admin dashboard overview tabs
export const adminOverviewTabs: CommonTabInterface[] = [
  { value: "users", label: "Users", icon: Users },
  { value: "providers", label: "Providers", icon: UserCheck },
  { value: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { value: "revenue", label: "Revenue", icon: DollarSign },
  { value: "appointments", label: "Appointments", icon: CalendarCheck },
]

// Profile tabs list
export const profileTabs: CommonTabInterface[] = [
  { value: "tab1", label: "Profile", icon: User, role: [Role.PROVIDER, Role.USER] },
  { value: "tab2", label: "Address", icon: Home, role: [Role.PROVIDER, Role.USER] },
  { value: "tab3", label: "Service", icon: Briefcase, role: [Role.PROVIDER] },
  { value: "tab4", label: "Availability", icon: Clock, role: [Role.PROVIDER] },
];

// Provider dashboard tabs
export const providerDashboardTabs: CommonTabInterface[] = [
  { value: "stats", label: "Stats", icon: Activity },
  { value: "graphs", label: "Graphs", icon: BarChart },
];


// Settings Page Tabs
export const settingsTabs: CommonTabInterface[] = [
  {
    value: "notifications",
    label: "Notifications",
    icon: Mail,
  },
  {
    value: "security",
    label: "Account & Security",
    icon: Shield,
  },
  {
    value: "integrations",
    label: "Integrations",
    icon: CreditCard,
  },
  {
    value: "personalization",
    label: "Personalization",
    icon: Palette,
  },
]

// Advertisement visibility select field options
export const adVisibilityOptions: OptionType<boolean>[] = [
  { label: "Ad Visible", value: true },
  { label: "No Ad Visibility", value: false },
];

// 
export const serviceTypeOptions: OptionType<ServiceType>[] = [
  { label: "One Time", value: ServiceType.ONE_TIME },
  { label: "Recurring", value: ServiceType.RECURRING },
];

//
export const serviceModeOptions: OptionType<ServiceMode>[] = [
  { label: "Online", value: ServiceMode.ONLINE },
  { label: "Offline", value: ServiceMode.OFFLINE },
  { label: "Both", value: ServiceMode.BOTH },
];

//
export const groupOptions: OptionType<boolean>[] = [
  { label: "Group", value: true },
  { label: "Individual", value: false },
];


// Days of Week Options
export const daysOfWeekOptions: OptionType<string>[] = [
  { label: "Sunday", value: "Sunday" },
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" }
];

// Service Duration Options
export const serviceDurationsOptions: OptionType<number>[] = [
  { label: "10 minutes", value: 10 },
  { label: "15 minutes", value: 15 },
  { label: "30 minutes", value: 30 },
  { label: "45 minutes", value: 45 },
  { label: "1 hour", value: 60 },
  { label: "1 hour 15 minutes", value: 75 },
  { label: "1 hour 30 minutes", value: 90 },
  { label: "1 hour 45 minutes", value: 105 },
  { label: "2 hours", value: 120 },
  { label: "3 hours", value: 180 },
  { label: "4hour", value: 240 },
  { label: "5 hours", value: 300 },
  { label: "6 hours", value: 360 },
  { label: "7 hours", value: 420 },
  { label: "8 hours", value: 480 }
];

// Service Categories Options
export const serviceCategoryOptions: OptionType<ServiceCategory>[] = [
  {
    label: "Healthcare & Wellness",
    value: ServiceCategory.HEALTHCARE_AND_WELLNESS,
  },
  {
    label: "Professional Services",
    value: ServiceCategory.PROFESSIONAL_SERVICES,
  },
  {
    label: "Education & Training",
    value: ServiceCategory.EDUCATION_AND_TRAINING,
  },
  {
    label: "Home & Maintenance",
    value: ServiceCategory.HOME_AND_MAINTENANCE,
  },
  {
    label: "Beauty & Personal Care",
    value: ServiceCategory.BEAUTY_AND_PERSONAL_CARE,
  },
  {
    label: "Fitness & Lifestyle",
    value: ServiceCategory.FITNESS_AND_LIFESTYLE,
  },
  {
    label: "Automotive Services",
    value: ServiceCategory.AUTOMOTIVE_SERVICES,
  },
  {
    label: "Events & Creative Services",
    value: ServiceCategory.EVENTS_AND_CREATIVE_SERVICES,
  },
  {
    label: "Technology Services",
    value: ServiceCategory.TECHNOLOGY_SERVICES,
  },
  {
    label: "Real Estate & Property",
    value: ServiceCategory.REAL_ESTATE_AND_PROPERTY,
  },
];


// Planduration options
export const planDurations: OptionType<number>[] = [
  { label: "1 Month", value: 30 },
  { label: "3 Months", value: 90 },
  { label: "6 Months", value: 180 },
  { label: "1 Year", value: 365 }
];

// Planduration options
export const adVisibility: OptionType<boolean>[] = [
  { label: "Ad Visisble", value: true },
  { label: "Ad Not Visible", value: false },
];


// admin provider verification boolean options
export const verificationOptions: OptionType<boolean>[] = [
  { label: "Verified", value: true },
  { label: "Rejected", value: false }
];


// Status text mapper
export const verificationStatusTextMap: Record<AdminVerificationStatus, string> = {
  [AdminVerificationStatus.REQUESTED]: "Submitted for review",
  [AdminVerificationStatus.UNDER_REVIEW]: "Currently under review",
  [AdminVerificationStatus.APPROVED]: "Approved",
  [AdminVerificationStatus.REJECTED]: "Rejected",
  [AdminVerificationStatus.RESUBMITTED]: "Re-submitted for review",
  [AdminVerificationStatus.NOT_REQUESTED]: "Not submitted",
};

export const planNameOptions: OptionType<PlanName>[] = [
  { label: "Trial", value: PlanName.TRIAL },
  { label: "Starter", value: PlanName.STARTER },
  { label: "Professional", value: PlanName.PROFESSIONAL },
  { label: "Enterprise", value: PlanName.ENTERPRISE },
  { label: "No Subscription", value: PlanName.NO_SUBSCRIPTION },
];

export const storeConstants: Record<string, string> = {
  storeKey: "slotflow",
  resetState: "RESET_STATE"
};

export const redirectPaths: Record<string, string> = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  VERIFY_EMAIL: "/auth/verify/email",
  RESET_PASSWORD: "/auth/reset/password",
  VERIFY_OTP: "/auth/verify/otp",
  PRE_BOARDING_ROLE: "/preboarding/role",
  PRE_BOARDING_HEAR_ABOUT_US: "/preboarding/hear-about-us",
  ONBOARDING_ADDRESS: "/onboarding/address",
  ONBOARDING_SERVICE: "/onboarding/service",
  ONBOARDING_AVAILABILITY: "/onboarding/availability",
  ONBOARDING_PROOFS: "/onboarding/proofs",
  ONBOARDING_PENDING: "/onboarding/pending",
  USER_HOME: "/user",
  PROVIDER_HOME: "/provider",
  ADMIN_DASHBOARD: "/admin/dashboard",
};

export const basePaths: Record<string, string> = {
  user: "/user",
  provider: "/provider",
  admin: "/admin",
  login: "/login"
};

export const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export const mapDotLitLocationsCoordinates: MapDotLitLocationsCoordinates[] = [
  { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
  { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
  { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
  { start: { lat: 19.0760, lng: 72.8777 }, end: { lat: 28.6139, lng: 77.209 } },
  { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
  { start: { lat: 22.5726, lng: 88.3639 }, end: { lat: 28.6139, lng: 77.209 } }
]

export const hearAboutUsOptions: HearAboutUsOptions[] = [
  { label: "Google Search", value: HearAboutUsOptionValue.GOOGLE, icon: Search },
  { label: "Friend / Referral", value: HearAboutUsOptionValue.REFERRAL, icon: Users },
  { label: "YouTube", value: HearAboutUsOptionValue.YOUTUBE, icon: Youtube },
  { label: "LinkedIn", value: HearAboutUsOptionValue.LINKEDIN, icon: Linkedin },
  { label: "Twitter (X)", value: HearAboutUsOptionValue.TWITTER, icon: Twitter },
  { label: "Instagram", value: HearAboutUsOptionValue.INSTAGRAM, icon: Instagram },
  { label: "WhatsApp", value: HearAboutUsOptionValue.WHATSAPP, icon: MessageCircle },
  { label: "Facebook", value: HearAboutUsOptionValue.FACEBOOK, icon: Facebook },
  { label: "Threads", value: HearAboutUsOptionValue.THREADS, icon: AtSign },
  { label: "Other", value: HearAboutUsOptionValue.OTHER, icon: HelpCircle },
]

//
export const preBoardingTitles: string[] = [
  "Choose your account type",
  "Where did you hear about us?"
]

// onboarding titles
export const onboardingContent = {
  setupRole: {
    title: "Select Your Account Type",
    description: "Choose how you will use the platform.",
  },
  hearAboutUs: {
    title: "Source of Discovery",
    description: "Tell us how you found our platform.",
  },
  address: {
    title: "Provide Your Address",
    description: "Enter your location for accurate service matching.",
  },
  serviceDetails: {
    title: "Define Your Services",
    description: "Describe the services you offer to customers.",
  },
  availability: {
    title: "Set Your Availability",
    description: "Specify when you are available for bookings.",
  },
  proofs: {
    title: "Upload Verification Documents",
    description: "Submit required documents for identity verification.",
  },
  profileApproval: {
    title: "Profile Review and Approval",
    description: "Submit your profile for verification and approval.",
    description2: "Submit your profile for review. Our team will verify your details within one business day.",
    description3: "Your profile is under review. This may take up to 24 hours."
  },
};

export const defaultButtonClassName = "cursor-pointer transition-colors duration-300 hover:text-white hover:bg-[var(--mainColor)]";

export const destructiveButtonClassName = "cursor-pointer transition-colors duration-300 hover:text-white hover:bg-red-500";

// main actions : default
// side actions : secondary