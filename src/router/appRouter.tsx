import { lazy } from "react";
import PlanGuard from "./PlanGuard.tsx";
import RoleLayout from "./RoleLayout.tsx";
import { Role } from "@/shared/interface/enums.ts";
import OnBoardingGuard from "./OnBoardingGuard.tsx";
import { ProtectedRoute } from "./ProtectedRoutes.tsx";
import { RouteNames } from "@/shared/utils/constants.ts";
import { createBrowserRouter, Outlet } from "react-router-dom";
import BoardingLayoutWrapper from "./BoardingLayoutWrapper.tsx";
import CreditAccountPage from "@/pages/common/CreditAccountPage.tsx";

const AuthLayout = lazy(() => import("@/layouts/AuthLayout.tsx"));
const LoginForm = lazy(() => import("@/components/form/CommonForms/LoginForm.tsx"));
const SignUpForm = lazy(() => import("@/components/form/CommonForms/SignUpForm.tsx"));
const ResetPasswordForm = lazy(() => import("@/components/form/CommonForms/ResetPasswordForm.tsx"));
const OtpVerificatioForm = lazy(() => import("@/components/form/CommonForms/OtpVerificatioForm.tsx"));
const EmailVerificationForm = lazy(() => import("@/components/form/CommonForms/EmailVerificationForm.tsx"));

const ChatPage = lazy(() => import("@/pages/common/ChatPage.tsx"));
const AboutPage = lazy(() => import("@/pages/common/AboutPage.tsx"));
const LandingLayout = lazy(() => import("@/layouts/LandingLayout.tsx"));
const ContactPage = lazy(() => import("@/pages/common/ContactPage.tsx"));
const ReviewsPage = lazy(() => import("@/pages/common/ReviewsPage.tsx"));
const AccountPage = lazy(() => import("@/pages/common/AccountPage.tsx"));
const LandingPage = lazy(() => import("@/pages/common/LandingPage.tsx"));
const SettingsPage = lazy(() => import("@/pages/common/SettingsPage.tsx"));
const Error404Page = lazy(() => import("@/pages/common/Error404Page.tsx"));
const CalendarPage = lazy(() => import("@/pages/common/CalendarPage.tsx"));
const VideoCallRoom = lazy(() => import("@/pages/common/VideoCallRoom.tsx"));
const VideoCallLoby = lazy(() => import("@/pages/common/VideoCallLobby.tsx"));
const RoleSelectPage = lazy(() => import("@/pages/boarding/RoleSelectPage.tsx"));
const ListPaymentsPage = lazy(() => import("@/pages/common/ListPaymentsPage.tsx"));
const ListBookingsPage = lazy(() => import("@/pages/common/ListBookingsPage.tsx"));
const IntegrationsPage = lazy(() => import("@/pages/common/IntegrationsPage.tsx"));
const HearAboutUsPage = lazy(() => import("@/pages/boarding/HearAboutUsPage.tsx"));
const PrivacyPolicyPage = lazy(() => import("@/pages/common/PrivacyPolicyPage.tsx"));
const BookingDetailPage = lazy(() => import("@/pages/common/BookingDetailPage.tsx"));
const PaymentDetailViewPage = lazy(() => import("@/pages/common/PaymentDetailViewPage.tsx"));
const TermsAndConditionsPage = lazy(() => import("@/pages/common/TermsAndConditionsPage.tsx"));
const SubscriptionDetailViewPage = lazy(() => import("@/pages/common/SubscriptionDetailViewPage.tsx"));

const UserServiceSelectPage = lazy(() => import("@/pages/user/UserServiceSelectPage.tsx"));
const UserBookingConfirmPage = lazy(() => import("@/pages/user/UserBookingConfirmPage.tsx"));
const UserListProvidersCardsPage = lazy(() => import("@/pages/user/UserListProvidersCardsPage.tsx"));
const UserServiceProviderDetailPage = lazy(() => import("@/pages/user/UserServiceProviderDetailPage.tsx"));

const ProviderDashboardPage = lazy(() => import("@/pages/provider/ProviderDashboardPage.tsx"));
const ProviderAddAddressPage = lazy(() => import("@/pages/boarding/ProviderCreateAddressPage.tsx"));
const ProviderSubscriptionPage = lazy(() => import("@/pages/provider/ProviderSubscriptionPage.tsx"));
const ProviderProofSubmitionPage = lazy(() => import("@/pages/boarding/ProviderProofSubmitionPage.tsx"));
const ProviderApprovalPendingPage = lazy(() => import("@/pages/boarding/ProviderApprovalPendingPage.tsx"));
const ProviderSubscriptionConfirmPage = lazy(() => import("@/pages/provider/ProviderSubscriptionConfirmPage.tsx"));
const ProviderCreateServiceDetailsPage = lazy(() => import("@/pages/boarding/ProviderCreateServiceDetailsPage.tsx"));
const ProviderCreateServiceAvailabilityPage = lazy(() => import("@/pages/boarding/ProviderCreateServiceAvailabilityPage.tsx"));

const AdminPlansPage = lazy(() => import("@/pages/admin/AdminPlansPage.tsx"));
const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsersPage.tsx"));
const AdminReportPage = lazy(() => import("@/pages/admin/AdminReportPage.tsx"));
const AdminServicesPage = lazy(() => import("@/pages/admin/AdminServicesPage.tsx"));
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboardPage.tsx"));
const AdminUserDetailPage = lazy(() => import("@/pages/admin/AdminUserDetailPage.tsx"));
const AdminGrafanaDashboard = lazy(() => import("@/pages/admin/AdminGrafanaDashboard.tsx"));
const AdminSubscriptionsPage = lazy(() => import("@/pages/admin/AdminSubscriptionsPage.tsx"));
const AdminServiceProvidersPage = lazy(() => import("@/pages/admin/AdminServiceProvidersPage.tsx"));
const AdminServiceProviderDetailPage = lazy(() => import("@/pages/admin/AdminServiceProviderDetailPage.tsx"));

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            { path: "/", element: <LandingPage /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
            { path: "/terms-and-conditions", element: <TermsAndConditionsPage /> },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <LoginForm /> },
            { path: "register", element: <SignUpForm /> },
            { path: "verify/email", element: <EmailVerificationForm /> },
            { path: "reset/password", element: <ResetPasswordForm /> },
            { path: "verify/otp", element: <OtpVerificatioForm /> },
        ]
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <RoleLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: "dashboard", element: <AdminDashboardPage /> },
            { path: "report", element: <AdminReportPage /> },
            { path: "service-providers", element: <AdminServiceProvidersPage /> },
            { path: "service-providers/:providerId", element: <AdminServiceProviderDetailPage /> },
            { path: "users", element: <AdminUsersPage /> },
            { path: "users/:userId", element: <AdminUserDetailPage /> },
            { path: "services", element: <AdminServicesPage /> },
            { path: "plans", element: <AdminPlansPage /> },
            { path: "subscriptions", element: <AdminSubscriptionsPage /> },
            { path: "subscriptions/:subscriptionId", element: <SubscriptionDetailViewPage /> },
            { path: "payments", element: <ListPaymentsPage /> },
            { path: "payments/:paymentId", element: <PaymentDetailViewPage /> },
            { path: "grafana-dashboard", element: <AdminGrafanaDashboard /> },
            { path: "*", element: <Error404Page /> },
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
                path: "/preboarding",
                children: [
                    { path: "role", element: <RoleSelectPage /> },
                    { path: "hear-about-us", element: <HearAboutUsPage /> },
                ]
            },
            {
                path: "/onboarding",
                children: [
                    { path: "address", element: <ProviderAddAddressPage /> },
                    { path: "service", element: <ProviderCreateServiceDetailsPage /> },
                    { path: "availability", element: <ProviderCreateServiceAvailabilityPage /> },
                    { path: "proofs", element: <ProviderProofSubmitionPage /> },
                    { path: "pending", element: <ProviderApprovalPendingPage /> },
                    { path: "*", element: <Error404Page /> },
                ]
            },
        ]
    },
    {
        path: "/user",
        element: (
            <ProtectedRoute allowedRoles={[Role.USER]}>
                <RoleLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                element: (
                    <OnBoardingGuard>
                        <Outlet />
                    </OnBoardingGuard>
                ),
                children: [
                    { index: true, element: <UserServiceSelectPage /> },
                    { path: "dashboard", element: <UserListProvidersCardsPage /> },
                    { path: "providerProfile/:providerId", element: <UserServiceProviderDetailPage /> },
                    { path: "profile", element: <AccountPage /> },
                    { path: "bookings", element: <ListBookingsPage /> },
                    { path: "bookings/:bookingId", element: <BookingDetailPage /> },
                    { path: "payments", element: <ListPaymentsPage /> },
                    { path: "payments/:paymentId", element: <PaymentDetailViewPage /> },
                    { path: "integrations", element: <IntegrationsPage /> },
                    { path: "chat", element: <ChatPage /> },
                    {
                        path: "video-call-lobby/:roomId",
                        element: <VideoCallLoby />
                    },
                    {
                        path: "video-call-room?status",
                        element: <VideoCallRoom />
                    },
                    { path: "calendar", element: <CalendarPage /> },
                    { path: "reviews", element: <ReviewsPage /> },
                    { path: "settings", element: <SettingsPage /> },
                    { path: "credits", element: <CreditAccountPage /> },
                    { path: "booking/confirm", element: <UserBookingConfirmPage /> },
                    { path: "*", element: <Error404Page /> },
                ],
            }
        ],
    },
    {
        path: "/provider",
        element: (
            <ProtectedRoute allowedRoles={[Role.PROVIDER]}>
                <RoleLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                element: (
                    <OnBoardingGuard>
                        <Outlet />
                    </OnBoardingGuard>
                ),
                children: [
                    { path: "dashboard", element: <ProviderDashboardPage /> },
                    { path: "profile", element: <AccountPage /> },
                    {
                        path: "reviews",
                        element: (
                            <PlanGuard routeName={RouteNames.REVIEWS}>
                                <ReviewsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "bookings",
                        element: (
                            <PlanGuard routeName={RouteNames.BOOKINGS}>
                                <ListBookingsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "bookings/:bookingId",
                        element: <BookingDetailPage />
                    },
                    {
                        path: "subscriptions",
                        element: (
                            <PlanGuard routeName={RouteNames.SUBSCRIPTIONS}>
                                <ProviderSubscriptionPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "subscriptions/:subscriptionId",
                        element: <SubscriptionDetailViewPage />
                    },
                    {
                        path: "payments",
                        element: (
                            <PlanGuard routeName={RouteNames.PAYMENTS}>
                                <ListPaymentsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "payments/:paymentId",
                        element: <PaymentDetailViewPage />
                    },
                    {
                        path: "integrations",
                        element: (
                            <PlanGuard routeName={RouteNames.INTEGRATIONS}>
                                <IntegrationsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "chat",
                        element: (
                            <PlanGuard routeName={RouteNames.CHAT}>
                                <ChatPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "video-call-lobby/:roomId",
                        element: <VideoCallLoby />
                    },
                    {
                        path: "video-call-room/:roomId",
                        element: <VideoCallRoom />
                    },
                    {
                        path: "calendar",
                        element: (
                            <PlanGuard routeName={RouteNames.CALENDAR}>
                                < CalendarPage />
                            </PlanGuard>
                        )
                    },
                    { 
                        path: "credits", 
                        element: (
                        <PlanGuard routeName={RouteNames.SETTINGS}>
                                <CreditAccountPage /> 
                            </PlanGuard>
                    )
                    },
                    {
                        path: "settings",
                        element: (
                            <PlanGuard routeName={RouteNames.SETTINGS}>
                                <SettingsPage />
                            </PlanGuard>
                        )
                    },
                    { path: "subscription/confirm", element: <ProviderSubscriptionConfirmPage /> },
                    { path: "*", element: <Error404Page /> },
                ],
            }
        ]
    },
    { path: "*", element: <Error404Page /> },
])
