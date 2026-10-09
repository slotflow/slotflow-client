import { lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import PlanGuard from '@/router/PlanGuard';
import LoadingFallbackPage from '../fallbacks/LoadingFallbackPage';
import { RouteNames } from '@/shared/utils/constants/routeConstants';

const Error404Page = lazy(() => import('../fallbacks/Error404Page'));
const ProviderListSubscriptions = lazy(
  () => import('../../containers/provider/ProviderListSubscriptions'),
);
const AdminListSubscriptions = lazy(() => import('../../containers/admin/AdminListSubscriptions'));

const SubscriptionsPage = () => {
  const { isProvider, isAdmin } = useAuth();

  const renderRoleDashboard = () => {
    if (isProvider) {
      return (
        <PlanGuard routeName={RouteNames.SUBSCRIPTIONS}>
          <ProviderListSubscriptions />
        </PlanGuard>
      );
    }
    if (isAdmin) return <AdminListSubscriptions />;
    return <Error404Page />;
  };

  return <Suspense fallback={<LoadingFallbackPage />}>{renderRoleDashboard()}</Suspense>;
};

export default SubscriptionsPage;
