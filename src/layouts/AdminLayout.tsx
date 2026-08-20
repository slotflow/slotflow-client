import MainLayout from './MainLayout';
import { Outlet } from 'react-router-dom';
import { Role } from '@/shared/interface/enums';
import avatar from '@/assets/defaultImages/avatar.png';
import { getRoutesByRole } from '@/shared/helper/getRouteByRole';

const AdminLayout = () => {
  const adminRoutes = getRoutesByRole(Role.ADMIN);

  return (
    <MainLayout routes={adminRoutes} profileImage={avatar} username="Slotflow Admin">
      <Outlet />
    </MainLayout>
  );
};

export default AdminLayout;
