import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Role } from '@/shared/types/enums';
import { RootState } from '@/app/store/appStore';
import { ProtectedRouteProps } from '@/shared/types/component';

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = useSelector((store: RootState) => store.auth.authUser);

  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role as Role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
