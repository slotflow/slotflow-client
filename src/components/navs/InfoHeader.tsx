import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useMatches } from 'react-router-dom';
import { Bell, PanelLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../assets/defaultImages/avatar.png';
import { AppDispatch, RootState } from '@/shared/redux/appStore';
import { AppRouteHandle } from '@/shared/interface/commonInterface';
import { InfoHeaderProps } from '@/shared/interface/componentInterface';
import { toggleNotificationContainer, toggleSidebar } from '@/shared/redux/slices/appSlice';

const InfoHeader = ({ profileImage, username }: InfoHeaderProps) => {

  const matches = useMatches();
  const dispatch = useDispatch<AppDispatch>();
  const [isOnline, setIsOnline] = useState(true);
  const { profileImageUpdating } = useSelector((state: RootState) => state.auth);

  const currentRoute = matches.slice().reverse().find((match) => {
    const handle = match.handle as AppRouteHandle;
    return !!handle?.title;
  });
  const pageTitle = (currentRoute?.handle as AppRouteHandle | undefined)?.title ?? '';

  useEffect(() => {
    const handleOffline = () => setIsOnline(false);
    const handleOnline = () => setIsOnline(true);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleSidebar = (): void => {
    dispatch(toggleSidebar());
  };

  return (
    <nav className="px-4 md:px-6 py-3 flex items-center justify-between border-b transition-all duration-300">
      <div className="flex items-center gap-2 md:gap-4 w-full">
        <Button
          title="Toggle Sidebar"
          variant="ghost"
          size="icon"
          className="rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          onClick={handleSidebar}
        >
          <PanelLeft className="w-5 h-5 opacity-80" />
        </Button>

        <div className="w-px h-6 bg-gray-400/20 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            {profileImageUpdating ? (
              <div className="rounded-full size-9 shimmer ring-2 ring-primary/20"></div>
            ) : (
              <img
                src={profileImage || avatar}
                alt="Profile"
                className="size-8 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
              />
            )}
            <div
              className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[var(--menuBg)] ${isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'}`}
              title={isOnline ? 'Online' : 'Offline'}
            ></div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-medium tracking-wide">Hi, {username}</h4>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <h1 className="text-sm md:text-base font-semibold tracking-tight">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center justify-end gap-3 md:gap-5 w-full">
        <Button
          title="notifications"
          variant="ghost"
          size="icon"
          className="relative rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => dispatch(toggleNotificationContainer())}
        >
          <Bell className="w-5 h-5 opacity-80" />
          <span className="absolute top-2.5 right-2.5 size-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(59,130,246,0.8)] border border-[var(--menuBg)]"></span>
        </Button>
      </div>
    </nav>
  );
};

export default InfoHeader;
