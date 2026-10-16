import { lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingFallbackPage from '../fallbacks/LoadingFallbackPage';

const Error404Page = lazy(() => import('../fallbacks/Error404Page'));
const AdminListUsers = lazy(() => import('../../containers/admin/AdminListUsers'));

const UsersPage = () => {
  const { isAdmin } = useAuth();

  const renderRoleDashboard = () => {
    if (isAdmin) return <AdminListUsers />;
    return <Error404Page />;
  };

  return <Suspense fallback={<LoadingFallbackPage />}>{renderRoleDashboard()}</Suspense>;
};

export default UsersPage;
