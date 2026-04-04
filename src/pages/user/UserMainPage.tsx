import { Suspense } from "react";
import { userRoutes } from "@/shared/utils/constants";
import Sidebar from "@/components/navs/Sidebar";
import InfoHeader from "@/components/navs/InfoHeader";
import ReviewForm from "@/components/user/ReviewForm";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import LoadingFallback from "../common/LoadingFallback";
import avatar from '../../assets/defaultImages/avatar.png';
import { RootState } from "@/shared/redux/appStore";
import FilterRightSideBar from "@/components/filters/FilterRightSideBar";
import NotificationsContainer from "@/components/notification/NotificationsContainer";

const UserMainPage = () => {

  const location = useLocation();
  const user = useSelector((store: RootState) => store.auth.authUser);
  const { sidebarOpen } = useSelector((store: RootState) => store.app);
  const { isReviewCreateFormOpen } = useSelector((store: RootState) => store.user);

  return (
    <div className="flex h-screen bg-[var(--background)] transition all duration-300">
      <Sidebar routes={userRoutes} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[82%]' : 'w-[95%]'} transition-all duration-300`}>
        <InfoHeader profileImage={user?.profileImage ?? avatar} username={user?.username ?? ""} />
        <div className="flex-1 overflow-y-auto overscroll-y-contain relative no-scrollbar px-2">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
          {isReviewCreateFormOpen && (
            <ReviewForm />
          )}

          <NotificationsContainer />
        </div>
      </div>

      {location?.pathname === '/user/dashboard' && (
        <FilterRightSideBar />
      )}

    </div>
  )
}

export default UserMainPage