import { lazy } from "react";
import PlanGuard from "./PlanGuard.tsx";
import { Role } from "@/shared/interface/enums.ts";
import { ProtectedRoute } from "./ProtectedRoutes.tsx";
import { RouteAccess } from "@/shared/utils/constants.ts";
import { createBrowserRouter, Outlet } from "react-router-dom";

const ChatPage = lazy(() => import("@/pages/common/ChatPage.tsx"));
const AuthPage = lazy(() => import("@/pages/common/AuthPage.tsx"));
const AboutPage = lazy(() => import("@/pages/common/AboutPage.tsx"));
const ContactPage = lazy(() => import("@/pages/common/ContactPage.tsx"));
const ReviewsPage = lazy(() => import("@/pages/common/ReviewsPage.tsx"));
const AccountPage = lazy(() => import("@/pages/common/AccountPage.tsx"));
const LandingPage = lazy(() => import("../pages/common/LandingPage.tsx"));
const SettingsPage = lazy(() => import("@/pages/common/SettingsPage.tsx"));
const Error404Page = lazy(() => import("@/pages/common/Error404Page.tsx"));
const CalendarPage = lazy(() => import("@/pages/common/CalendarPage.tsx"));
const VideoCallRoom = lazy(() => import("@/pages/common/VideoCallRoom.tsx"));
const VideoCallLoby = lazy(() => import("@/pages/common/VideoCallLobby.tsx"));
const LandingLayout = lazy(() => import("../pages/common/LandingLayout.tsx"));
const ListPaymentsPage = lazy(() => import("@/pages/common/ListPaymentsPage.tsx"));
const ListBookingsPage = lazy(() => import("@/pages/common/ListBookingsPage.tsx"));
const IntegrationsPage = lazy(() => import("@/pages/common/IntegrationsPage.tsx"));
const PrivacyPolicyPage = lazy(() => import("@/pages/common/PrivacyPolicyPage.tsx"));
const BookingDetailPage = lazy(() => import("@/pages/common/BookingDetailPage.tsx"));
const PaymentDetailViewPage = lazy(() => import("@/pages/common/PaymentDetailViewPage.tsx"));
const TermsAndConditionsPage = lazy(() => import("@/pages/common/TermsAndConditionsPage.tsx"));
const SubscriptionDetailViewPage = lazy(() => import("@/pages/common/SubscriptionDetailViewPage.tsx"));

const UserMainPage = lazy(() => import("@/pages/user/UserMainPage.tsx"));
const UserListProvidersCardsPage = lazy(() => import("@/pages/user/UserListProvidersCardsPage.tsx"));
const UserServiceSelectPage = lazy(() => import("@/pages/user/UserServiceSelectPage.tsx"));
const UserBookingConfirmPage = lazy(() => import("@/pages/user/UserBookingConfirmPage.tsx"));
const UserServiceProviderDetailPage = lazy(() => import("@/pages/user/UserServiceProviderDetailPage.tsx"));

const ProviderMainPage = lazy(() => import("@/pages/provider/ProviderMainPage.tsx"));
const ProviderDashboardPage = lazy(() => import("@/pages/provider/ProviderDashboardPage.tsx"));
const ProviderAddAddressPage = lazy(() => import("@/pages/provider/ProviderCreateAddressPage.tsx"));
const ProviderSubscriptionPage = lazy(() => import("@/pages/provider/ProviderSubscriptionPage.tsx"));
const ProviderProofSubmitionPage = lazy(() => import("@/pages/provider/ProviderProofSubmitionPage.tsx"));
const ProviderApprovalPendingPage = lazy(() => import("@/pages/provider/ProviderApprovalPendingPage.tsx"));
const ProviderSubscriptionConfirmPage = lazy(() => import("@/pages/provider/ProviderSubscriptionConfirmPage.tsx"));
const ProviderCreateServiceDetailsPage = lazy(() => import("@/pages/provider/ProviderCreateServiceDetailsPage.tsx"));
const ProviderCreateServiceAvailabilityPage = lazy(() => import("@/pages/provider/ProviderCreateServiceAvailabilityPage.tsx"));

const AdminReportPage = lazy(() => import("@/pages/admin/AdminReportPage"));
const AdminMainPage = lazy(() => import("../pages/admin/AdminMainPage.tsx"));
const AdminPlansPage = lazy(() => import("@/pages/admin/AdminPlansPage.tsx"));
const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsersPage.tsx"));
const AdminServicesPage = lazy(() => import("@/pages/admin/AdminServicesPage.tsx"));
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage.tsx"));
const AdminUserDetailPage = lazy(() => import("@/pages/admin/AdminUserDetailPage.tsx"));
const AdminGrafanaDashboard = lazy(() => import("@/pages/admin/AdminGrafanaDashboard.tsx"));
const AdminSubscriptionsPage = lazy(() => import("@/pages/admin/AdminSubscriptionsPage.tsx"));
const AdminServiceProvidersPage = lazy(() => import("../pages/admin/AdminServiceProvidersPage.tsx"));
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
            { path: "/login", element: <AuthPage formType={0} /> },
            { path: "/register", element: <AuthPage formType={1} /> },
            { path: "/verify/email", element: <AuthPage formType={2} /> },
            { path: "/reset/password", element: <AuthPage formType={3} /> },
            { path: "/verify/otp", element: <AuthPage formType={4} /> },
            { path: "*", element: <Error404Page /> },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                        <AdminMainPage />
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
                path: "/user",
                element: (
                    <ProtectedRoute allowedRoles={[Role.USER]}>
                        <UserMainPage />
                    </ProtectedRoute>
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
                    { path: "booking/confirm", element: <UserBookingConfirmPage /> },
                    { path: "*", element: <Error404Page /> },
                ],
            },
            {
                path: "/provider/onboarding",
                element: (
                    <ProtectedRoute allowedRoles={[Role.PROVIDER]}>
                        <Outlet />
                    </ProtectedRoute>
                ),
                children: [
                    { path: "address", element: <ProviderAddAddressPage /> },
                    { path: "service", element: <ProviderCreateServiceDetailsPage /> },
                    { path: "availability", element: <ProviderCreateServiceAvailabilityPage /> },
                    { path: "proofs", element: <ProviderProofSubmitionPage /> },
                    { path: "pending", element: <ProviderApprovalPendingPage /> },
                ]
            },
            {
                path: "/provider",
                element: (
                    <ProtectedRoute allowedRoles={[Role.PROVIDER]}>
                        <ProviderMainPage />
                    </ProtectedRoute>
                ),
                children: [
                    { path: "dashboard", element: <ProviderDashboardPage /> },
                    { path: "profile", element: <AccountPage /> },
                    {
                        path: "reviews",
                        element: (
                            <PlanGuard routeName={RouteAccess.REVIEWS}>
                                <ReviewsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "bookings",
                        element: (
                            <PlanGuard routeName={RouteAccess.BOOKINGS}>
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
                            <PlanGuard routeName={RouteAccess.SUBSCRIPTIONS}>
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
                            <PlanGuard routeName={RouteAccess.PAYMENTS}>
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
                            <PlanGuard routeName={RouteAccess.INTEGRATIONS}>
                                <IntegrationsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "chat",
                        element: (
                            <PlanGuard routeName={RouteAccess.CHAT}>
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
                            <PlanGuard routeName={RouteAccess.CALENDAR}>
                                < CalendarPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "settings",
                        element: (
                            <PlanGuard routeName={RouteAccess.SETTINGS}>
                                <SettingsPage />
                            </PlanGuard>
                        )
                    },
                    { path: "subscription/confirm", element: <ProviderSubscriptionConfirmPage /> },
                    { path: "*", element: <Error404Page /> },
                ],
            },
        ],
    },
])
