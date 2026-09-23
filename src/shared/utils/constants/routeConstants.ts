import { Role } from "@/shared/types/enums";
import { Route } from "@/shared/types/common";
import { BookLock, Calendar1, CalendarCheck, Component, CreditCard, Gauge, Handshake, LayoutDashboard, LayoutGrid, LockIcon, Mail, MessageSquare, Rows2, Settings, Shield, Star, TestTube, User, UserPlus, Users, Wallet2Icon } from "lucide-react";

// Route names record
export enum RouteNames {
    DASHBOARD = 'Dashboard',
    SERVICES = 'Services',
    SERVICE_PROVIDERS = 'Service Providers',
    SERVICE_PROVIDERS_DETAILS = 'Service Providers Details',
    SUBSCRIPTIONS = 'Subscriptions',
    SUBSCRIPTION_DETAILS = 'Subscription Details',
    BOOKINGS = 'Bookings',
    BOOKING_DETAILS = 'Booking Details',
    PAYMENTS = 'Payments',
    PAYMENT_DETAILS = 'Payment Details',
    CALENDAR = 'Calendar',
    CHAT = 'Chat',
    REVIEWS = 'Reviews',
    CREDITS = 'Credits',
    REFERRALS = 'Referrals',
    PROFILE = 'Profile',
    PLANS = 'Plans',
    PLAN_DETAILS = 'Plan Details',
    REPORTS = 'Reports',
    USERS = 'Users',
    USER_DETAILS = 'User Details',
    GRAFANA_DASHBOARD = 'Grafana Dashboard',
    UPGRADE = 'Upgrade Plan',
    VIDEO_CALL_LOBBY = 'Video Call Lobby',
    VIDEO_CALL = 'Video Call',
    SETTINGS = 'Settings',
    NOTIFICATIONS = 'Notifications',
    ACCOUNT = 'Account',
    INTEGRATIONS = 'Integrations',
    SECURITY = 'Security',

    SUBSCRIPTION_CALLBACK = 'Subscription Callback',
    BOOKING_CALLBACK = 'Booking Callback',
    INTEGRATION_CALLBACK = 'Integration Callback',

    TESTSANDBOX = 'Test Sandbox',
    DASHBOARDDATACARD = 'Dashboard-data-card',
    CHARTSDEMO = 'Charts-demo',
}

// route for sidebar
export const sidebarRoutes: Route[] = [
    {
        path: 'dashboard',
        name: RouteNames.DASHBOARD,
        icon: LayoutDashboard,
        roles: [Role.ADMIN, Role.PROVIDER],
    },
    {
        path: 'services',
        name: RouteNames.SERVICES,
        icon: Rows2,
        roles: [Role.ADMIN, Role.USER],
    },
    {
        path: 'service-providers',
        name: RouteNames.SERVICE_PROVIDERS,
        icon: Handshake,
        roles: [Role.ADMIN, Role.USER],
    },
    {
        path: 'subscriptions',
        name: RouteNames.SUBSCRIPTIONS,
        icon: CreditCard,
        roles: [Role.ADMIN, Role.PROVIDER],
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
        path: `profile`,
        name: RouteNames.PROFILE,
        icon: User,
        roles: [Role.PROVIDER],
    },
    {
        path: 'report',
        name: RouteNames.REPORTS,
        icon: BookLock,
        roles: [Role.ADMIN],
    },
    {
        path: 'plans',
        name: RouteNames.PLANS,
        icon: LayoutGrid,
        roles: [Role.ADMIN],
    },
    {
        path: 'users',
        name: RouteNames.USERS,
        icon: Users,
        roles: [Role.ADMIN],
    },
    {
        path: 'grafana-dashboard',
        name: RouteNames.GRAFANA_DASHBOARD,
        icon: Gauge,
        roles: [Role.ADMIN],
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
            {
                path: 'charts-demo',
                name: RouteNames.CHARTSDEMO,
                icon: Component,
                roles: [Role.ADMIN],
            },
        ],
    },
];