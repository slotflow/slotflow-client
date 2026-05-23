import MainLayout from "./MainLayout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";
import { PlanName, Role } from "@/shared/interface/enums";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PaymentSelection from "@/components/payment/PaymentSelection";
import { planAccessMap, providerRoutes } from "@/shared/utils/constants";
import ProviderFreeSubscription from "@/components/provider/ProviderFreeSubscription";

const ProviderLayout: React.FC = () => {

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const { isOpen, subscriptionData } = useSelector((store: RootState) => store.payment);

  const planName = authUser?.providerSubscription;
  const allowedRouteNames = planName ? planAccessMap[planName] : planAccessMap[PlanName.NO_SUBSCRIPTION];
  const filteredRoutes = providerRoutes.filter(route => allowedRouteNames.includes(route.name));

  useEffect(() => {

    if (!authUser) return;

    if (!authUser.isAddressAdded && !authUser.isAddressVerified) {
      navigate("/provider/onboarding/address");
      return;
    }

    if (!authUser.isServiceDetailsAdded && !authUser.isServiceDetailsVerified) {
      navigate("/provider/onboarding/service");
      return;
    }

    if (
      !authUser.isServiceAvailabilityAdded &&
      !authUser.isAvailabilityVerified
    ) {
      navigate("/provider/onboarding/availability");
      return;
    }

    if (!authUser.isProofSubmitted && !authUser.isProofsVerified) {
      navigate("/provider/onboarding/proofs");
      return;
    }

    if (!authUser.isAdminVerified) {
      navigate("/provider/onboarding/pending");
      return;
    }

    if (authUser.isAdminVerified && (pathname === "/provider" || pathname === "/provider/")) {
      navigate("/provider/dashboard");
      return;
    }
  }, [authUser, navigate]);

  return (
    <MainLayout
      routes={providerRoutes}
      filteredRoutes={filteredRoutes}
      profileImage={authUser?.profileImage}
      username={authUser?.username}
    >
      <Outlet />
      {isOpen && authUser?.role === Role.USER && <PaymentSelection />}
      {subscriptionData?.isTrialPlan && <ProviderFreeSubscription />}
    </MainLayout>
  )
}

export default ProviderLayout;