import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/shared/redux/appStore";
import { PlanName, Role } from "@/shared/interface/enums";
import { planAccessMap } from "@/shared/utils/constants";
import { PlanGuardProps } from '@/shared/interface/componentInterface';

const PlanGuard: React.FC<PlanGuardProps> = ({ 
  routeName, 
  children 
}) => {
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
