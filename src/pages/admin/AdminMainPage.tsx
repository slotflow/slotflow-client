import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminRoutes } from "@/shared/utils/constants";
import Sidebar from "@/components/navs/Sidebar";
import { RootState } from "@/shared/redux/appStore";
import InfoHeader from "@/components/navs/InfoHeader";
import LoadingFallback from "../common/LoadingFallback";
import avatar from '../../assets/defaultImages/avatar.png';

const AdminMainPage = () => {

  const sidebarOpen: boolean = useSelector((store: RootState) => store.app.sidebarOpen);

  return (
    <div className="flex h-screen bg-[var(--background)] transition-all duration-300">
      <Sidebar routes={adminRoutes} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[82%]' : 'w-[95%]'} transition-all duration-300`}>
        <InfoHeader profileImage={avatar} username={"Slotflow Admin"} />
        <div className="flex-1 overflow-y-auto overscroll-y-contain no-scrollbar px-2">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;