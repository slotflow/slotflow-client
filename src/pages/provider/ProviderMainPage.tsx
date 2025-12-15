import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Navs/Sidebar";
import { RootState } from "@/utils/redux/appStore";
import InfoHeader from "@/components/Navs/InfoHeader";
import LoadingFallback from "../common/LoadingFallback";
import avatar from '../../assets/defaultImages/avatar.png';
import { planAccessMap, providerRoutes } from "@/utils/constants";

const ProviderMainPage: React.FC = () => {

  const {authUser: user} = useSelector((store: RootState) => store.auth);
  const { sidebarOpen } = useSelector((store: RootState) => store.app);
  // const dispatch = useDispatch<AppDispatch>();
  // const location = useLocation();

  const planName = user?.providerSubscription;
  const allowedRouteNames = planName ? planAccessMap[planName] : planAccessMap["NoSubscription"];
  const filteredRoutes = providerRoutes.filter(route => allowedRouteNames.includes(route.name));
  
  // useEffect(() => {
  //   if (user?.isLoggedIn) {
  //     dispatch(checkUserStatus());
  //   }
  // }, [dispatch, location, user?.isLoggedIn]);

  // if (!user?.isAdminVerified) {
  //   if (!user?.isAddressAdded) {
  //     return (
  //       <ProviderAddAddressPage />
  //     );
  //   } else if (!user?.isServiceDetailsAdded) {
  //     return (
  //       <ProviderCreateServiceDetailsPage />
  //     );
  //   } else if (!user?.isServiceAvailabilityAdded) {
  //     return (
  //       <ProviderCreateServiceAvailabilityPage />
  //     )
  //   } else if (!user?.isProofSubmitted) {
  //     return (
  //       <ProviderProofSubmitionPage />
  //     )
  //   } else {
  //     return (
  //       <ProviderApprovalPendingPage />
  //     )
  //   }
  // }

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