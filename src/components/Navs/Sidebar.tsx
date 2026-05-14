import {
    LogOut,
    Sun,
    Moon,
} from 'lucide-react';
import React from 'react';
import SingleTab from './SingleTab';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { redirectPaths } from '@/shared/utils/constants';
import logo from '../../assets/logos/logo-transparent.png';
import { useSignout } from '@/hooks/systemHooks/useSignout';
import { AuthUser } from '@/shared/interface/sliceInterface';
import { toggleTheme } from '@/shared/redux/slices/appSlice';
import { AppDispatch, RootState } from '@/shared/redux/appStore';
import { SideBarProps } from '@/shared/interface/componentInterface';

const Sidebar: React.FC<SideBarProps> = ({
    routes,
    filteredRoutes
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { signoutHandler } = useSignout();

    const sidebarOpen: boolean = useSelector((store: RootState) => store.app.sidebarOpen);
    const user: Partial<AuthUser> | null = useSelector((store: RootState) => store.auth?.authUser);
    const themeMode: boolean = useSelector((store: RootState) => store.app.lightTheme);

    const handleSignout = async () => {
        const res = await signoutHandler();
        if (res.success) {
            toast.success(res.message);
            navigate(redirectPaths.LOGIN);
        } else {
            toast.error(res.message);
        }
    }

    const changeTheme = (): void => {
        dispatch(toggleTheme());
    }

    const basePath = user?.role === "ADMIN" ? "/admin" : user?.role === "PROVIDER" ? "/provider" : "/user";

    return (
        <aside className={`${sidebarOpen ? 'w-[18%]' : 'w-[5%]'} h-full shrink-0 flex flex-col border-r bg-[var(--menuBg)] transition-all duration-300 ease-in-out`}>
            <div className={`flex items-center py-6 ${sidebarOpen ? 'px-6' : 'px-0 justify-center'} transition-all duration-300`}>
                <img src={logo} className="w-8 h-8 object-contain shrink-0" alt="SlotFlow Logo" />
                {sidebarOpen && (
                    <div className='flex flex-col ml-3 overflow-hidden'>
                        <span className="text-[var(--mainColor)] text-xl font-black tracking-tight leading-none">
                            SlotFlow
                        </span>
                    </div>
                )}
            </div>

            <div className={`flex-1 overflow-y-auto no-scrollbar ${sidebarOpen ? 'px-4' : 'px-2'} pb-4`}>
                <nav className="flex flex-col gap-1 mt-2">
                    {routes.map((route) => {
                        const isProvider = user?.role === "PROVIDER";
                        const isLocked = isProvider && filteredRoutes
                            ? !filteredRoutes.some(froute => froute.name === route.name)
                            : false;
                        const fullPath = `${basePath}/${route.path}`;

                        return !isLocked ? (
                            <NavLink
                                key={fullPath}
                                to={fullPath}
                                className="block outline-none"
                            >
                                {({ isActive }) => (
                                    <SingleTab
                                        icon={route.icon}
                                        text={route.name}
                                        sidebarOpen={sidebarOpen}
                                        locked={isLocked}
                                        active={isActive}
                                    />
                                )}
                            </NavLink>
                        ) : (
                            <SingleTab
                                key={route.path}
                                icon={route.icon}
                                text={route.name}
                                sidebarOpen={sidebarOpen}
                                locked={isLocked}
                            />
                        );
                    })}
                </nav>
            </div>

            {(user?.isLoggedIn && user.role) && (
                <div className={`border-t border-black/5 dark:border-white/5 p-4 ${!sidebarOpen && 'px-2'} bg-black/[0.01] dark:bg-white/[0.01]`}>
                    <SingleTab
                        icon={!themeMode ? Sun : Moon}
                        text={!themeMode ? 'Light Mode' : 'Dark Mode'}
                        onClick={changeTheme}
                        sidebarOpen={sidebarOpen}
                    />
                    <SingleTab
                        icon={LogOut}
                        text="Logout"
                        onClick={handleSignout}
                        sidebarOpen={sidebarOpen}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400"
                    />
                </div>
            )}
        </aside>
    );
};

export default Sidebar;