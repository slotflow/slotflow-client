import { lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import PlanGuard from '@/router/PlanGuard';
import LoadingFallbackPage from '../fallbacks/LoadingFallbackPage';
import { RouteNames } from '@/shared/utils/constants/routeConstants';

const Error404Page = lazy(() => import('../fallbacks/Error404Page'));
const BookingDetails = lazy(() => import('../../containers/dashboard/BookingDetails'));

const BookingDetailsPage = () => {
  const { isUser, isProvider } = useAuth();

  const renderRoleDashboard = () => {
    if (isProvider) {
      return (
        <PlanGuard routeName={RouteNames.BOOKINGS}>
          <BookingDetails />
        </PlanGuard>
      );
    }
    if (isUser) {
      return <BookingDetails />;
    } else {
      return <Error404Page />;
    }
  };

  return <Suspense fallback={<LoadingFallbackPage />}>{renderRoleDashboard()}</Suspense>;
};

export default BookingDetailsPage;
