import { lazy } from "react";
import PlanGuard from "./planGuard.tsx";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes.tsx";
import SettingsPage from "@/pages/common/SettingsPage.tsx";
import { Role } from "@/utils/interface/commonInterface.ts";
import IntegrationsPage from "@/pages/common/IntegrationsPage.tsx";
import StripeConfirmPage from "@/pages/common/StripeConfirmPage.tsx";

const AuthPage = lazy(() => import("@/pages/common/AuthPage.tsx"));
const AboutPage = lazy(() => import("@/pages/common/AboutPage.tsx"));
const ContactPage = lazy(() => import("@/pages/common/ContactPage.tsx"));
const LandingPage = lazy(() => import("../pages/common/LandingPage.tsx"));
const Error404Page = lazy(() => import("@/pages/common/Error404Page.tsx"));
const AccountPage = lazy(() => import("@/pages/common/AccountPage.tsx"));
const CalendarPage = lazy(() => import("@/pages/common/CalendarPage.tsx"));
const VideoCallLoby = lazy(() => import("@/pages/common/VideoCallLoby.tsx"));
const VideoCallRoom = lazy(() => import("@/pages/common/VideoCallRoom.tsx"));
const VideoCallPage = lazy(() => import("@/pages/common/VideoCallPage.tsx"));
const LandingLayout = lazy(() => import("../pages/common/LandingLayout.tsx"));
const PrivacyPolicyPage = lazy(() => import("@/pages/common/PrivacyPolicyPage.tsx"));
const PaymentConfirmPage = lazy(() => import("@/pages/common/PaymentConfirmPage.tsx"));
const TermsAndConditionsPage = lazy(() => import("@/pages/common/TermsAndConditionsPage.tsx"));

const UserMainPage = lazy(() => import("@/pages/user/UserMainPage.tsx"));
const UserChatPage = lazy(() => import("@/pages/user/UserChatPage.tsx"));
const UserReviewPage = lazy(() => import("@/pages/user/UserReviewPage"));
const UserPaymentsPage = lazy(() => import("@/pages/user/UserPaymentsPage.tsx"));
const UserBookingsPage = lazy(() => import("@/pages/user/UserBookingsPage.tsx"));
const UserDashboardPage = lazy(() => import("@/pages/user/UserDashboardPage.tsx"));
const UserNotificationsPage = lazy(() => import("@/pages/user/UserNotificationsPage.tsx"));
const UserServiceSelectPage = lazy(() => import("@/pages/user/UserServiceSelectPage.tsx"));
const UserBookingDetailsPage = lazy(() => import("@/pages/user/UserBookingDetailsPage.tsx"))
const UserServiceProviderDetailPage = lazy(() => import("@/pages/user/UserServiceProviderDetailPage.tsx"));

const ProviderMainPage = lazy(() => import("@/pages/provider/ProviderMainPage.tsx"));
const ProviderChatPage = lazy(() => import("@/pages/provider/ProviderChatPage.tsx"));
const ProviderReviewPage = lazy(() => import("@/pages/provider/ProviderReviewPage"));
const ProviderPaymentsPage = lazy(() => import("@/pages/provider/ProviderPaymentsPage.tsx"));
const ProviderDashboardPage = lazy(() => import("@/pages/provider/ProviderDashboardPage.tsx"));
const ProviderAppointmentsPage = lazy(() => import("@/pages/provider/ProviderAppointmentsPage.tsx"));
const ProviderSubscriptionPage = lazy(() => import("@/pages/provider/ProviderSubscriptionPage.tsx"));
const ProviderNotificationsPage = lazy(() => import("@/pages/provider/ProviderNotificationsPage.tsx"));
const ProviderBookingDetailsPage = lazy(() => import("@/pages/provider/ProviderBookingDetailsPage.tsx"))
const ProviderSubscriptionDetailViewPage = lazy(() => import("@/pages/provider/ProviderSubscriptionDetailViewPage.tsx"));

const AdminReportPage = lazy(() => import("@/pages/admin/AdminReportPage"));
const AdminMainPage = lazy(() => import("../pages/admin/AdminMainPage.tsx"));
const AdminPlansPage = lazy(() => import("@/pages/admin/AdminPlansPage.tsx"));
const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsersPage.tsx"));
const AdminPaymentsPage = lazy(() => import("@/pages/admin/AdminPaymentsPage.tsx"));
const AdminServicesPage = lazy(() => import("@/pages/admin/AdminServicesPage.tsx"));
const AdminOverviewPage = lazy(() => import("../pages/admin/AdminOverviewPage.tsx"));
const AdminUserDetailPage = lazy(() => import("@/pages/admin/AdminUserDetailPage.tsx"));
const AdminApiStrengthPage = lazy(() => import("@/pages/admin/AdminApiStrengthPage.tsx"));
const AdminSubscriptionsPage = lazy(() => import("@/pages/admin/AdminSubscriptionsPage.tsx"));
const AdminServiceProvidersPage = lazy(() => import("../pages/admin/AdminServiceProvidersPage.tsx"));
const AdminServiceProviderDetailPage = lazy(() => import("@/pages/admin/AdminServiceProviderDetailPage.tsx"));
const AdminSubcriptionDetailedViewPage = lazy(() => import("@/pages/admin/AdminSubcriptionDetailedViewPage.tsx"));

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
            { path: "/admin/login", element: <AuthPage role={Role.admin} formType={0} /> },
            { path: "/user/login", element: <AuthPage role={Role.user} formType={0} /> },
            { path: "/user/register", element: <AuthPage role={Role.user} formType={1} /> },
            { path: "/user/verify/email", element: <AuthPage role={Role.user} formType={2} /> },
            { path: "/user/reset/password", element: <AuthPage role={Role.user} formType={3} /> },
            { path: "/user/verify/otp", element: <AuthPage role={Role.user} formType={4} /> },
            { path: "/provider/login", element: <AuthPage role={Role.provider} formType={0} /> },
            { path: "/provider/register", element: <AuthPage role={Role.provider} formType={1} /> },
            { path: "/provider/verify/email", element: <AuthPage role={Role.provider} formType={2} /> },
            { path: "/provider/reset/password", element: <AuthPage role={Role.provider} formType={3} /> },
            { path: "/provider/verify/otp", element: <AuthPage role={Role.provider} formType={4} /> },
            { path: "*", element: <Error404Page /> },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AdminMainPage />
                    </ProtectedRoute>
                ),
                children: [
                    { path: "overview", element: <AdminOverviewPage /> },
                    { path: "report", element: <AdminReportPage /> },
                    { path: "service-providers", element: <AdminServiceProvidersPage /> },
                    { path: "service-providers/:providerId", element: <AdminServiceProviderDetailPage /> },
                    { path: "users", element: <AdminUsersPage /> },
                    { path: "users/:userId", element: <AdminUserDetailPage /> },
                    { path: "services", element: <AdminServicesPage /> },
                    { path: "plans", element: <AdminPlansPage /> },
                    { path: "subscriptions", element: <AdminSubscriptionsPage /> },
                    { path: "payments", element: <AdminPaymentsPage /> },
                    { path: "subscription/:subscriptionId", element: <AdminSubcriptionDetailedViewPage /> },
                    { path: "api-strength", element: <AdminApiStrengthPage /> },
                    { path: "*", element: <Error404Page /> },
                ],
            },
            {
                path: "/user",
                element: (
                    <ProtectedRoute allowedRoles={["USER"]}>
                        <UserMainPage />
                    </ProtectedRoute>
                ),
                children: [
                    { index: true, element: <UserServiceSelectPage /> },
                    { path: "dashboard", element: <UserDashboardPage /> },
                    { path: "providerProfile/:providerId", element: <UserServiceProviderDetailPage /> },
                    { path: "profile", element: <AccountPage /> },
                    { path: "bookings", element: <UserBookingsPage /> },
                    { path: "bookings/:bookingId", element: <UserBookingDetailsPage /> },
                    { path: "payments", element: <UserPaymentsPage /> },
                    { path: "integrations", element: <IntegrationsPage /> },
                    { path: "chat", element: <UserChatPage /> },
                    { path: "video-call", element: <VideoCallPage /> },
                    {
                        path: "video-call-lobby/:roomId",
                        element: <VideoCallLoby />
                    },
                    {
                        path: "video-call-room/:roomId",
                        element: <VideoCallRoom />
                    },
                    { path: "calendar", element: <CalendarPage /> },
                    { path: "reviews", element: <UserReviewPage /> },
                    { path: "notifications", element: <UserNotificationsPage /> },
                    { path: "settings", element: <SettingsPage /> },
                    { path: "payment-success", element: <PaymentConfirmPage status={true} userType={"user"} /> },
                    { path: "payment-failed", element: <PaymentConfirmPage status={false} userType={"user"} /> },
                    { path: "*", element: <Error404Page /> },
                ],
            },
            {
                path: "/provider",
                element: (
                    <ProtectedRoute allowedRoles={["PROVIDER"]}>
                        <ProviderMainPage />
                    </ProtectedRoute>
                ),
                children: [
                    { path: "dashboard", element: <ProviderDashboardPage /> },
                    { path: "profile", element: <AccountPage /> },
                    {
                        path: "reviews",
                        element: (
                            <PlanGuard routeName="Reviews">
                                <ProviderReviewPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "appointments",
                        element: (
                            <PlanGuard routeName="Appointments">
                                <ProviderAppointmentsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "appointments/:bookingId",
                        element: (
                            <PlanGuard routeName="Appointments">
                                <ProviderBookingDetailsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "subscriptions",
                        element: (
                            <PlanGuard routeName="Subscriptions">
                                <ProviderSubscriptionPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "subscription/:subscriptionId",
                        element: <ProviderSubscriptionDetailViewPage />
                    },
                    {
                        path: "payments",
                        element: (
                            <PlanGuard routeName="Payments">
                                <ProviderPaymentsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "integrations",
                        element: (
                            <PlanGuard routeName="Integrations">
                                <IntegrationsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "chat",
                        element: (
                            <PlanGuard routeName="Chat">
                                <ProviderChatPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "video-call",
                        element: (
                            <PlanGuard routeName="Video call">
                                <VideoCallPage />
                            </PlanGuard>
                        ),
                    },
                    {
                        path: "video-call-lobby/:roomId",
                        element: (
                            <PlanGuard routeName="Video call">
                                <VideoCallLoby />
                            </PlanGuard>
                        ),
                    },
                    {
                        path: "video-call-room/:roomId",
                        element: (
                            <PlanGuard routeName="Video call">
                                <VideoCallRoom />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "calendar",
                        element: (
                            <PlanGuard routeName="Calendar">
                                < CalendarPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "notifications",
                        element: (
                            <PlanGuard routeName="Notifications">
                                <ProviderNotificationsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "settings",
                        element: (
                            <PlanGuard routeName="Settings">
                                <SettingsPage />
                            </PlanGuard>
                        )
                    },
                    { path: "payment-success", element: <PaymentConfirmPage status={true} userType={"provider"} /> },
                    { path: "payment-failed", element: <PaymentConfirmPage status={false} userType={"provider"} /> },
                    { path: "stripe/success", element: <StripeConfirmPage status={true} /> },
                    { path: "stripe/refresh", element: <StripeConfirmPage status={false} /> },
                    { path: "*", element: <Error404Page /> },
                ],
            },
        ],
    },
])
