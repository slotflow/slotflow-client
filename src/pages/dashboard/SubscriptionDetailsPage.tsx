import { lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import PlanGuard from '@/router/PlanGuard';
import LoadingFallbackPage from '../fallbacks/LoadingFallbackPage';
import { RouteNames } from '@/shared/utils/constants/routeConstants';

const Error404Page = lazy(() => import('../fallbacks/Error404Page'));
const SubscriptionDetails = lazy(() => import('../../containers/dashboard/SubscriptionDetails'));

const SubscriptionDetailsPage = () => {
  const { isAdmin, isProvider } = useAuth();

  const renderRoleDashboard = () => {
    if (isProvider) {
      return (
        <PlanGuard routeName={RouteNames.SUBSCRIPTIONS}>
          <SubscriptionDetails />
        </PlanGuard>
      );
    }
    if (isAdmin) {
      return <SubscriptionDetails />;
    } else {
      return <Error404Page />;
    }
  };

  return <Suspense fallback={<LoadingFallbackPage />}>{renderRoleDashboard()}</Suspense>;
};

export default SubscriptionDetailsPage;
