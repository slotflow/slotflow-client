import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { planAccessMap, RouteAccess } from "@/shared/utils/constants";
import { RootState } from "@/shared/redux/appStore";
import { PlanName, Role } from "@/shared/interface/enums";

interface PlanGuardProps {
  routeName: RouteAccess;
  children: React.ReactNode;
}

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
