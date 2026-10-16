import { lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import PlanGuard from '@/router/PlanGuard';
import { RouteNames } from '@/shared/utils/constants/routeConstants';

const Error404Page = lazy(() => import('../fallbacks/Error404Page'));
const LoadingFallbackPage = lazy(() => import('../fallbacks/LoadingFallbackPage'));
const ListPayments = lazy(() => import('../../containers/dashboard/ListPayments'));

const PaymentsPage = () => {
  const { isProvider, isUser, isAdmin } = useAuth();

  const renderRoleDashboard = () => {
    if (isProvider) {
      return (
        <PlanGuard routeName={RouteNames.PAYMENTS}>
          <ListPayments />
        </PlanGuard>
      );
    }
    if (isUser || isAdmin) return <ListPayments />;
    return <Error404Page />;
  };

  return <Suspense fallback={<LoadingFallbackPage />}>{renderRoleDashboard()}</Suspense>;
};

export default PaymentsPage;
