import { lazy } from 'react';
import PlanGuard from './PlanGuard.tsx';
import RoleLayout from './RoleLayout.tsx';
import { Role } from '@/shared/types/enums.ts';
import OnBoardingGuard from './OnBoardingGuard.tsx';
import { ProtectedRoute } from './ProtectedRoutes.tsx';
import BoardingLayoutWrapper from './BoardingLayoutWrapper.tsx';
import { RouteNames } from '@/shared/utils/constants/routeConstants.ts';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import AuthCallbackPage from '@/components/form/Common/AuthCallbackPage.tsx';
import IntegrationsCallbackPage from '@/pages/dashboard/IntegrationsCallbackPage.tsx';
import AdminDashboard from '@/components/dashboard/admin/AdminDashboard.tsx';
import AdminRevenueReport from '@/components/admin/AdminRevenueReport.tsx';
import ProviderDashboard from '@/components/dashboard/provider/ProviderDashboard.tsx';
import ProviderListSubscriptions from '@/containers/provider/ProviderListSubscriptions.tsx';

const AdminPlanDetailsPage = lazy(() => import('@/containers/admin/AdminPlanDetails.tsx'));

const FAQPage = lazy(() => import('@/pages/landing/FAQPage.tsx'));
const AuthLayout = lazy(() => import('@/layouts/AuthLayout.tsx'));
const BlogPage = lazy(() => import('@/pages/landing/BlogPage.tsx'));
const HelpPage = lazy(() => import('@/pages/landing/HelpPage.tsx'));
const ChatPage = lazy(() => import('@/containers/dashboard/ChatWindow.tsx'));
const AboutPage = lazy(() => import('@/pages/landing/AboutPage.tsx'));
const LandingLayout = lazy(() => import('@/layouts/LandingLayout.tsx'));
const CreditPage = lazy(() => import('@/containers/dashboard/CreditDashboard.tsx'));
const PricingPage = lazy(() => import('@/pages/landing/PricingPage.tsx'));
const ContactPage = lazy(() => import('@/pages/landing/ContactPage.tsx'));
const LandingPage = lazy(() => import('@/pages/landing/LandingPage.tsx'));
const Error404Page = lazy(() => import('@/pages/fallbacks/Error404Page.tsx'));
const ReviewsPage = lazy(() => import('@/containers/dashboard/ListReviews.tsx'));
const SettingsPage = lazy(() => import('@/pages/dashboard/SettingsPage.tsx'));
const CalendarPage = lazy(() => import('@/containers/dashboard/CalendarView.tsx'));
const ReferralPage = lazy(() => import('@/containers/dashboard/ReferralDashboard.tsx'));
const AdminPlansPage = lazy(() => import('@/containers/admin/AdminListPlans.tsx'));
const AdminUsersPage = lazy(() => import('@/containers/admin/AdminListUsers.tsx'));
const LoginForm = lazy(() => import('@/components/form/Common/LoginForm.tsx'));
const VideoCallRoom = lazy(() => import('@/containers/dashboard/VideoCallRoom.tsx'));
const RoleSelectPage = lazy(() => import('@/pages/boarding/RoleSelectPage.tsx'));
const SignUpForm = lazy(() => import('@/components/form/Common/SignUpForm.tsx'));
const VideoCallLoby = lazy(() => import('@/containers/dashboard/VideoCallLobby.tsx'));
const BlogDetailsPage = lazy(() => import('@/pages/landing/BlogDetailsPage.tsx'));
const HearAboutUsPage = lazy(() => import('@/pages/boarding/HearAboutUsPage.tsx'));
const LegalHomePage = lazy(() => import('@/pages/landing/legal/LegalHomePage.tsx'));
const AdminServicesPage = lazy(() => import('@/containers/admin/AdminListServices.tsx'));
const ListPaymentsPage = lazy(() => import('@/containers/dashboard/ListPayments.tsx'));
const ListBookingsPage = lazy(() => import('@/containers/dashboard/ListBookings.tsx'));
const SubScribePlanPage = lazy(() => import('@/containers/provider/ProviderUpgradePlan.tsx'));
const BookingDetailPage = lazy(() => import('@/containers/dashboard/BookingDetails.tsx'));
const AccountSettings = lazy(() => import('@/pages/dashboard/AccountSettingsPage.tsx'));
const AdminUserDetailPage = lazy(() => import('@/containers/admin/AdminUserDetails.tsx'));
const SecuritySettings = lazy(() => import('@/components/settings/SecuritySettingsPage.tsx'));
const ProviderAccountPage = lazy(() => import('@/containers/provider/ProviderProfileWrapper.tsx'));
const UserServiceSelectPage = lazy(() => import('@/pages/user/UserServiceSelectPage.tsx'));
const PrivacyPolicyPage = lazy(() => import('@/pages/landing/legal/PrivacyPolicyPage.tsx'));
const AdminGrafanaDashboard = lazy(() => import('@/containers/admin/AdminGrafana.tsx'));
const UserBookingCallbackPage = lazy(() => import('@/pages/user/UserBookingCallbackPage.tsx'));
const TermsOfServicePage = lazy(() => import('@/pages/landing/legal/TermsOfServicePage.tsx'));
const AdminSubscriptionsPage = lazy(() => import('@/containers/admin/AdminListSubscriptions.tsx'));
const ResetPasswordForm = lazy(() => import('@/components/form/Common/ResetPasswordForm.tsx'));
const IntegrationsSettings = lazy(() => import('@/pages/dashboard/IntegrationsSettingsPage.tsx'));
const PaymentDetailViewPage = lazy(() => import('@/containers/dashboard/PaymentDetails.tsx'));
const NotificationSettings = lazy(() => import('@/pages/dashboard/NotificationSettingsPage.tsx'));
const ProviderAddAddressPage = lazy(() => import('@/pages/boarding/ProviderCreateAddressPage.tsx'));
const AdminServiceProvidersPage = lazy(() => import('@/containers/admin/AdminListProviders.tsx'));
const UserListProvidersCardsPage = lazy(
  () => import('@/pages/user/UserListProvidersCardsPage.tsx'),
);

const OtpVerificatioForm = lazy(() => import('@/components/form/Common/OtpVerificatioForm.tsx'));
const ProviderProofSubmitionPage = lazy(
  () => import('@/pages/boarding/ProviderProofSubmitionPage.tsx'),
);
const SubscriptionDetailViewPage = lazy(
  () => import('@/containers/dashboard/SubscriptionDetails.tsx'),
);
const UserServiceProviderDetailPage = lazy(
  () => import('@/pages/user/UserServiceProviderDetailPage.tsx'),
);
const ProviderApprovalPendingPage = lazy(
  () => import('@/pages/boarding/ProviderApprovalPendingPage.tsx'),
);
const EmailVerificationForm = lazy(
  () => import('@/components/form/Common/EmailVerificationForm.tsx'),
);
const AdminServiceProviderDetailPage = lazy(
  () => import('@/containers/admin/AdminProviderDetails.tsx'),
);
const ProviderSubscriptionCallbackPage = lazy(
  () => import('@/pages/dashboard/ProviderSubscriptionCallbackPage.tsx'),
);
const ProviderCreateServiceDetailsPage = lazy(
  () => import('@/pages/boarding/ProviderCreateServiceDetailsPage.tsx'),
);
const ProviderCreateServiceAvailabilityPage = lazy(
  () => import('@/pages/boarding/ProviderCreateServiceAvailabilityPage.tsx'),
);

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
    path: '/auth',
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
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={[Role.ADMIN]}>
        <RoleLayout />
      </ProtectedRoute>
    ),
    children: [
      { // Done
        path: 'dashboard',
        element: <AdminDashboard />,
        handle: {
          title: 'Overview',
        },
      },
      { // Done
        path: 'report',
        element: <AdminRevenueReport />,
        handle: {
          title: 'Reports',
        },
      },
      { // Done
        path: 'service-providers', 
        element: <AdminServiceProvidersPage />,
        handle: {
          title: 'Service Providers',
        },
      },
      { // Done
        path: 'service-providers/:providerId',
        element: <AdminServiceProviderDetailPage />,
        handle: {
          title: 'Service Provider Details',
        },
      },
      { // Done
        path: 'users',
        element: <AdminUsersPage />,
        handle: {
          title: 'Users',
        },
      },
      { // Done
        path: 'users/:userId',
        element: <AdminUserDetailPage />,
        handle: {
          title: 'User Details',
        },
      },
      { // Done
        path: 'services',
        element: <AdminServicesPage />,
        handle: {
          title: 'Services',
        },
      },
      { // Done
        path: 'plans',
        element: <AdminPlansPage />,
        handle: {
          title: 'Plans',
        },
      },
      { // Done
        path: 'plans/:planId',
        element: <AdminPlanDetailsPage />,
        handle: {
          title: 'Plan Details',
        },
      },
      { // Done
        path: 'subscriptions',
        element: <AdminSubscriptionsPage />,
        handle: {
          title: 'Subscriptions',
        },
      },
      { // Done
        path: 'subscriptions/:subscriptionId',
        element: <SubscriptionDetailViewPage />,
        handle: {
          title: 'Subscription Details',
        },
      },
      { // Done
        path: 'payments',
        element: <ListPaymentsPage />,
        handle: {
          title: 'Payments',
        },
      },
      { // Done
        path: 'payments/:paymentId',
        element: <PaymentDetailViewPage />,
        handle: {
          title: 'Payment Details',
        },
      },
      { // Done
        path: 'grafana-dashboard',
        element: <AdminGrafanaDashboard />,
        handle: {
          title: 'Grafana Dashboard',
        },
      },
      {
        path: '*',
        element: <Error404Page />,
        handle: {
          title: 'Page Not Found',
        },
      },
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
          { path: 'address', element: <ProviderAddAddressPage /> },
          { path: 'service', element: <ProviderCreateServiceDetailsPage /> },
          { path: 'availability', element: <ProviderCreateServiceAvailabilityPage /> },
          { path: 'proofs', element: <ProviderProofSubmitionPage /> },
          { path: 'pending', element: <ProviderApprovalPendingPage /> },
          { path: '*', element: <Error404Page /> },
        ],
      },
    ],
  },
  {
    path: '/user',
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
          { // Done using services
            index: true,
            element: <UserServiceSelectPage />,
            handle: {
              title: 'Service Categories',
            },
          },
          { // Done
            path: 'services', // moving to service-providers route
            element: <UserListProvidersCardsPage />,
            handle: {
              title: 'Services',
            },
          },
          { // Done
            path: 'providerProfile/:providerId',
            element: <UserServiceProviderDetailPage />,
            handle: {
              title: 'Service Provider Details',
            },
          },
          { // Done
            path: 'bookings',
            element: <ListBookingsPage />,
            handle: {
              title: 'Bookings',
            },
          },
          { // Done
            path: 'bookings/:bookingId',
            element: <BookingDetailPage />,
            handle: {
              title: 'Booking Details',
            },
          },
          { // Done
            path: 'payments',
            element: <ListPaymentsPage />,
            handle: {
              title: 'Payments',
            },
          },
          { // Done
            path: 'payments/:paymentId',
            element: <PaymentDetailViewPage />,
            handle: {
              title: 'Payment Details',
            },
          },
          { // Done
            path: 'chat',
            element: <ChatPage />,
            handle: {
              title: 'Chat',
            },
          },
          { // Done
            path: 'video-call-lobby/:roomId',
            element: <VideoCallLoby />,
            handle: {
              title: 'Video Call Lobby',
            },
          },
          { // Done
            path: 'video-call-room?status',
            element: <VideoCallRoom />,
            handle: {
              title: 'Video Call',
            },
          },
          { // Done
            path: 'calendar',
            element: <CalendarPage />,
            handle: {
              title: 'Calendar',
            },
          },
          { // Done
            path: 'reviews',
            element: <ReviewsPage />,
            handle: {
              title: 'Reviews',
            },
          },
          {
            path: 'settings',
            element: <SettingsPage />,
            handle: {
              title: 'Settings',
            },
            children: [
              {
                index: true,
                element: <Navigate to="notifications" replace />,
                handle: {
                  title: 'Notifications',
                },
              },
              {
                path: 'notifications',
                element: <NotificationSettings />,
                handle: {
                  title: 'Notifications',
                },
              },
              {
                path: 'account',
                element: <AccountSettings />,
                handle: {
                  title: 'Account Settings',
                },
              },
              {
                path: 'integrations',
                element: <IntegrationsSettings />,
                handle: {
                  title: 'Integrations',
                },
              },
              {
                path: 'integrations/callback',
                element: <IntegrationsCallbackPage />,
                handle: {
                  title: 'Checking status',
                },
              },
              {
                path: 'security',
                element: <SecuritySettings />,
                handle: {
                  title: 'Security',
                },
              },
            ],
          },
          { // Done
            path: 'credits',
            element: <CreditPage />,
            handle: {
              title: 'Credits',
            },
          },
          { // Done
            path: 'referrals',
            element: <ReferralPage />,
            handle: {
              title: 'Referrals',
            },
          },
          { // Done
            path: 'booking/confirm',
            element: <UserBookingCallbackPage />,
            handle: {
              title: 'Confirm Booking',
            },
          },
          {
            path: '*',
            element: <Error404Page />,
            handle: {
              title: 'Page Not Found',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/provider',
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
          { // Done
            path: 'dashboard',
            element: <ProviderDashboard />,
            handle: {
              title: 'Dashboard',
            },
          },
          { // Done
            path: 'profile',
            element: <ProviderAccountPage />,
            handle: {
              title: 'Profile',
            },
          },
          { // Done
            path: 'reviews',
            element: (
              <PlanGuard routeName={RouteNames.REVIEWS}>
                <ReviewsPage />
              </PlanGuard>
            ),
            handle: {
              title: 'Reviews',
            },
          },
          { // Done
            path: 'bookings',
            element: (
              <PlanGuard routeName={RouteNames.BOOKINGS}>
                <ListBookingsPage />
              </PlanGuard>
            ),
            handle: {
              title: 'Bookings',
            },
          },
          { // Done
            path: 'bookings/:bookingId',
            element: <BookingDetailPage />,
            handle: {
              title: 'Booking Details',
            },
          },
          { // Done
            path: 'subscriptions',
            element: (
              <PlanGuard routeName={RouteNames.SUBSCRIPTIONS}>
                <ProviderListSubscriptions />
              </PlanGuard>
            ),
            handle: {
              title: 'Subscriptions',
            },
          },
          { // Done 
            path: 'subscriptions/:subscriptionId',
            element: <SubscriptionDetailViewPage />,
            handle: {
              title: 'Subscription Details',
            },
          },
          { // Done
            path: 'payments',
            element: (
              <PlanGuard routeName={RouteNames.PAYMENTS}>
                <ListPaymentsPage />
              </PlanGuard>
            ),
            handle: {
              title: 'Payments',
            },
          },
          { // Done
            path: 'payments/:paymentId',
            element: <PaymentDetailViewPage />,
            handle: {
              title: 'Payment Details',
            },
          },
          { // Done
            path: 'chat',
            element: (
              <PlanGuard routeName={RouteNames.CHAT}>
                <ChatPage />
              </PlanGuard>
            ),
            handle: {
              title: 'Chat',
            },
          },
          { // Done
            path: 'video-call-lobby/:roomId',
            element: <VideoCallLoby />,
            handle: {
              title: 'Video Call Lobby',
            },
          },
          { // Done
            path: 'video-call-room/:roomId',
            element: <VideoCallRoom />,
            handle: {
              title: 'Video Call',
            },
          },
          { // Done
            path: 'calendar',
            element: (
              <PlanGuard routeName={RouteNames.CALENDAR}>
                <CalendarPage />
              </PlanGuard>
            ),
            handle: {
              title: 'Calendar',
            },
          },
          { // Done
            path: 'credits',
            element: (
              <PlanGuard routeName={RouteNames.CREDITS}>
                <CreditPage />
              </PlanGuard>
            ),
            handle: {
              title: 'Credits',
            },
          },
          { // Done
            path: 'referrals',
            element: (
              <PlanGuard routeName={RouteNames.REFERRALS}>
                <ReferralPage />
              </PlanGuard>
            ),
            handle: {
              title: 'Referrals',
            },
          },
          { // Done
            path: 'settings',
            element: (
              <PlanGuard routeName={RouteNames.SETTINGS}>
                <SettingsPage />
              </PlanGuard>
            ),
            handle: {
              title: 'Settings',
            },
            children: [
              { // Done
                index: true,
                element: <Navigate to="notifications" replace />,
                handle: {
                  title: 'Notifincations',
                },
              },
              { // Done
                path: 'notifications',
                element: <NotificationSettings />,
                handle: {
                  title: 'Notifications',
                },
              },
              { // Done
                path: 'account',
                element: <AccountSettings />,
                handle: {
                  title: 'Account',
                },
              },
              { // Done
                path: 'integrations',
                element: <IntegrationsSettings />,
                handle: {
                  title: 'Integrations',
                },
              },
              { // Done
                path: 'integrations/callback',
                element: <IntegrationsCallbackPage />,
                handle: {
                  title: 'Checking status',
                },
              },
              { // Done
                path: 'security',
                element: <SecuritySettings />,
                handle: {
                  title: 'Security',
                },
              },
            ],
          },
          { // Done
            path: `upgrade`,
            element: <SubScribePlanPage />,
            handle: {
              title: `Upgrade Plan`,
            },
          },
          { // Done
            path: 'subscription/confirm',
            element: <ProviderSubscriptionCallbackPage />,
            handle: {
              title: 'Confirm Subscription',
            },
          },
          {
            path: '*',
            element: <Error404Page />,
            handle: {
              title: 'Page Not Found',
            },
          },
        ],
      },
    ],
  },
  { path: '*', element: <Error404Page /> },
]);
