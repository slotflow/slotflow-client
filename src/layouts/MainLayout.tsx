import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/navs/Sidebar';
import { Suspense, useEffect, useMemo } from 'react';
import InfoHeader from '@/components/navs/InfoHeader';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayoutProps } from '@/shared/types/component';
import { standaloneRoutes } from '@/shared/utils/constants/routeConstants';
import { AppDispatch, RootState } from '@/app/store/appStore';
import LoadingFallbackPage from '../pages/fallbacks/LoadingFallbackPage';
import { connectEventSocket } from '@/services/socket/eventSocketThunk';
import { useNotificationPermissionGate } from '@/hooks/systemHooks/useNotificationPermissionGate';

const MainLayout = ({ routes, filteredRoutes, children, rightSidebar }: MainLayoutProps) => {

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isSidebarOpen } = useSelector((store: RootState) => store.app);
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  useNotificationPermissionGate();

  useEffect(() => {
    if (authUser) {
      dispatch(connectEventSocket());
    }
  }, [authUser, dispatch]);

  const isStandalonePage = useMemo(() => {
    return standaloneRoutes.some((route) => location.pathname.startsWith(route));
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-background transition-all duration-300">
      {!isStandalonePage && (
        <Sidebar routes={routes} filteredRoutes={filteredRoutes} />
      )}
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'w-[82%]' : 'w-[95%]'}`}>
        {!isStandalonePage && <InfoHeader />}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 relative">
          <Suspense fallback={<LoadingFallbackPage />}>{children}</Suspense>
        </div>
      </div>
      {rightSidebar}
    </div>
  );
};

export default MainLayout;
