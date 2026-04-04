// import { lazy } from "react";
// import { Role } from "@/utils/interface/enums.ts";
// import { createBrowserRouter, Outlet } from "react-router-dom";
// import { RoleLayout } from "./RoleLayout.tsx";
// import { ProtectedRoute } from "./ProtectedRoute.tsx";

// const AuthPage = lazy(() => import("@/pages/common/AuthPage.tsx"));
// const AboutPage = lazy(() => import("@/pages/common/AboutPage.tsx"));
// const ContactPage = lazy(() => import("@/pages/common/ContactPage.tsx"));
// const AccountPage = lazy(() => import("@/pages/common/AccountPage.tsx"));
// const LandingPage = lazy(() => import("../pages/common/LandingPage.tsx"));
// const SettingsPage = lazy(() => import("@/pages/common/SettingsPage.tsx"));
// const Error404Page = lazy(() => import("@/pages/common/Error404Page.tsx"));
// const CalendarPage = lazy(() => import("@/pages/common/CalendarPage.tsx"));
// const VideoCallRoom = lazy(() => import("@/pages/common/VideoCallRoom.tsx"));
// const VideoCallLoby = lazy(() => import("@/pages/common/VideoCallLobby.tsx"));
// const LandingLayout = lazy(() => import("../pages/common/LandingLayout.tsx"));
// const ListBookingsPage = lazy(() => import("@/pages/common/ListBookingsPage.tsx"));
// const IntegrationsPage = lazy(() => import("@/pages/common/IntegrationsPage.tsx"));
// const StripeConfirmPage = lazy(() => import("@/pages/common/StripeConfirmPage.tsx"));
// const PrivacyPolicyPage = lazy(() => import("@/pages/common/PrivacyPolicyPage.tsx"));
// const BookingDetailPage = lazy(() => import("@/pages/common/BookingDetailPage.tsx"));
// const PaymentDetailViewPage = lazy(() => import("@/pages/common/PaymentDetailViewPage.tsx"));
// const TermsAndConditionsPage = lazy(() => import("@/pages/common/TermsAndConditionsPage.tsx"));
// const SubscriptionDetailViewPage = lazy(() => import("@/pages/common/SubscriptionDetailViewPage.tsx"));

// const UserMainPage = lazy(() => import("@/pages/user/UserMainPage.tsx"));
// const UserChatPage = lazy(() => import("@/pages/user/UserChatPage.tsx"));
// const UserReviewPage = lazy(() => import("@/pages/user/UserReviewPage"));
// const UserPaymentsPage = lazy(() => import("@/pages/user/UserPaymentsPage.tsx"));
// const UserDashboardPage = lazy(() => import("@/pages/user/UserDashboardPage.tsx"));
// const UserServiceSelectPage = lazy(() => import("@/pages/user/UserServiceSelectPage.tsx"));
// const UserBookingConfirmPage = lazy(() => import("@/pages/user/UserBookingConfirmPage.tsx"));
// const UserServiceProviderDetailPage = lazy(() => import("@/pages/user/UserServiceProviderDetailPage.tsx"));

// const ProviderChatPage = lazy(() => import("@/pages/provider/ProviderChatPage.tsx"));
// const ProviderReviewPage = lazy(() => import("@/pages/provider/ProviderReviewPage"));
// const ProviderMainPage = lazy(() => import("@/pages/provider/ProviderMainPage.tsx"));
// const ProviderPaymentsPage = lazy(() => import("@/pages/provider/ProviderPaymentsPage.tsx"));
// const ProviderDashboardPage = lazy(() => import("@/pages/provider/ProviderDashboardPage.tsx"));
// const ProviderAddAddressPage = lazy(() => import("@/pages/provider/ProviderCreateAddressPage.tsx"));
// const ProviderSubscriptionPage = lazy(() => import("@/pages/provider/ProviderSubscriptionPage.tsx"));
// const ProviderProofSubmitionPage = lazy(() => import("@/pages/provider/ProviderProofSubmitionPage.tsx"));
// const ProviderApprovalPendingPage = lazy(() => import("@/pages/provider/ProviderApprovalPendingPage.tsx"));
// const ProviderSubscriptionConfirmPage = lazy(() => import("@/pages/provider/ProviderSubscriptionConfirmPage.tsx"));
// const ProviderCreateServiceDetailsPage = lazy(() => import("@/pages/provider/ProviderCreateServiceDetailsPage.tsx"));
// const ProviderCreateServiceAvailabilityPage = lazy(() => import("@/pages/provider/ProviderCreateServiceAvailabilityPage.tsx"));

// const AdminReportPage = lazy(() => import("@/pages/admin/AdminReportPage"));
// const AdminMainPage = lazy(() => import("../pages/admin/AdminMainPage.tsx"));
// const AdminPlansPage = lazy(() => import("@/pages/admin/AdminPlansPage.tsx"));
// const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsersPage.tsx"));
// const AdminPaymentsPage = lazy(() => import("@/pages/admin/AdminPaymentsPage.tsx"));
// const AdminServicesPage = lazy(() => import("@/pages/admin/AdminServicesPage.tsx"));
// const AdminOverviewPage = lazy(() => import("../pages/admin/AdminDashboardPage.tsx"));
// const AdminUserDetailPage = lazy(() => import("@/pages/admin/AdminUserDetailPage.tsx"));
// const AdminApiStrengthPage = lazy(() => import("@/pages/admin/AdminApiStrengthPage.tsx"));
// const AdminSubscriptionsPage = lazy(() => import("@/pages/admin/AdminSubscriptionsPage.tsx"));
// const AdminServiceProvidersPage = lazy(() => import("../pages/admin/AdminServiceProvidersPage.tsx"));
// const AdminServiceProviderDetailPage = lazy(() => import("@/pages/admin/AdminServiceProviderDetailPage.tsx"));

// export const appRouter = createBrowserRouter([
//     {
//         path: "/",
//         element: <LandingLayout />,
//         children: [
//             { path: "/", element: <LandingPage /> },
//             { path: "/about", element: <AboutPage /> },
//             { path: "/contact", element: <ContactPage /> },
//             { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
//             { path: "/terms-and-conditions", element: <TermsAndConditionsPage /> },
//             { path: "/admin/login", element: <AuthPage role={Role.ADMIN} formType={0} /> },
//             { path: "/user/login", element: <AuthPage role={Role.USER} formType={0} /> },
//             { path: "/provider/login", element: <AuthPage role={Role.PROVIDER} formType={0} /> },
//             { path: "/user/register", element: <AuthPage role={Role.USER} formType={1} /> },
//             { path: "/provider/register", element: <AuthPage role={Role.PROVIDER} formType={1} /> },
//             { path: "/user/verify/email", element: <AuthPage role={Role.USER} formType={2} /> },
//             { path: "/provider/verify/email", element: <AuthPage role={Role.PROVIDER} formType={2} /> },
//             { path: "/user/reset/password", element: <AuthPage role={Role.USER} formType={3} /> },
//             { path: "/provider/reset/password", element: <AuthPage role={Role.PROVIDER} formType={3} /> },
//             { path: "/user/verify/otp", element: <AuthPage role={Role.USER} formType={4} /> },
//             { path: "/provider/verify/otp", element: <AuthPage role={Role.PROVIDER} formType={4} /> },
//             { path: "*", element: <Error404Page /> },
//             {
//                 element: (
//                     <ProtectedRoute>
//                         <RoleLayout />
//                     </ProtectedRoute>
//                 ),
//                 children: [
//                     { path: "profile", element: <AccountPage /> },
//                     { path: "settings", element: <SettingsPage /> },
//                     { path: "calendar", element: <CalendarPage /> },
//                     { path: "payments/:paymentId", element: <PaymentDetailViewPage /> },
//                     { path: "bookings", element: <ListBookingsPage /> },
//                     { path: "bookings/:bookingId", element: <BookingDetailPage /> },
//                     { path: "integrations", element: <IntegrationsPage /> },
//                     { path: "subscription/confirm", element: <SubscriptionDetailViewPage /> },
//                     { path: "video-call/:roomId", element: <VideoCallRoom /> },
//                     { path: "video-call/lobby/:roomId", element: <VideoCallLoby /> },
//                 ]
//             }
//         ]
//     }])