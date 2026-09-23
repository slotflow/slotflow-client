import RoleLayout from "./RoleLayout";
import { Role } from "@/shared/types/enums";
import { ProtectedRoute } from "./ProtectedRoutes";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { RouteNames } from "@/shared/utils/constants/routeConstants";

import LandingLayout from "@/layouts/LandingLayout";

import LandingPage from "@/pages/landing/LandingPage";
import AboutPage from "@/pages/landing/AboutPage";
import ContactPage from "@/pages/landing/ContactPage";
import PricingPage from "@/pages/landing/PricingPage";
import BlogPage from "@/pages/landing/BlogPage";
import FAQPage from "@/pages/landing/FAQPage";
import HelpPage from "@/pages/landing/HelpPage";
import BlogDetailsPage from "@/pages/landing/BlogDetailsPage";

import LegalHomePage from "@/pages/landing/legal/LegalHomePage";
import PrivacyPolicyPage from "@/pages/landing/legal/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/landing/legal/TermsOfServicePage";

import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/components/form/Common/LoginForm";
import SignUpForm from "@/components/form/Common/SignUpForm";
import AuthCallbackPage from "@/components/form/Common/AuthCallbackPage";
import EmailVerificationForm from "@/components/form/Common/EmailVerificationForm";
import ResetPasswordForm from "@/components/form/Common/ResetPasswordForm";
import OtpVerificatioForm from "@/components/form/Common/OtpVerificatioForm";

import OnBoardingGuard from "./OnBoardingGuard";
import BoardingLayoutWrapper from "./BoardingLayoutWrapper";
import RoleSelectPage from "@/pages/boarding/RoleSelectPage";
import HearAboutUsPage from "@/pages/boarding/HearAboutUsPage";
import ProviderCreateAddressPage from "@/pages/boarding/ProviderCreateAddressPage";
import ProviderCreateServiceDetailsPage from "@/pages/boarding/ProviderCreateServiceDetailsPage";
import ProviderCreateServiceAvailabilityPage from "@/pages/boarding/ProviderCreateServiceAvailabilityPage";
import ProviderApprovalPendingPage from "@/pages/boarding/ProviderApprovalPendingPage";
import ProviderProofSubmissionPage from "@/pages/boarding/ProviderProofSubmitionPage";


import DashboardPage from "@/pages/dashboard/DashboardPage";
import ServicesPage from "@/pages/dashboard/ServicesPage";
import ServiceProvidersPage from "@/pages/dashboard/ServiceProvidersPage";
import SubscriptionsPage from "@/pages/dashboard/SubscriptionsPage";
import SubscriptionDetailsPage from "@/pages/dashboard/SubscriptionDetailsPage";
import ServiceProviderDetailsPage from "@/pages/dashboard/ServiceProviderDetailsPage";
import BookingsPage from "@/pages/dashboard/BookingsPage";
import BookingDetailsPage from "@/pages/dashboard/BookingDetailsPage";
import PaymentsPage from "@/pages/dashboard/PaymentsPage";
import PaymentDetailsPage from "@/pages/dashboard/PaymentDetailsPage";
import CalendarPage from "@/pages/dashboard/CalendarPage";
import ChatPage from "@/pages/dashboard/ChatPage";
import ReviewsPage from "@/pages/dashboard/ReviewsPage";
import CreditsPage from "@/pages/dashboard/CreditsPage";
import ReferralsPage from "@/pages/dashboard/ReferralPage";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import ReportPage from "@/pages/dashboard/ReportPage";
import PlansPage from "@/pages/dashboard/PlansPage";
import PlanDetailsPage from "@/pages/dashboard/PlanDetailsPage";
import UsersPage from "@/pages/dashboard/UsersPage";
import UserDetailsPage from "@/pages/dashboard/UserDetailsPage";
import GrafanaPage from "@/pages/dashboard/GrafanaPage";
import UpgradePage from "@/pages/dashboard/UpgradePage";
import VideoCallLobbyPage from "@/pages/dashboard/VideoCallLobbyPage";
import VideoCallRoomPage from "@/pages/dashboard/VideoCallRoomPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import SettingsMenuPage from "@/pages/dashboard/SettingsMenuPage";
import NotificationSettingsPage from "@/pages/dashboard/NotificationSettingsPage";
import AccountSettingsPage from "@/pages/dashboard/AccountSettingsPage";
import IntegrationsSettingsPage from "@/pages/dashboard/IntegrationsSettingsPage";
import SecuritySettingsPage from "@/components/settings/SecuritySettingsPage";
import SandboxPage from "@/pages/dashboard/SandboxPage";

import Error404Page from "@/pages/fallbacks/Error404Page";

import UserBookingCallbackPage from "@/pages/user/UserBookingCallbackPage";
import IntegrationsCallbackPage from "@/pages/dashboard/IntegrationsCallbackPage";
import ProviderSubscriptionCallbackPage from "@/pages/dashboard/ProviderSubscriptionCallbackPage";

import { sandboxRegistry } from "@/shared/utils/constants/sandboxRegistry";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            { path: '/', element: <LandingPage /> },
            { path: '/about', element: <AboutPage /> },
            { path: '/contact', element: <ContactPage /> },
            { path: '/pricing', element: <PricingPage /> },
            { path: '/blog', element: <BlogPage /> },
            { path: '/faq', element: <FAQPage /> },
            { path: '/help', element: <HelpPage /> },
            { path: '/blog/:blogId', element: <BlogDetailsPage /> },
            {
                path: '/legal',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <LegalHomePage />,
                    },
                    {
                        path: 'privacy-policy',
                        element: <PrivacyPolicyPage />,
                    },
                    {
                        path: 'terms-of-service',
                        element: <TermsOfServicePage />,
                    },
                    {
                        path: 'refund-policy',
                        element: <LegalHomePage />,
                    },
                    {
                        path: 'cancellation-policy',
                        element: <LegalHomePage />,
                    },
                ],
            },
        ],
    },

    {
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <SignUpForm /> },
            { path: 'callback', element: <AuthCallbackPage /> },
            { path: 'verify/email', element: <EmailVerificationForm /> },
            { path: 'reset/password', element: <ResetPasswordForm /> },
            { path: 'verify/otp', element: <OtpVerificatioForm /> },
        ],
    },

    {
        element: (
            <OnBoardingGuard>
                <BoardingLayoutWrapper />
            </OnBoardingGuard>
        ),
        children: [
            {
                path: '/preboarding',
                children: [
                    { path: 'role', element: <RoleSelectPage /> },
                    { path: 'hear-about-us', element: <HearAboutUsPage /> },
                ],
            },
            {
                path: '/onboarding',
                children: [
                    { path: 'address', element: <ProviderCreateAddressPage /> },
                    { path: 'service', element: <ProviderCreateServiceDetailsPage /> },
                    { path: 'availability', element: <ProviderCreateServiceAvailabilityPage /> },
                    { path: 'proofs', element: <ProviderProofSubmissionPage /> },
                    { path: 'pending', element: <ProviderApprovalPendingPage /> },
                ],
            },
        ],
    },

    {
        path: '/',
        element: (
            <ProtectedRoute allowedRoles={[Role.ADMIN, Role.PROVIDER, Role.USER]}>
                <OnBoardingGuard>
                    <RoleLayout />
                </OnBoardingGuard>
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.PROVIDER]}>
                        <DashboardPage />
                    </ProtectedRoute>
                )
                ,
                handle: { title: RouteNames.DASHBOARD },
            },
            {
                path: 'services',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.USER]}>
                        <ServicesPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.SERVICES },
            },
            {
                path: 'service-providers',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.USER]}>
                        <ServiceProvidersPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.SERVICE_PROVIDERS },
            },
            {
                path: 'service-providers/:providerId',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.USER]}>
                        <ServiceProviderDetailsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.SERVICE_PROVIDERS_DETAILS },
            },
            {
                path: 'subscriptions',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.PROVIDER]}>
                        <SubscriptionsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.SUBSCRIPTIONS },
            },
            {
                path: 'subscriptions/:subscriptionId',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.PROVIDER]}>
                        <SubscriptionDetailsPage />,
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.SUBSCRIPTION_DETAILS },
            },
            {
                path: 'bookings',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER, Role.PROVIDER]}>
                        <BookingsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.BOOKINGS },
            },
            {
                path: 'bookings/:bookingId',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER, Role.PROVIDER]}>
                        <BookingDetailsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.BOOKING_DETAILS },
            },
            {
                path: 'payments',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER, Role.PROVIDER, Role.ADMIN]}>
                        <PaymentsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.PAYMENTS },
            },
            {
                path: 'payments/:paymentId',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER, Role.PROVIDER, Role.ADMIN]}>
                        <PaymentDetailsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.PAYMENT_DETAILS },
            },
            {
                path: 'calendar',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER, Role.PROVIDER]}>
                        <CalendarPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.CALENDAR },
            },
            {
                path: 'chat',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER, Role.PROVIDER]}>
                        <ChatPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.CHAT },
            },
            {
                path: 'reviews',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER, Role.PROVIDER]}>
                        <ReviewsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.REVIEWS },
            },
            {
                path: 'credits',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER, Role.PROVIDER]}>
                        <CreditsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.CREDITS },
            },
            {
                path: 'referrals',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER, Role.PROVIDER]}>
                        <ReferralsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.REFERRALS },
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute allowedRoles={[Role.PROVIDER]}>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.PROFILE },
            },
            {
                path: 'report',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                        <ReportPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.REPORTS },
            },
            {
                path: 'plans',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                        <PlansPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.PLANS },
            },
            {
                path: 'plans/:planId',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                        <PlanDetailsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.PLAN_DETAILS },
            },
            {
                path: 'users',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                        <UsersPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.USERS },
            },
            {
                path: 'users/:userId',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                        <UserDetailsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.USER_DETAILS },
            },
            {
                path: 'grafana-dashboard',
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                        <GrafanaPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.GRAFANA_DASHBOARD },
            },
            {
                path: `upgrade`,
                element: (
                    <ProtectedRoute allowedRoles={[Role.PROVIDER]}>
                        <UpgradePage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.UPGRADE },
            },
            {
                path: 'video-call-lobby/:roomId',
                element: (
                    <ProtectedRoute allowedRoles={[Role.PROVIDER, Role.USER]}>
                        <VideoCallLobbyPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.VIDEO_CALL_LOBBY },
            },
            {
                path: 'video-call-room/:roomId',
                element: (
                    <ProtectedRoute allowedRoles={[Role.PROVIDER, Role.USER]}>
                        <VideoCallRoomPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.VIDEO_CALL },
            },
            {
                path: 'subscription/callback',
                element: (
                    <ProtectedRoute allowedRoles={[Role.PROVIDER]}>
                        <ProviderSubscriptionCallbackPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.SUBSCRIPTION_CALLBACK },
            },
            {
                path: 'booking/callback',
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER]}>
                        <UserBookingCallbackPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.BOOKING_CALLBACK },
            },
            {
                path: 'settings',
                element: (
                    <ProtectedRoute allowedRoles={[Role.PROVIDER, Role.USER]}>
                        <SettingsPage />
                    </ProtectedRoute>
                ),
                handle: { title: RouteNames.SETTINGS },
                children: [
                    {
                        index: true,
                        element: <SettingsMenuPage />,
                        handle: { title: RouteNames.SETTINGS },
                    },
                    {
                        path: 'notifications',
                        element: <NotificationSettingsPage />,
                        handle: { title: RouteNames.NOTIFICATIONS },
                    },
                    {
                        path: 'account',
                        element: <AccountSettingsPage />,
                        handle: { title: RouteNames.ACCOUNT },
                    },
                    {
                        path: 'integrations',
                        element: <IntegrationsSettingsPage />,
                        handle: { title: RouteNames.INTEGRATIONS },
                    },
                    {
                        path: 'integrations/callback',
                        element: <IntegrationsCallbackPage />,
                        handle: { title: RouteNames.INTEGRATION_CALLBACK },
                    },
                    {
                        path: 'security',
                        element: <SecuritySettingsPage />,
                        handle: { title: RouteNames.SECURITY },
                    },
                ],
            },
            {
                path: '*',
                element: <Error404Page />,
                handle: { title: 'Page Not Found' },
            },
        ]
    },

    // Test sandbox routes
     {
        path: 'test-sandbox',
        element: (
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <SandboxPage specs={sandboxRegistry} />
            </ProtectedRoute>
        ),
        handle: { title: RouteNames.TESTSANDBOX },
    },
]);