import { useState } from 'react';
import SingleTab from './SingleTab';
import { toast } from 'react-toastify';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Role } from '@/shared/types/enums';
import { AuthUser } from '@/shared/types/slice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { SideBarProps } from '@/shared/types/component';
import { redirectPaths } from '@/shared/utils/constants';
import { toggleTheme } from '@/app/store/slices/appSlice';
import { useSignout } from '@/hooks/systemHooks/useSignout';
import { AppDispatch, RootState } from '@/app/store/appStore';
import logo from '../../assets/logos/company/slotflowLogoTransparent.png';
import { LogOut, Sun, Moon, Settings, Bell, CreditCard } from 'lucide-react';

const Sidebar = ({ routes, filteredRoutes }: SideBarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { signoutHandler } = useSignout();
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);

  const themeMode: boolean = useSelector((store: RootState) => store.app.lightTheme);
  const isSidebarOpen: boolean = useSelector((store: RootState) => store.app.isSidebarOpen);
  const user: Partial<AuthUser> | null = useSelector((store: RootState) => store.auth?.authUser);

  const handleSignout = async () => {
    const res = await signoutHandler();
    if (res.success) {
      toast.success(res.message);
      navigate(redirectPaths.LOGIN);
    } else {
      toast.error(res.message);
    }
  };

  const changeTheme = (): void => {
    dispatch(toggleTheme());
  };

  const toggleRoute = (path: string) => {
    setExpandedRoutes((prev) =>
      prev.includes(path) ? prev.filter((item) => item !== path) : [...prev, path],
    );
  };

  const basePath =
    user?.role === 'ADMIN' ? '/admin' : user?.role === 'PROVIDER' ? '/provider' : '/user';

  return (
    <aside
      className={`${isSidebarOpen ? 'w-[18%]' : 'w-[5%]'} h-full shrink-0 flex flex-col border-r bg-[var(--background)] transition-all duration-300 ease-in-out`}
    >
      <div
        className={`flex items-center py-6 ${isSidebarOpen ? 'px-6' : 'px-0 justify-center'} transition-all duration-300`}
      >
        <img src={logo} className="w-8 h-8 object-contain shrink-0" alt="SlotFlow Logo" />
        {isSidebarOpen && (
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-[var(--mainColor)] text-xl md:text-2xl font-black tracking-tight leading-none">
              SlotFlow
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex-1 overflow-y-auto no-scrollbar ${isSidebarOpen ? 'px-4' : 'px-2'} pb-4`}
      >
        <nav className="flex flex-col mt-2">
          {routes.map((route) => {
            const isProvider = user?.role === Role.PROVIDER;

            const isLocked =
              isProvider && filteredRoutes
                ? !filteredRoutes.some((froute) => froute.name === route.name)
                : false;

            const fullPath = `${basePath}/${route.path}`;

            const subRoutes = route.subroutes ?? [];

            const hasSubroutes = subRoutes.length > 0;

            const isExpanded = expandedRoutes.includes(route.path);

            return (
              <div key={fullPath}>
                {hasSubroutes ? (
                  <SingleTab
                    icon={route.icon}
                    text={route.name}
                    isSidebarOpen={isSidebarOpen}
                    locked={isLocked}
                    hasSubroutes
                    expanded={isExpanded}
                    onClick={() => toggleRoute(route.path)}
                  />
                ) : !isLocked ? (
                  <NavLink to={fullPath} className="block outline-none">
                    {({ isActive }) => (
                      <SingleTab
                        icon={route.icon}
                        text={route.name}
                        isSidebarOpen={isSidebarOpen}
                        locked={false}
                        active={isActive}
                      />
                    )}
                  </NavLink>
                ) : (
                  <SingleTab
                    icon={route.icon}
                    text={route.name}
                    isSidebarOpen={isSidebarOpen}
                    locked
                  />
                )}

                {hasSubroutes && isExpanded && isSidebarOpen && (
                  <div className="border-l border-border pl-2">
                    {subRoutes.map((subRoute) => {
                      const subPath = `${fullPath}/${subRoute.path}`;

                      return (
                        <NavLink key={subPath} to={subPath} className="block outline-none">
                          {({ isActive }) => (
                            <SingleTab
                              icon={subRoute.icon}
                              text={subRoute.name}
                              isSidebarOpen={isSidebarOpen}
                              active={isActive}
                              className="my-0.5"
                            />
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {user?.isLoggedIn && user.role && (
        <div className={`p-4 ${!isSidebarOpen && 'px-2'}`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[var(--sidebar-accent)]"
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

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{user.username}</p>

                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>

                <Settings className="size-4 shrink-0 text-muted-foreground" />
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

              <DropdownMenuItem onClick={() => navigate(`${basePath}/profile`)}>
                <CreditCard />
                <span>Account</span>
              </DropdownMenuItem>

              {user.role === Role.PROVIDER && (
                <DropdownMenuItem onClick={() => navigate('/provider/subscriptions')}>
                  <CreditCard />
                  <span>Upgrade to Pro</span>
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

              <DropdownMenuItem onClick={handleSignout} className="text-red-500 focus:text-red-500">
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
