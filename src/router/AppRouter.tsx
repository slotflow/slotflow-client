import { lazy } from 'react';
import PlanGuard from './PlanGuard.tsx';
import RoleLayout from './RoleLayout.tsx';
import { Role } from '@/shared/interface/enums.ts';
import OnBoardingGuard from './OnBoardingGuard.tsx';
import { ProtectedRoute } from './ProtectedRoutes.tsx';
import { RouteNames } from '@/shared/utils/constants.ts';
import BoardingLayoutWrapper from './BoardingLayoutWrapper.tsx';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

const AuthLayout = lazy(() => import('@/layouts/AuthLayout.tsx'));
const LoginForm = lazy(() => import('@/components/form/CommonForms/LoginForm.tsx'));
const SignUpForm = lazy(() => import('@/components/form/CommonForms/SignUpForm.tsx'));
const ResetPasswordForm = lazy(() => import('@/components/form/CommonForms/ResetPasswordForm.tsx'));
const OtpVerificatioForm = lazy(
  () => import('@/components/form/CommonForms/OtpVerificatioForm.tsx'),
);
const EmailVerificationForm = lazy(
  () => import('@/components/form/CommonForms/EmailVerificationForm.tsx'),
);

const FAQPage = lazy(() => import('@/pages/landing/FAQPage.tsx'));
const BlogPage = lazy(() => import('@/pages/landing/BlogPage.tsx'));
const HelpPage = lazy(() => import('@/pages/landing/HelpPage.tsx'));
const ChatPage = lazy(() => import('@/pages/dashboard/ChatPage.tsx'));
const AboutPage = lazy(() => import('@/pages/landing/AboutPage.tsx'));
const LandingLayout = lazy(() => import('@/layouts/LandingLayout.tsx'));
const CreditPage = lazy(() => import('@/pages/dashboard/CreditPage.tsx'));
const PricingPage = lazy(() => import('@/pages/landing/PricingPage.tsx'));
const ContactPage = lazy(() => import('@/pages/landing/ContactPage.tsx'));
const LandingPage = lazy(() => import('@/pages/landing/LandingPage.tsx'));
const Error404Page = lazy(() => import('@/pages/common/Error404Page.tsx'));
const ReviewsPage = lazy(() => import('@/pages/dashboard/ReviewsPage.tsx'));
const SettingsPage = lazy(() => import('@/pages/dashboard/SettingsPage.tsx'));
const CalendarPage = lazy(() => import('@/pages/dashboard/CalendarPage.tsx'));
const ReferralPage = lazy(() => import('@/pages/dashboard/ReferralPage.tsx'));
const UserAccountPage = lazy(() => import('@/pages/user/UserAccountPage.tsx'));
const VideoCallRoom = lazy(() => import('@/pages/dashboard/VideoCallRoom.tsx'));
const RoleSelectPage = lazy(() => import('@/pages/boarding/RoleSelectPage.tsx'));
const VideoCallLoby = lazy(() => import('@/pages/dashboard/VideoCallLobby.tsx'));
const BlogDetailsPage = lazy(() => import('@/pages/landing/BlogDetailsPage.tsx'));
const HearAboutUsPage = lazy(() => import('@/pages/boarding/HearAboutUsPage.tsx'));
const LegalHomePage = lazy(() => import('@/pages/landing/legal/LegalHomePage.tsx'));
const ListPaymentsPage = lazy(() => import('@/pages/dashboard/ListPaymentsPage.tsx'));
const ListBookingsPage = lazy(() => import('@/pages/dashboard/ListBookingsPage.tsx'));
const BookingDetailPage = lazy(() => import('@/pages/dashboard/BookingDetailPage.tsx'));
const AccountSettings = lazy(() => import('@/components/settings/AccountSettings.tsx'));
const SecuritySettings = lazy(() => import('@/components/settings/SecuritySettings.tsx'));
const PrivacyPolicyPage = lazy(() => import('@/pages/landing/legal/PrivacyPolicyPage.tsx'));
const TermsOfServicePage = lazy(() => import('@/pages/landing/legal/TermsOfServicePage.tsx'));
const IntegrationsListing = lazy(() => import('@/components/settings/IntegrationsListing.tsx'));
const PaymentDetailViewPage = lazy(() => import('@/pages/dashboard/PaymentDetailViewPage.tsx'));
const NotificationSettings = lazy(() => import('@/components/settings/NotificationSettings.tsx'));
const SubscriptionDetailViewPage = lazy(
  () => import('@/pages/dashboard/SubscriptionDetailViewPage.tsx'),
);

const UserServiceSelectPage = lazy(() => import('@/pages/user/UserServiceSelectPage.tsx'));
const UserBookingConfirmPage = lazy(() => import('@/pages/user/UserBookingConfirmPage.tsx'));
const UserListProvidersCardsPage = lazy(
  () => import('@/pages/user/UserListProvidersCardsPage.tsx'),
);
const UserServiceProviderDetailPage = lazy(
  () => import('@/pages/user/UserServiceProviderDetailPage.tsx'),
);

const ProviderAccountPage = lazy(() => import('@/pages/provider/ProviderAccountPage.tsx'));
const ProviderDashboardPage = lazy(() => import('@/pages/provider/ProviderDashboardPage.tsx'));
const ProviderAddAddressPage = lazy(() => import('@/pages/boarding/ProviderCreateAddressPage.tsx'));
const ProviderSubscriptionPage = lazy(
  () => import('@/pages/provider/ProviderSubscriptionPage.tsx'),
);
const ProviderProofSubmitionPage = lazy(
  () => import('@/pages/boarding/ProviderProofSubmitionPage.tsx'),
);
const ProviderApprovalPendingPage = lazy(
  () => import('@/pages/boarding/ProviderApprovalPendingPage.tsx'),
);
const ProviderSubscriptionConfirmPage = lazy(
  () => import('@/pages/provider/ProviderSubscriptionConfirmPage.tsx'),
);
const ProviderCreateServiceDetailsPage = lazy(
  () => import('@/pages/boarding/ProviderCreateServiceDetailsPage.tsx'),
);
const ProviderCreateServiceAvailabilityPage = lazy(
  () => import('@/pages/boarding/ProviderCreateServiceAvailabilityPage.tsx'),
);

const AdminPlansPage = lazy(() => import('@/pages/admin/AdminPlansPage.tsx'));
const AdminUsersPage = lazy(() => import('@/pages/admin/AdminUsersPage.tsx'));
const AdminReportPage = lazy(() => import('@/pages/admin/AdminReportPage.tsx'));
const AdminServicesPage = lazy(() => import('@/pages/admin/AdminServicesPage.tsx'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage.tsx'));
const AdminUserDetailPage = lazy(() => import('@/pages/admin/AdminUserDetailPage.tsx'));
const AdminGrafanaDashboard = lazy(() => import('@/pages/admin/AdminGrafanaDashboard.tsx'));
const AdminSubscriptionsPage = lazy(() => import('@/pages/admin/AdminSubscriptionsPage.tsx'));
const AdminServiceProvidersPage = lazy(() => import('@/pages/admin/AdminServiceProvidersPage.tsx'));
const AdminServiceProviderDetailPage = lazy(
  () => import('@/pages/admin/AdminServiceProviderDetailPage.tsx'),
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
      {
        path: 'dashboard',
        element: <AdminDashboardPage />,
        handle: {
          title: 'Overview',
        },
      },
      {
        path: 'report',
        element: <AdminReportPage />,
        handle: {
          title: 'Reports',
        },
      },
      {
        path: 'service-providers',
        element: <AdminServiceProvidersPage />,
        handle: {
          title: 'Service Providers',
        },
      },
      {
        path: 'service-providers/:providerId',
        element: <AdminServiceProviderDetailPage />,
        handle: {
          title: 'Service Provider Details',
        },
      },
      {
        path: 'users',
        element: <AdminUsersPage />,
        handle: {
          title: 'Users',
        },
      },
      {
        path: 'users/:userId',
        element: <AdminUserDetailPage />,
        handle: {
          title: 'User Details',
        },
      },
      {
        path: 'services',
        element: <AdminServicesPage />,
        handle: {
          title: 'Services',
        },
      },
      {
        path: 'plans',
        element: <AdminPlansPage />,
        handle: {
          title: 'Plans',
        },
      },
      {
        path: 'subscriptions',
        element: <AdminSubscriptionsPage />,
        handle: {
          title: 'Subscriptions',
        },
      },
      {
        path: 'subscriptions/:subscriptionId',
        element: <SubscriptionDetailViewPage />,
        handle: {
          title: 'Subscription Details',
        },
      },
      {
        path: 'payments',
        element: <ListPaymentsPage />,
        handle: {
          title: 'Payments',
        },
      },
      {
        path: 'payments/:paymentId',
        element: <PaymentDetailViewPage />,
        handle: {
          title: 'Payment Details',
        },
      },
      {
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
          {
            index: true,
            element: <UserServiceSelectPage />,
            handle: {
              title: 'Services',
            },
          },
          {
            path: 'dashboard',
            element: <UserListProvidersCardsPage />,
            handle: {
              title: 'Dashboard',
            },
          },
          {
            path: 'providerProfile/:providerId',
            element: <UserServiceProviderDetailPage />,
            handle: {
              title: 'Service Provider Details',
            },
          },
          {
            path: 'profile',
            element: <UserAccountPage />,
            handle: {
              title: 'Profile',
            },
          },
          {
            path: 'bookings',
            element: <ListBookingsPage />,
            handle: {
              title: 'Bookings',
            },
          },
          {
            path: 'bookings/:bookingId',
            element: <BookingDetailPage />,
            handle: {
              title: 'Booking Details',
            },
          },
          {
            path: 'payments',
            element: <ListPaymentsPage />,
            handle: {
              title: 'Payments',
            },
          },
          {
            path: 'payments/:paymentId',
            element: <PaymentDetailViewPage />,
            handle: {
              title: 'Payment Details',
            },
          },
          {
            path: 'chat',
            element: <ChatPage />,
            handle: {
              title: 'Chat',
            },
          },
          {
            path: 'video-call-lobby/:roomId',
            element: <VideoCallLoby />,
            handle: {
              title: 'Video Call Lobby',
            },
          },
          {
            path: 'video-call-room?status',
            element: <VideoCallRoom />,
            handle: {
              title: 'Video Call',
            },
          },
          {
            path: 'calendar',
            element: <CalendarPage />,
            handle: {
              title: 'Calendar',
            },
          },
          {
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
                element: <IntegrationsListing />,
                handle: {
                  title: 'Integrations',
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
          {
            path: 'credits',
            element: <CreditPage />,
            handle: {
              title: 'Credits',
            },
          },
          {
            path: 'referrals',
            element: <ReferralPage />,
            handle: {
              title: 'Referrals',
            },
          },
          {
            path: 'booking/confirm',
            element: <UserBookingConfirmPage />,
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
          {
            path: 'dashboard',
            element: <ProviderDashboardPage />,
            handle: {
              title: 'Dashboard',
            },
          },
          {
            path: 'profile',
            element: <ProviderAccountPage />,
            handle: {
              title: 'Profile',
            },
          },
          {
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
          {
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
          {
            path: 'bookings/:bookingId',
            element: <BookingDetailPage />,
            handle: {
              title: 'Booking Details',
            },
          },
          {
            path: 'subscriptions',
            element: (
              <PlanGuard routeName={RouteNames.SUBSCRIPTIONS}>
                <ProviderSubscriptionPage />
              </PlanGuard>
            ),
            handle: {
              title: 'Subscriptions',
            },
          },
          {
            path: 'subscriptions/:subscriptionId',
            element: <SubscriptionDetailViewPage />,
            handle: {
              title: 'Subscription Details',
            },
          },
          {
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
          {
            path: 'payments/:paymentId',
            element: <PaymentDetailViewPage />,
            handle: {
              title: 'Payment Details',
            },
          },
          {
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
          {
            path: 'video-call-lobby/:roomId',
            element: <VideoCallLoby />,
            handle: {
              title: 'Video Call Lobby',
            },
          },
          {
            path: 'video-call-room/:roomId',
            element: <VideoCallRoom />,
            handle: {
              title: 'Video Call',
            },
          },
          {
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
          {
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
          {
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
          {
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
              {
                index: true,
                element: <Navigate to="notifications" replace />,
                handle: {
                  title: 'Settings',
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
                element: <IntegrationsListing />,
                handle: {
                  title: 'Integrations',
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
          {
            path: 'subscription/confirm',
            element: <ProviderSubscriptionConfirmPage />,
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
