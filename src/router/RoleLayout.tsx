import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserLayout from "@/layouts/UserLayout";
import { Role } from "@/shared/interface/enums";
import AdminLayout from "@/layouts/AdminLayout";
import { RootState } from "@/shared/redux/appStore";
import ProviderLayout from "@/layouts/ProviderLayout";

const RoleLayout: React.FC = () => {
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