import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import Sidebar from "@/components/navs/Sidebar";
import { RootState } from "@/shared/redux/appStore";
import InfoHeader from "@/components/navs/InfoHeader";
import { Route } from "@/shared/interface/commonInterface";
import LoadingFallback from "../pages/common/LoadingFallback";

export interface MainLayoutProps {
    routes: Route[];
    filteredRoutes?: Route[];
    profileImage?: string;
    username?: string;
    children: React.ReactNode;
    rightSidebar?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    routes,
    filteredRoutes,
    profileImage,
    username,
    children,
    rightSidebar,
}) => {

    const { sidebarOpen } = useSelector((store: RootState) => store.app);

    return (
        <div className="flex h-screen bg-[var(--background)] transition-all duration-300">
            <Sidebar routes={routes} filteredRoutes={filteredRoutes} />
            <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[82%]' : 'w-[95%]'}`}>
                <InfoHeader profileImage={profileImage} username={username ?? ""} />
                <div className="flex-1 overflow-y-auto no-scrollbar px-2 relative">
                    <Suspense fallback={<LoadingFallback />}>
                        {children}
                    </Suspense>
                </div>
            </div>
            {rightSidebar}
        </div>
    )
}

export default MainLayout;