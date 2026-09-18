import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Role } from '@/shared/types/enums';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '@/shared/types/slice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/app/store/slices/appSlice';
import { useSignout } from '@/hooks/systemHooks/useSignout';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { LogOut, Sun, Moon, Settings, Bell, CreditCard } from 'lucide-react';

interface SidebarDropDownProps {
  isSidebarOpen: boolean;
  basePath: string;
}

export const SidebarDropDown = ({ isSidebarOpen, basePath }: SidebarDropDownProps) => {
  const navigate = useNavigate();
  const { userSignout } = useSignout();
  const dispatch = useDispatch<AppDispatch>();

  const themeMode: boolean = useSelector((store: RootState) => store.app.lightTheme);
  const user: Partial<AuthUser> | null = useSelector((store: RootState) => store.auth?.authUser);

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
            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground">
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

          <DropdownMenuItem onClick={() => navigate(`${basePath}/settings/account`)}>
            <CreditCard />
            <span>Account</span>
          </DropdownMenuItem>

          {user.role === Role.PROVIDER && (
            <DropdownMenuItem onClick={() => navigate('/provider/upgrade')}>
              <CreditCard />
              <span>Upgrade plan</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => navigate(`${basePath}/settings`)}>
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => navigate(`${basePath}/settings/notifications`)}>
            <Bell />
            <span>Notifications</span>
          </DropdownMenuItem>

          {user.role === Role.PROVIDER && (
            <DropdownMenuItem onClick={() => navigate('/provider/settings/billing')}>
              <CreditCard />
              <span>Billing</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={changeTheme}>
            {!themeMode ? <Sun /> : <Moon />}
            <span>{!themeMode ? 'Light Mode' : 'Dark Mode'}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => userSignout()} className="text-red-500 focus:text-red-500">
            <LogOut />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
