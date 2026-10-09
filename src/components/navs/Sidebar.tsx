import { Input } from '../ui/input';
import SingleTab from './SingleTab';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { AuthUser } from '@/shared/types/slice';
import { RootState } from '@/app/store/appStore';
import { useState, useEffect, useMemo } from 'react';
import { SidebarDropDown } from './SidebarDropDown';
import { SideBarProps } from '@/shared/types/component';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/company/slotflowLogoTransparent.png';

const Sidebar = ({ routes, filteredRoutes }: SideBarProps) => {
  const location = useLocation();
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const isSidebarOpen: boolean = useSelector((store: RootState) => store.app.isSidebarOpen);

  const user: Partial<AuthUser> | null = useSelector((store: RootState) => store.auth?.authUser);

  const searchedRoutes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return routes;
    }

    return routes
      .map((route) => {
        const routeMatches = route.name.toLowerCase().includes(query);

        const matchingSubroutes = route.subroutes?.filter((subRoute) =>
          subRoute.name.toLowerCase().includes(query),
        );

        if (routeMatches) {
          return route;
        }

        if (matchingSubroutes && matchingSubroutes.length > 0) {
          return {
            ...route,
            subroutes: matchingSubroutes,
          };
        }

        return null;
      })
      .filter((route): route is (typeof routes)[number] => route !== null);
  }, [routes, searchQuery]);

  useEffect(() => {
    routes.forEach((route) => {
      if (route.subroutes && route.subroutes.length > 0) {
        const fullParentPath = `/${route.path}`;

        const hasActiveSubroute = route.subroutes.some(
          (sub) => location.pathname === `${fullParentPath}/${sub.path}`,
        );

        if (hasActiveSubroute) {
          setExpandedRoutes((prev) => (prev.includes(route.path) ? prev : [...prev, route.path]));
        }
      }
    });
  }, [location.pathname, routes]);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();

    const routesToExpand = routes
      .filter((route) =>
        route.subroutes?.some((subRoute) => subRoute.name.toLowerCase().includes(query)),
      )
      .map((route) => route.path);

    setExpandedRoutes((prev) => [...new Set([...prev, ...routesToExpand])]);
  }, [searchQuery, routes]);

  const toggleRoute = (path: string) => {
    setExpandedRoutes((prev) =>
      prev.includes(path) ? prev.filter((item) => item !== path) : [...prev, path],
    );
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-[15%]' : 'w-[5%]'
      } h-full shrink-0 flex flex-col border-r bg-[var(--background)] transition-all duration-300 ease-in-out`}
    >
      <div
        className={`flex items-center px-4 md:px-6 py-4 ${
          isSidebarOpen ? 'px-6' : 'px-0 justify-center'
        } transition-all duration-300`}
      >
        <img src={logo} className="size-6 object-contain shrink-0" alt="SlotFlow Logo" />

        {isSidebarOpen && (
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-[var(--mainColor)] text-xl md:text-2xl font-black tracking-tight leading-none">
              SlotFlow
            </span>
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <div className="px-3 mb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />

            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu..."
              className="h-9 pl-9 pr-3"
            />
          </div>
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto no-scrollbar ${isSidebarOpen ? 'px-4' : 'px-2'} pb-4`}
      >
        <nav className="flex flex-col mt-2">
          {searchedRoutes.map((route) => {
            const isProvider = user?.role === Role.PROVIDER;

            const isLocked =
              isProvider && filteredRoutes
                ? !filteredRoutes.some((froute) => froute.name === route.name)
                : false;

            const fullPath = `/${route.path}`;
            const subRoutes = route.subroutes ?? [];
            const hasSubroutes = subRoutes.length > 0;
            const isExpanded = expandedRoutes.includes(route.path);

            const isDirectlyActive = location.pathname === fullPath;

            const isSubrouteActive = hasSubroutes
              ? subRoutes.some((sub) => location.pathname === `${fullPath}/${sub.path}`)
              : false;

            const isParentActive = isDirectlyActive || isSubrouteActive;

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
                    active={isParentActive}
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

          {isSidebarOpen && searchQuery.trim() && searchedRoutes.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              No menu items found
            </div>
          )}
        </nav>
      </div>

      <SidebarDropDown isSidebarOpen={isSidebarOpen} />
    </aside>
  );
};

export default Sidebar;
