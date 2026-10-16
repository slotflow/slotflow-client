import { lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import PlanGuard from '@/router/PlanGuard';
import { RouteNames } from '@/shared/utils/constants/routeConstants';

const Error404Page = lazy(() => import('../fallbacks/Error404Page'));
const LoadingFallbackPage = lazy(() => import('../fallbacks/LoadingFallbackPage'));
const ListReviews = lazy(() => import('../../containers/dashboard/ListReviews'));

const ReviewsPage = () => {
  const { isProvider, isUser } = useAuth();

  const renderRoleDashboard = () => {
    if (isProvider) {
      return (
        <PlanGuard routeName={RouteNames.REVIEWS}>
          <ListReviews />
        </PlanGuard>
      );
    }
    if (isUser) return <ListReviews />;
    return <Error404Page />;
  };

  return <Suspense fallback={<LoadingFallbackPage />}>{renderRoleDashboard()}</Suspense>;
};

export default ReviewsPage;
