import { useSelector } from "react-redux";
import Sidebar from "@/components/navs/Sidebar";
import { RootState } from "@/shared/redux/appStore";
import React, { Suspense, useEffect } from "react";
import { PlanName } from "@/shared/interface/enums";
import InfoHeader from "@/components/navs/InfoHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingFallback from "../common/LoadingFallback";
import avatar from '../../assets/defaultImages/avatar.png';
import { planAccessMap, providerRoutes } from "@/shared/utils/constants";

const ProviderMainPage: React.FC = () => {

  const { authUser: user } = useSelector((store: RootState) => store.auth);
  const { sidebarOpen } = useSelector((store: RootState) => store.app);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

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
    <div className="flex h-screen bg-[var(--background)] transition-all duration-300">
      <Sidebar routes={providerRoutes} filteredRoutes={filteredRoutes} />
      <div className={`flex-1 flex flex-col  ${sidebarOpen ? 'w-[82%]' : 'w-[95%]'} transition-all duration-300`}>
        <InfoHeader profileImage={user?.profileImage ?? avatar} username={user?.username ?? ""} />
        <div className="flex-1 overflow-y-auto overscroll-y-contain no-scrollbar px-2">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProviderMainPage;