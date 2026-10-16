import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { toggleTheme } from '@/app/store/slices/appSlice';
import { useSignout } from '@/hooks/systemHooks/useSignout';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { LogOut, Sun, Moon, Settings, CreditCard, User } from 'lucide-react';
import ProfileImage from '../profile/ProfileImage';

interface SidebarDropDownProps {
  isSidebarOpen: boolean;
}

export const SidebarDropDown = ({ isSidebarOpen }: SidebarDropDownProps) => {
  const { goTo } = useAppNavigation();
  const { userSignout } = useSignout();
  const dispatch = useDispatch<AppDispatch>();
  const { isProvider, isAdmin, user } = useAuth();

  const themeMode: boolean = useSelector((store: RootState) => store.app.lightTheme);

  if (!user?.isLoggedIn || !user.role) {
    return null;
  }

  const changeTheme = (): void => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`p-4 ${!isSidebarOpen ? 'px-2' : ''}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[var(--sidebar-accent)] outline-none"
          >
            <ProfileImage
              name={user.username ?? ''}
              profileImage={user.profileImage}
              size="size-9"
              rounded="md"
            />

            {isSidebarOpen && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{user.username}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Settings className="size-4 shrink-0 text-muted-foreground" />
              </>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          align="start"
          sideOffset={8}
          className="min-w-72 rounded-lg"
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.username ?? 'Profile'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold">
                    {user.username?.charAt(0).toUpperCase() ?? 'U'}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user.username}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          {!isAdmin && (
            <DropdownMenuItem onClick={() => goTo(redirectPaths.ACCOUNT)}>
              <User />
              <span>Account</span>
            </DropdownMenuItem>
          )}

          {isProvider && (
            <DropdownMenuItem onClick={() => goTo(redirectPaths.UPGRADE)}>
              <CreditCard />
              <span>Upgrade plan</span>
            </DropdownMenuItem>
          )}

          {!isAdmin && (
            <DropdownMenuItem onClick={() => goTo(redirectPaths.SETTINGS)}>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={changeTheme}>
            {!themeMode ? <Sun /> : <Moon />}
            <span>{!themeMode ? 'Light Mode' : 'Dark Mode'}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => userSignout()}
            className="text-red-500 focus:text-red-500"
          >
            <LogOut />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
