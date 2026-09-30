import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { useMatches } from 'react-router-dom';
import { Bell, PanelLeft } from 'lucide-react';
import { AppDispatch } from '@/app/store/appStore';
import { AppRouteHandle } from '@/shared/types/common';
import { toggleNotificationContainer, toggleSidebar } from '@/app/store/slices/appSlice';

const InfoHeader = () => {
  const matches = useMatches();
  const dispatch = useDispatch<AppDispatch>();

  const pageTitle = matches
    .map((match) => {
      const handle = match.handle as AppRouteHandle | undefined;
      return handle?.title;
    })
    .filter(Boolean)
    .join(' / ');

  const handleSidebar = (): void => {
    dispatch(toggleSidebar());
  };

  return (
    <nav className="px-4 md:px-6 py-3 flex items-center justify-between border-b transition-all duration-300">
      <div className="flex items-center gap-2 md:gap-4 w-full">
        <Button
          title="Toggle Sidebar"
          variant="ghost"
          size="sm"
          className="rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          onClick={handleSidebar}
        >
          <PanelLeft className="size-5 opacity-80" />
        </Button>

        <div className="w-px h-6 bg-gray-400/20 hidden sm:block"></div>
      </div>

      <div className="flex items-center justify-center w-full">
        <h1 className="text-sm md:text-base text-primary/50 font-semibold tracking-tight">{pageTitle}</h1>
      </div>

      <div className="flex items-center justify-end gap-3 md:gap-5 w-full">
        <Button
          title="notifications"
          variant="ghost"
          size="sm"
          className="relative rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => dispatch(toggleNotificationContainer())}
        >
          <Bell className="size-5 opacity-80" />

          <span className="absolute top-2.5 right-2.5 size-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(59,130,246,0.8)] border border-[var(--menuBg)]"></span>
        </Button>
      </div>
    </nav>
  );
};

export default InfoHeader;
