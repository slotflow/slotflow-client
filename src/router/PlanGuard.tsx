import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '@/app/store/appStore';
import { PlanName, Role } from '@/shared/types/enums';
import { planAccessMap } from '@/shared/utils/constants';
import { PlanGuardProps } from '@/shared/types/component';

const PlanGuard = ({ routeName, children }: PlanGuardProps) => {
  const { authUser } = useSelector((store: RootState) => store.auth);

  if (authUser?.role !== Role.PROVIDER) {
    return <>{children}</>;
  }

  const planName = authUser?.providerSubscription || PlanName.NO_SUBSCRIPTION;
  const allowedRoutes = planAccessMap[planName] || [];

  if (!allowedRoutes.includes(routeName)) {
    // return <Navigate to="/provider" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PlanGuard;
