import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/navs/Sidebar';
import { Suspense, useEffect, useMemo } from 'react';
import InfoHeader from '@/components/navs/InfoHeader';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayoutProps } from '@/shared/types/component';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { connectChatSocket } from '@/services/socket/chatSocketThunk';
import { connectEventSocket } from '@/services/socket/eventSocketThunk';
import LoadingFallbackPage from '../pages/fallbacks/LoadingFallbackPage';
import { standaloneRoutes } from '@/shared/utils/constants/routeConstants';
import { useNotificationPermissionGate } from '@/hooks/systemHooks/useNotificationPermissionGate';
import { NotificationPermissionBanner } from '@/components/notification/NotificationPermissionBanner';

const MainLayout = ({ routes, filteredRoutes, children, rightSidebar }: MainLayoutProps) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isSidebarOpen } = useSelector((store: RootState) => store.app);
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const { showBanner, handleAllow, handleDismiss, isPending } = useNotificationPermissionGate();

  useEffect(() => {
    if (authUser) {
      dispatch(connectEventSocket());
      dispatch(connectChatSocket());
    }
  }, [authUser, dispatch]);

  const isStandalonePage = useMemo(() => {
    return standaloneRoutes.some((route) => location.pathname.startsWith(route));
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-background transition-all duration-300">
      {!isStandalonePage && <Sidebar routes={routes} filteredRoutes={filteredRoutes} />}
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'w-[85%]' : 'w-[95%]'}`}>
        {!isStandalonePage && <InfoHeader />}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 relative">
          <Suspense fallback={<LoadingFallbackPage />}>
            {
              <>
                {children}
                {showBanner && (
                  <NotificationPermissionBanner
                    onAllow={handleAllow}
                    onDismiss={handleDismiss}
                    isLoading={isPending}
                  />
                )}
              </>
            }
          </Suspense>
        </div>
      </div>
      {rightSidebar}
    </div>
  );
};

export default MainLayout;
