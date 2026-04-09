import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";
import { PlanName } from "@/shared/interface/enums";
import MainLayout from "./MainLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { planAccessMap, providerRoutes } from "@/shared/utils/constants";

const ProviderLayout: React.FC = () => {

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { authUser: user } = useSelector((store: RootState) => store.auth);

  const planName = user?.providerSubscription;
  const allowedRouteNames = planName ? planAccessMap[planName] : planAccessMap[PlanName.NO_SUBSCRIPTION];
  const filteredRoutes = providerRoutes.filter(route => allowedRouteNames.includes(route.name));

  useEffect(() => {

    if (!user) return;

    if (!user.isAddressAdded && !user.isAddressVerified) {
      navigate("/provider/onboarding/address");
      return;
    }

    if (!user.isServiceDetailsAdded && !user.isServiceDetailsVerified) {
      navigate("/provider/onboarding/service");
      return;
    }

    if (
      !user.isServiceAvailabilityAdded &&
      !user.isAvailabilityVerified
    ) {
      navigate("/provider/onboarding/availability");
      return;
    }

    if (!user.isProofSubmitted && !user.isProofsVerified) {
      navigate("/provider/onboarding/proofs");
      return;
    }

    if (!user.isAdminVerified) {
      navigate("/provider/onboarding/pending");
      return;
    }

    if (user.isAdminVerified && (pathname === "/provider" || pathname === "/provider/")) {
      navigate("/provider/dashboard");
      return;
    }
  }, [user, navigate]);

  return (
    <MainLayout
      routes={providerRoutes}
      filteredRoutes={filteredRoutes}
      profileImage={user?.profileImage}
      username={user?.username}
    >
      <Outlet />
    </MainLayout>
  )
}

export default ProviderLayout;