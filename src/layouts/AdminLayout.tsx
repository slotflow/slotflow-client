import MainLayout from "./MainLayout";
import { Outlet } from "react-router-dom";
import { adminRoutes } from "@/shared/utils/constants";
import avatar from '@/assets/defaultImages/avatar.png';

const AdminLayout = () => {

  return (
    <MainLayout
      routes={adminRoutes}
      profileImage={avatar}
      username="Slotflow Admin"
    >
      <Outlet />
    </MainLayout>
  );
};

export default AdminLayout;