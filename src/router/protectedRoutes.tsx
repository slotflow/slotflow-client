import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";

interface ProtectedRouteProps {
  allowedRoles: (Role)[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  
  const user = useSelector((store: RootState) => store.auth.authUser);

  if (!user || !user.role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user?.role as Role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
