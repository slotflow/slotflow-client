import { PlanName } from "@/shared/types/enums";
import { StatsMapForAdminInterface, statsMapIntrface } from "@/shared/types/common";
import { ProviderFetchDashboardBookingStatsDataResponse } from "@/shared/types/api/providerProfile";
import { BadgeCheck, Ban, Banknote, CalendarCheck, CheckCircle, Clock, CreditCard, Gem, Hourglass, Layers, LayoutGrid, Receipt, Rocket, RotateCcw, ShieldCheck, ThumbsDown, UserCheck, UserPlus, Users, UserX, Verified, Wallet, XCircle } from "lucide-react";

// Provider Dashboard Stats Cards Data
export const statsMapForProvider: Array<statsMapIntrface<ProviderFetchDashboardBookingStatsDataResponse>> =
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
  {
    title: 'New Users',
    key: 'newUsers',
    icon: UserPlus,
  },
  {
    title: 'Returning Users',
    key: 'returningUsers',
    icon: UserCheck,
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