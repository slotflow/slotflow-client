import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";
import UserMainPage from "@/pages/user/UserMainPage";
import AdminMainPage from "@/pages/admin/AdminMainPage";
import ProviderMainPage from "@/pages/provider/ProviderMainPage";

export const RoleLayout = () => {

  const { authUser } = useSelector((state: RootState) => state.auth);

  switch (authUser?.role) {
    case Role.USER:
      return <UserMainPage />;
    case Role.PROVIDER:
      return <ProviderMainPage />;
    case Role.ADMIN:
      return <AdminMainPage />;
    default:
      return <Navigate to="/login" replace />;
  }

};
