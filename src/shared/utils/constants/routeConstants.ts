import { Role } from "@/shared/types/enums";
import { Route } from "@/shared/types/common";
import { BookLock, Calendar1, CalendarCheck, Component, CreditCard, Gauge, Handshake, LayoutDashboard, LayoutGrid, LockIcon, Mail, MessageSquare, Rows2, Settings, Shield, Star, TestTube, User, UserPlus, Users, Wallet2Icon } from "lucide-react";

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