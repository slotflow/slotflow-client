import {
  Banknote,
  CalendarCheck,
  CheckCircle,
  Clock,
  Hourglass,
  Receipt,
  TrendingUp,
  Wallet,
  XCircle,
  Ban,
  ThumbsDown,
  UserPlus,
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  MapPin,
  Briefcase,
  CalendarClock,
  BadgeCheck,
  LayoutGrid,
  Layers,
  Rocket,
  Gem,
  CreditCard,
  RotateCcw,
  Wallet2Icon,
  WalletCards,
  WalletMinimal,
  MessageSquareText,
  PictureInPicture2,
  Phone,
  Mail,
  Verified,
  Gauge,
  BookLock,
  Handshake,
  ScanHeart,
  MessageSquare,
  Video,
  Calendar1,
  Star,
  Bell,
  Settings,
  Combine,
  User,
  Shield,
  Palette,
  Activity,
  DollarSign,
  Home,
  BarChart,
} from "lucide-react";
import { ProviderFetchDashboardStatsDataResponse } from "./interface/api/providerApiInterface";
import { CommonTabInterface, dataSelectListItemInterface, DayMapInterface, FeatureContentInterface, FooterColumnDataInterface, FooterLinkInterface, gsapBigSvgYDirectionAnimationInterface, HeaderCompoenentNavsProps, PlanFeatureInterface, PlanListType, ProviderApprovalMessageInterface, Role, Route, SelectOptions, StatsMapForAdminInterface, statsMapIntrface } from "./interface/commonInterface";

import chatImage from '../assets/heroImages/caht.jpg';
import gCalendar from '../assets/iconImages/gCalendar.png';
import videoCallImage from '../assets/heroImages/videoCall.jpg';
import calendarImage from '../assets/heroImages/calendar2.png';;
import bookingImage from '../assets/heroImages/heroSectionOneImg2.png';
import { ContactItem } from "./interface/componentInterface/commonComponentInterface";

// **** Routes for admin **** \\
export const adminRoutes: Route[] = [
  { path: "overview", name: "Overview", icon: Gauge },
  { path: "report", name: "Reports", icon: BookLock },
  { path: "service-providers", name: "Service Providers", icon: Handshake },
  { path: "users", name: "Users", icon: Users },
  { path: "services", name: "Services", icon: Briefcase },
  { path: "plans", name: "Plans", icon: LayoutGrid },
  { path: "subscriptions", name: "Subscriptions", icon: CreditCard },
  { path: "payments", name: "Payments", icon: Handshake },
  { path: "api-strength", name: "Api Strength", icon: ScanHeart },
]

// **** Routes for user **** \\
export const userRoutes: Route[] = [
  { path: "dashboard", name: "Dashboard", icon: Gauge },
  { path: "profile", name: "Profile", icon: User },
  { path: "bookings", name: "Bookings", icon: CalendarCheck },
  { path: "payments", name: "Payments", icon: CreditCard },
  { path: "integrations", name: "Integrations", icon: Combine },
  { path: "chat", name: "Chat", icon: MessageSquare },
  { path: "calendar", name: "Calendar", icon: Calendar1 },
  { path: "video-call", name: "Video call", icon: Video },
  { path: "reviews", name: "Reviews", icon: Star },
  { path: "notifications", name: "Notifications", icon: Bell },
  { path: "settings", name: "Settings", icon: Settings },
]

// **** Routes for provider **** \\
export const providerRoutes: Route[] = [
  { path: "dashboard", name: "Dashboard", icon: Gauge },
  { path: "profile", name: "Profile", icon: User },
  { path: "appointments", name: "Appointments", icon: CalendarCheck },
  { path: "subscriptions", name: "Subscriptions", icon: CreditCard },
  { path: "payments", name: "Payments", icon: Handshake },
  { path: "integrations", name: "Integrations", icon: Combine },
  { path: "calendar", name: "Calendar", icon: Calendar1 },
  { path: "chat", name: "Chat", icon: MessageSquare },
  { path: "video-call", name: "Video call", icon: Video },
  { path: "reviews", name: "Reviews", icon: Star },
  { path: "notifications", name: "Notifications", icon: Bell },
  { path: "settings", name: "Settings", icon: Settings },
]

// Access Control For Provider
export const planAccessMap: Record<string, string[]> = {
  NoSubscription: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
    "Subscriptions",
    "Settings",
  ],
  Free: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
    "Appointments",
    "Subscriptions",
    "Settings",
  ],
  Starter: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
    "Appointments",
    "Subscriptions",
    "Payments",
    "Integrations",
    "Notifications",
    "Settings",
  ],
  Professional: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
    "Appointments",
    "Subscriptions",
    "Payments",
    "Notifications",
    "Integrations",
    "Chat",
    "Video call",
    "Reviews",
    "Settings",
  ],
  Enterprise: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
    "Appointments",
    "Subscriptions",
    "Payments",
    "Notifications",
    "Integrations",
    "Chat",
    "Calendar",
    "Video call",
    "Reviews",
    "Settings",
  ],
};


// **** Gsap animation common oject **** \\
export const gsapBigSvgYDirectionAnimation: gsapBigSvgYDirectionAnimationInterface = {
  y: 20,
  duration: 1,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
}

// **** Header Navigation Array ***** \\
export const navigation: HeaderCompoenentNavsProps[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Features', href: '/#features', current: false },
  { name: 'Pricing', href: '/#pricing', current: false },
  { name: 'Reviews', href: '/#reviews', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
]

// **** Provider plan subscription duration array **** \\
export const planDurations: { durationName: string; durationMonth: number }[] = [
  { durationName: "1 Month", durationMonth: 1 },
  { durationName: "3 Months", durationMonth: 3 },
  { durationName: "6 Months", durationMonth: 6 },
  { durationName: "12 Months", durationMonth: 12 }
];

// **** Tabs for provider profile showing in admin side and provider side **** \\
export const providerTabs: { tabName: string, admin: boolean, user: boolean }[] = [
  { tabName: "Details", admin: true, user: true },
  { tabName: "Address", admin: true, user: true },
  { tabName: "Service", admin: true, user: true },
  { tabName: "Availability", admin: true, user: true },
  { tabName: "Reviews", admin: true, user: true },
  { tabName: "Subscriptions", admin: true, user: false },
  { tabName: "Payments", admin: true, user: false }
];

export const userTabs: { tabName: string, admin: boolean, user: boolean }[] = [
  { tabName: "Details", admin: true, user: true },
  { tabName: "Address", admin: true, user: true },
  { tabName: "Reviews", admin: true, user: true },
];

// **** Provider service availability component day map **** \\
export const dayMap: DayMapInterface = {
  "Sun": { day: "Sunday", tab: 0 },
  "Mon": { day: "Monday", tab: 1 },
  "Tue": { day: "Tuesday", tab: 2 },
  "Wed": { day: "Wednesday", tab: 3 },
  "Thu": { day: "Thursday", tab: 4 },
  "Fri": { day: "Friday", tab: 5 },
  "Sat": { day: "Saturday", tab: 6 }
}

// **** Not chat selected shimmer constants **** \\
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

// **** ChartHeader date selector data **** \\
export const dateSelectList: dataSelectListItemInterface[] = [
  { value: "7d", content: "Last 7 days" },
  { value: "14d", content: "Last 14 days" },
  { value: "30d", content: "Last month" },
  { value: "60d", content: "Last 2 months" },
  { value: "90d", content: "Last 3 months" },
  { value: "180d", content: "Last 6 months" },
  { value: "365d", content: "Last year" },
]


// **** Pricing Setion Data
export const PlanList: PlanListType = [
  {
    _id: "0",
    planName: "Free",
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
    planName: "Starter",
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
    planName: "Professional",
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
    planName: "Enterprise",
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


//// **** Plan feature comparison table
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


// **** FooterBar Data
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
    ],
  },
]
export const copyright: string = " slotflow All rights reserved"
export const policies: FooterLinkInterface[] = [
  { text: "Privacy Policy", href: "/privacy-policy" },
  { text: "Terms of Service", href: "/terms-and-conditions" },
]
export const about: string = "Simplifying appointment scheduling for individuals and professionals. Stay organized, save time, and make every slot count.";


// **** Approval Pending Page data
export const approvalMessages: ProviderApprovalMessageInterface = {
  heading: "Approval in Progress",
  message1: "Thank you for your patience. Your request is currently being reviewed. We will notify you as soon as the process is complete.",
  message2: "We will notify you via email.",
  footerNote: "If you have any queries, please contact us.",
};


// **** Features Section Content
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


// **** Provider Dashboard Stats Cards Data
export const statsMapForProvider: Array<statsMapIntrface<ProviderFetchDashboardStatsDataResponse>> = [
  {
    title: "Total Appointments",
    key: "totalAppointments",
    icon: CalendarCheck,
    plans: ["Starter", "Professional", "Enterprise"],
  },
  {
    title: "Today’s Appointments",
    key: "todaysAppointments",
    icon: Clock,
    plans: ["Starter", "Professional", "Enterprise"],
  },
  {
    title: "Subscription Payments",
    key: "totalSubscriptionPaidAmount",
    icon: Receipt,
    price: true,
    plans: ["Starter", "Professional", "Enterprise"],
  },
  {
    title: "Total Earnings",
    key: "totalEarnings",
    icon: Banknote,
    price: true,
    plans: ["Starter", "Professional", "Enterprise"],
  },
  {
    title: "Total Payouts Made",
    key: "totalPayoutsMade",
    icon: Wallet,
    price: true,
    plans: ["Starter", "Professional", "Enterprise"],
  },
  {
    title: "Completed Appointments",
    key: "completedAppointments",
    icon: CheckCircle,
    plans: ["Professional", "Enterprise"],
  },
  {
    title: "Missed Appointments",
    key: "missedAppointments",
    icon: XCircle,
    plans: ["Professional", "Enterprise"],
  },
  {
    title: "Cancelled by User",
    key: "cancelledAppointmentsByUser",
    icon: Ban,
    plans: ["Enterprise"],
  },
  {
    title: "Rejected by Provider",
    key: "rejectedAppointmentsByProvider",
    icon: ThumbsDown,
    plans: ["Enterprise"],
  },
  {
    title: "Today’s Earnings",
    key: "todaysEarnings",
    icon: TrendingUp,
    price: true,
    plans: ["Professional", "Enterprise"],
  },
  {
    title: "Pending Payout",
    key: "pendingPayout",
    icon: Hourglass,
    price: true,
    plans: ["Professional", "Enterprise"],
  },
];


// **** Provider Dashboard Graphs map according to plan
export const planChartAccess: Record<string, string[]> = {
  Starter: [
    "AppointmentsOverTime",
    "TopBookingDays",
  ],
  Professional: [
    "AppointmentsOverTime",
    "TopBookingDays",
    "AppointmentModeTrend",
    "NewVsReturningUsers",
  ],
  Enterprise: [
    "AppointmentsOverTime",
    "TopBookingDays",
    "AppointmentModeTrend",
    "NewVsReturningUsers",
    "AppointmentDistribution",
    "PeakBookingHours",
    "AppointmentCompletionBreakdown",
  ],
};


// **** Provider and Admin Dashboard Graphs configs
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


// **** Admin Dashboard Stats Cards Data
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

export const todayStatsMapForAdmin: StatsMapForAdminInterface[] = [
  {
    title: "New Users",
    key: "newUsers",
    icon: UserPlus,
  },
  {
    title: "New Providers",
    key: "newProviders",
    icon: UserCheck,
  },
  {
    title: "Today’s Revenue",
    key: "todaysTotalRevenue",
    icon: TrendingUp,
    price: true,
  },
  {
    title: "Today’s Payouts",
    key: "todaysTotalPayouts",
    icon: Wallet,
    price: true,
  },
  {
    title: "Today’s Appointments",
    key: "todaysAppointments",
    icon: CalendarCheck,
  },
  {
    title: "Today’s Cancellations",
    key: "todaysCancelledAppointments",
    icon: Ban,
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
    title: "Free Plan Subscriptions",
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


// Address adding, service details adding and service availability adding page side box data
export const progressBars: { [key: number]: boolean[] } = {
  1: [true, false, false, false],
  2: [true, true, false, false],
  3: [true, true, true, false],
  4: [true, true, true, false],
};

const sidebarHeadings: string[] = ['Address Details', 'Service Details', 'Availability', "Approval in progress"];
export const pageLabels: { [key: number]: string[] } = {
  1: sidebarHeadings,
  2: sidebarHeadings,
  3: sidebarHeadings,
  4: sidebarHeadings,
};


export const pageDescriptions: { [key: number]: string } = {
  1: 'Add your service address accurately to ensure seamless customer bookings.',
  2: 'Provide detailed information about your services for clarity and transparency.',
  3: 'Set your service availability to manage customer appointments efficiently.',
  4: 'Our team is reviewing your service registration request. You will be notified via email once your request is approved. Thank you for your patience..',
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
    href: "/user/login"
  },
  {
    text: "Provide Service",
    href: "/provider/login"
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


// Landing Layout paths
export const pathNames: string[] = ["/user", '/provider', '/admin'];


// Admin dashboard overview tabs
export const adminOverviewTabs: CommonTabInterface[] = [
  { value: "today", label: "Today", icon: Activity },
  { value: "users", label: "Users", icon: Users },
  { value: "providers", label: "Providers", icon: UserCheck },
  { value: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { value: "revenue", label: "Revenue", icon: DollarSign },
  { value: "appointments", label: "Appointments", icon: CalendarCheck },
]

// Profile tabs list
export const profileTabs: CommonTabInterface[] = [
  { value: "tab1", label: "Profile", icon: User, role: [Role.provider , Role.user] },
  { value: "tab2", label: "Address", icon: Home, role: [Role.provider , Role.user] },
  { value: "tab3", label: "Service", icon: Briefcase, role: [Role.provider] },
  { value: "tab4", label: "Availability", icon: Clock, role: [Role.provider] },
]

// Provider dashboard tabs
export const providerDashboardTabs: CommonTabInterface[] = [
  { value: "stats", label: "Stats", icon: Activity },
  { value: "graphs", label: "Graphs", icon: BarChart },
]


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
export const adVisibilityOptions: SelectOptions = [
  { label: "Ad Visible", value: "true" },
  { label: "No Ad Visibility", value: "false" },
];