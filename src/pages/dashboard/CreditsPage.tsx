import { lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';

const Error404Page = lazy(() => import('../fallbacks/Error404Page'));
const LoadingFallbackPage = lazy(() => import('../fallbacks/LoadingFallbackPage'));
const CreditDashboard = lazy(() => import('../../containers/dashboard/CreditDashboard'));

const CreditsPage = () => {
  const { isProvider, isUser } = useAuth();

  const renderRoleDashboard = () => {
    if (isUser || isProvider) return <CreditDashboard />;
    return <Error404Page />;
  };

  return <Suspense fallback={<LoadingFallbackPage />}>{renderRoleDashboard()}</Suspense>;
};

export default CreditsPage;
