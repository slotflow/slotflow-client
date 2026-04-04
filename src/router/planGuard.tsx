import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { planAccessMap } from "@/shared/utils/constants";
import { RootState } from "@/shared/redux/appStore";
import { PlanName } from "@/shared/interface/enums";

interface PlanGuardProps {
  routeName: string;
  children: React.ReactNode;
}

const PlanGuard = ({ routeName, children }: PlanGuardProps) => {
  const user = useSelector((store: RootState) => store.auth.authUser);
  const planName = user?.providerSubscription || PlanName.NO_SUBSCRIPTION;
  const allowedRoutes = planAccessMap[planName] || [];

  if (!allowedRoutes.includes(routeName)) {
    return <Navigate to="/provider" replace />;
  }

  return <>{children}</>;
};

export default PlanGuard;
