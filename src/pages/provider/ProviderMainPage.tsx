import { Suspense, useEffect } from "react";
import Sidebar from "@/components/Navs/Sidebar";
import InfoHeader from "@/components/Navs/InfoHeader";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { checkUserStatus } from "@/utils/apis/auth.api";
import LoadingFallback from "../common/LoadingFallback";
import avatar from '../../assets/defaultImages/avatar.png';
import ProviderAddAddressPage from "./ProviderAddAddressPage";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { planAccessMap, providerRoutes } from "@/utils/constants";
import ProviderApprovalPendingPage from "./ProviderApprovalPendingPage";
import ProviderAddServiceDetailsPage from "./ProviderAddServiceDetailsPage";
import ProviderAddServiceAvailabilityPage from "./ProviderAddServiceAvailabilityPage";

const ProviderMainPage = () => {

  const sidebarOpen = useSelector((store: RootState) => store.app.sidebarOpen);
  const user = useSelector((store: RootState) => store.auth.authUser);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const planName = user?.providerSubscription;
  const allowedRouteNames = planName ? planAccessMap[planName] : planAccessMap["NoSubscription"];
  const filteredRoutes = providerRoutes.filter(route => allowedRouteNames.includes(route.name));

  useEffect(() => {
    if (user?.isLoggedIn) {
      dispatch(checkUserStatus());
    }
  }, [dispatch, location]);

  if (!user?.isAdminApproved) {
    if (!user?.isAddressAdded) {
      return (
        <ProviderAddAddressPage />
      );
    } else if (!user?.isServiceDetailsAdded) {
      return (
        <ProviderAddServiceDetailsPage />
      );
    } else if (!user?.isServiceAvailabilityAdded) {
      return (
        <ProviderAddServiceAvailabilityPage />
      )
    } else {
      return (
        <ProviderApprovalPendingPage />
      )
    }
  }

  return user?.isAdminApproved && (
    <div className="flex h-screen bg-[var(--background)] transition-all duration-300">
      <Sidebar routes={providerRoutes} filteredRoutes={filteredRoutes} />
      <div className={`flex-1 flex flex-col  ${sidebarOpen ? 'w-[82%]' : 'w-[95%]'} transition-all duration-300`}>
        <InfoHeader profileImage={user.profileImage ?? avatar} username={user.username ?? ""} />
        <div className="flex-1 overflow-y-auto overscroll-y-contain no-scrollbar px-2">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProviderMainPage