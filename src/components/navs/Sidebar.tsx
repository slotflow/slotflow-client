import SingleTab from './SingleTab';
import { useSelector } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { useState, useEffect } from 'react';
import { AuthUser } from '@/shared/types/slice';
import { RootState } from '@/app/store/appStore';
import { SidebarDropDown } from './SidebarDropDown';
import { SideBarProps } from '@/shared/types/component';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/company/slotflowLogoTransparent.png';

const Sidebar = ({ routes, filteredRoutes }: SideBarProps) => {
  const location = useLocation();
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);

  const isSidebarOpen: boolean = useSelector((store: RootState) => store.app.isSidebarOpen);
  const user: Partial<AuthUser> | null = useSelector((store: RootState) => store.auth?.authUser);

  const basePath =
    user?.role === 'ADMIN' ? '/admin' : user?.role === 'PROVIDER' ? '/provider' : '/user';

  // Automatically expand parent routes when navigating to a child subroute
  useEffect(() => {
    routes.forEach((route) => {
      if (route.subroutes && route.subroutes.length > 0) {
        const fullParentPath = `${basePath}/${route.path}`;
        const hasActiveSubroute = route.subroutes.some(
          (sub) => location.pathname === `${fullParentPath}/${sub.path}`,
        );

        if (hasActiveSubroute) {
          setExpandedRoutes((prev) => (prev.includes(route.path) ? prev : [...prev, route.path]));
        }
      }
    });
  }, [location.pathname, routes, basePath]);

  const toggleRoute = (path: string) => {
    setExpandedRoutes((prev) =>
      prev.includes(path) ? prev.filter((item) => item !== path) : [...prev, path],
    );
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-[18%]' : 'w-[5%]'
      } h-full shrink-0 flex flex-col border-r bg-[var(--background)] transition-all duration-300 ease-in-out`}
    >
      <div
        className={`flex items-center py-6 ${
          isSidebarOpen ? 'px-6' : 'px-0 justify-center'
        } transition-all duration-300`}
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

            // Check active states for parent and subroutes
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

                {/* Subroutes only render when sidebar is open and expanded */}
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

      <SidebarDropDown isSidebarOpen={isSidebarOpen} basePath={basePath} />
    </aside>
  );
};

export default Sidebar;
