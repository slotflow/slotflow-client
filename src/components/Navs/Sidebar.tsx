import {
    LogOut,
    Sun,
    Moon,
} from 'lucide-react';
import React from 'react';
import { SingleTab } from './SingleTab';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logos/logo-transparent.png';
import { UserData } from '@/utils/interface/sliceInterface';
import { toggleTheme } from '@/utils/redux/slices/appSlice';
import { handleSignoutHelper } from '@/utils/helper/signout';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { SideBarProps } from '@/utils/interface/commonInterface';
import { useResetRedux } from '@/utils/hooks/systemHooks/useResetRedux';

const Sidebar: React.FC<SideBarProps> = ({
    routes,
    filteredRoutes
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const resetRedux = useResetRedux();

    const sidebarOpen: boolean = useSelector((store: RootState) => store.app.sidebarOpen);
    const user: Partial<UserData> | null = useSelector((store: RootState) => store.auth?.authUser);
    const themeMode: boolean = useSelector((store: RootState) => store.app.lightTheme);

    const changeTheme = (): void => {
        dispatch(toggleTheme());
    }

    const basePath = user?.role === "ADMIN" ? "/admin" : user?.role === "PROVIDER" ? "/provider" : "/user";

    return (
        <div className={` ${sidebarOpen ? 'w-[18%]' : 'w-[5%]'} overflow-y-scroll no-scrollbar border-r transition-all duration-600 flex flex-col bg-[var(--menuBg)]`} >
            <div className="p-4 flex-1">
                <ul>

                    <li className="px-3 pb-4 flex items-center justify-start">
                        <div className="flex items-center">
                            <img src={logo} className="size-8" alt="SlotFlow Logo" />
                            {sidebarOpen && (
                                <div className='flex flex-col ml-2'>
                                    <span className="text-[var(--mainColor)] text-lg font-bold italic cursor-pointer">
                                        SlotFlow
                                    </span>
                                    <span className='truncate text-sm text-gray-500'>
                                        Dashboard
                                    </span>
                                </div>
                            )}
                        </div>
                    </li>

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
                                className="block"
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


                </ul>
            </div>

            {(user?.isLoggedIn && user.role) && (
                <ul className='p-4'>
                    <SingleTab
                        icon={!themeMode ? Sun : Moon}
                        text={!themeMode ? 'Light' : 'Dark'}
                        onClick={changeTheme}
                        sidebarOpen={sidebarOpen}
                    />
                    <SingleTab
                        icon={LogOut}
                        text="Logout"
                        onClick={() => handleSignoutHelper({ role: user?.role!, dispatch, resetRedux, navigate })}
                        sidebarOpen={sidebarOpen}
                    />
                </ul>
            )}

        </div>
    );
};

export default Sidebar;