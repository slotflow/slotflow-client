import MainLayout from './MainLayout';
import { Outlet } from 'react-router-dom';
import { Role } from '@/shared/types/enums';
import { getRoutesByRole } from '@/shared/utils/helper/getRouteByRole';

const AdminLayout = () => {
  const adminRoutes = getRoutesByRole(Role.ADMIN);

  return (
    <MainLayout routes={adminRoutes}>
      <Outlet />
    </MainLayout>
  );
};

export default AdminLayout;
