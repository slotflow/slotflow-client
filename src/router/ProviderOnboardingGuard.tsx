import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import { getProviderRequiredRoute } from "@/utils/helper/providerOnboardRoute";

const ProviderOnboardingGuard = () => {
  
  const { authUser } = useSelector((state: RootState) => state.auth);

  if (!authUser) return null;

  const requiredRoute = getProviderRequiredRoute(authUser);

  return <Navigate to={requiredRoute} replace />;
};

export default ProviderOnboardingGuard;
