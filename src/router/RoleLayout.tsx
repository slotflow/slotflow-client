import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Role } from '@/shared/types/enums';
import UserLayout from '@/layouts/UserLayout';
import AdminLayout from '@/layouts/AdminLayout';
import { RootState } from '@/app/store/appStore';
import ProviderLayout from '@/layouts/ProviderLayout';

const RoleLayout = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  switch (authUser?.role) {
    case Role.USER:
      return <UserLayout />;
    case Role.PROVIDER:
      return <ProviderLayout />;
    case Role.ADMIN:
      return <AdminLayout />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default RoleLayout;
