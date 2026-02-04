import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { planAccessMap } from "@/utils/constants";
import { RootState } from "@/utils/redux/appStore";

interface PlanGuardProps {
  routeName: string;
  children: React.ReactNode;
}

const PlanGuard = ({ routeName, children }: PlanGuardProps) => {
  console.log("plan guard");
  const user = useSelector((store: RootState) => store.auth.authUser);
  console.log("user : ",user);
  const planName = user?.providerSubscription || "NoSubscription";
  console.log("planName : ",planName);
  const allowedRoutes = planAccessMap[planName] || [];
  console.log("allowedRoutes : ",allowedRoutes);

  if (!allowedRoutes.includes(routeName)) {
    return <Navigate to="/provider" replace />;
  }

  return <>{children}</>;
};

export default PlanGuard;
