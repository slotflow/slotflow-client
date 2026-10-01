import { lazy } from "react";
import RoleLayout from "./RoleLayout";
import { Role } from "@/shared/types/enums";
import { ProtectedRoute } from "./ProtectedRoutes";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { RouteNames } from "@/shared/utils/constants/routeConstants";

import AuthLayout from "@/layouts/AuthLayout";
import OnBoardingGuard from "./OnBoardingGuard";
import LandingLayout from "@/layouts/LandingLayout";
import BoardingLayoutWrapper from "./BoardingLayoutWrapper";

import LandingPage from "@/pages/landing/LandingPage";

const AboutPage = lazy(() => import("@/pages/landing/AboutPage"));
const ContactPage = lazy(() => import("@/pages/landing/ContactPage"));
const PricingPage = lazy(() => import("@/pages/landing/PricingPage"));
const BlogPage = lazy(() => import("@/pages/landing/BlogPage"));
const FAQPage = lazy(() => import("@/pages/landing/FAQPage"));
const HelpPage = lazy(() => import("@/pages/landing/HelpPage"));

const BlogDetailsPage = lazy(() => import("@/pages/landing/BlogDetailsPage"));
const LegalHomePage = lazy(() => import("@/pages/landing/legal/LegalHomePage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/landing/legal/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("@/pages/landing/legal/TermsOfServicePage"));

const LoginForm = lazy(() => import("@/components/form/Common/LoginForm"));
const SignUpForm = lazy(() => import("@/components/form/Common/SignUpForm"));
const EmailVerificationForm = lazy(() => import("@/components/form/Common/EmailVerificationForm"));
const ResetPasswordForm = lazy(() => import("@/components/form/Common/ResetPasswordForm"));
const OtpVerificatioForm = lazy(() => import("@/components/form/Common/OtpVerificatioForm"));

const RoleSelectPage = lazy(() => import("@/pages/boarding/RoleSelectPage"));
const UserNamePage = lazy(() => import("@/pages/boarding/UserNamePage"));
const HearAboutUsPage = lazy(() => import("@/pages/boarding/HearAboutUsPage"));
const ProviderCreateAddressPage = lazy(() => import("@/pages/boarding/ProviderCreateAddressPage"));
const ProviderCreateServiceDetailsPage = lazy(() => import("@/pages/boarding/ProviderCreateServiceDetailsPage"));
const ProviderCreateServiceAvailabilityPage = lazy(() => import("@/pages/boarding/ProviderCreateServiceAvailabilityPage"));
const ProviderProofSubmissionPage = lazy(() => import("@/pages/boarding/ProviderProofSubmitionPage"));
const ProviderApprovalPendingPage = lazy(() => import("@/pages/boarding/ProviderApprovalPendingPage"));

const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const ServicesPage = lazy(() => import("@/pages/dashboard/ServicesPage"));
const ServiceProvidersPage = lazy(() => import("@/pages/dashboard/ServiceProvidersPage"));
const SubscriptionsPage = lazy(() => import("@/pages/dashboard/SubscriptionsPage"));
const SubscriptionDetailsPage = lazy(() => import("@/pages/dashboard/SubscriptionDetailsPage"));
const ServiceProviderDetailsPage = lazy(() => import("@/pages/dashboard/ServiceProviderDetailsPage"));
const BookingsPage = lazy(() => import("@/pages/dashboard/BookingsPage"));
const BookingDetailsPage = lazy(() => import("@/pages/dashboard/BookingDetailsPage"));
const PaymentsPage = lazy(() => import("@/pages/dashboard/PaymentsPage"));
const PaymentDetailsPage = lazy(() => import("@/pages/dashboard/PaymentDetailsPage"));
const CalendarPage = lazy(() => import("@/pages/dashboard/CalendarPage"));
const ChatPage = lazy(() => import("@/pages/dashboard/ChatPage"));
const ReviewsPage = lazy(() => import("@/pages/dashboard/ReviewsPage"));
const CreditsPage = lazy(() => import("@/pages/dashboard/CreditsPage"));
const ReferralsPage = lazy(() => import("@/pages/dashboard/ReferralPage"));
const ProfilePage = lazy(() => import("@/pages/dashboard/ProfilePage"));
const ReportPage = lazy(() => import("@/pages/dashboard/ReportPage"));
const PlansPage = lazy(() => import("@/pages/dashboard/PlansPage"));
const PlanDetailsPage = lazy(() => import("@/pages/dashboard/PlanDetailsPage"));
const UsersPage = lazy(() => import("@/pages/dashboard/UsersPage"));
const UserDetailsPage = lazy(() => import("@/pages/dashboard/UserDetailsPage"));
const GrafanaPage = lazy(() => import("@/pages/dashboard/GrafanaPage"));
const UpgradePage = lazy(() => import("@/pages/dashboard/UpgradePage"));
const VideoCallLobbyPage = lazy(() => import("@/pages/dashboard/VideoCallLobbyPage"));
const VideoCallRoomPage = lazy(() => import("@/pages/dashboard/VideoCallRoomPage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));
const SettingsMenuPage = lazy(() => import("@/pages/dashboard/SettingsMenuPage"));
const NotificationSettingsPage = lazy(() => import("@/pages/dashboard/NotificationSettingsPage"));
const AccountSettingsPage = lazy(() => import("@/pages/dashboard/AccountSettingsPage"));
const IntegrationsSettingsPage = lazy(() => import("@/pages/dashboard/IntegrationsSettingsPage"));
const SecuritySettingsPage = lazy(() => import("@/components/settings/SecuritySettingsPage"));
const SandboxPage = lazy(() => import("@/pages/dashboard/SandboxPage"));

const Error404Page = lazy(() => import("@/pages/fallbacks/Error404Page"));

const AuthCallbackPage = lazy(() => import("@/components/form/Common/AuthCallbackPage"));
const UserBookingCallbackPage = lazy(() => import("@/pages/dashboard/UserBookingCallbackPage"));
const IntegrationsCallbackPage = lazy(() => import("@/pages/dashboard/IntegrationsCallbackPage"));
const ProviderSubscriptionCallbackPage = lazy(() => import("@/pages/dashboard/ProviderSubscriptionCallbackPage"));

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
            { path: 'auth/callback', element: <AuthCallbackPage /> },
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
                path: '/profile-setup',
                children: [
                    { index: true, element: <Navigate to="role" replace /> },
                    { path: 'role', element: <RoleSelectPage /> },
                    { path: 'how-should-we-address-you', element: <UserNamePage /> },
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