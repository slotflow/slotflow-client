import dayjs from 'dayjs';
import { Button } from '../ui/button';
import { Bell, PanelLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../assets/defaultImages/avatar.png';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { toggleNotificationContainer, toggleSidebar } from '@/utils/redux/slices/appSlice';

interface InfoHeaderProps {
    profileImage?: string;
    username: string;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({
    profileImage,
    username
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const { profileImageUpdating } = useSelector((state: RootState) => state.auth);

    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        const handleOffline = () => setIsOnline(false);
        const handleOnline = () => setIsOnline(true);

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        }
    }, []);

    const handleSidebar = (): void => {
        dispatch(toggleSidebar());
    }

    return (
        <nav className="m-4 mt-2 px-4 md:px-6 py-3 flex items-center justify-between rounded-2xl bg-[var(--menuBg)]/80 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-200/20 dark:border-white/5 transition-all duration-300">
            <div className="flex items-center gap-2 md:gap-4">
                <Button
                    title="Toggle Sidebar"
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
                                className="size-9 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
                            />
                        )}
                        <div className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[var(--menuBg)] ${isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'}`} title={isOnline ? "Online" : "Offline"}></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest hidden sm:block">Welcome Back</span>
                        <h4 className="text-sm font-medium tracking-wide">Hi, {username}</h4>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5">
                <div className="hidden lg:flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">{dayjs().format('dddd')}</span>
                    <h4 className="text-sm font-medium opacity-90 tracking-wide">{dayjs().format('DD MMM YYYY, hh:mm A')}</h4>
                </div>

                <div className="w-px h-6 bg-gray-400/20 hidden lg:block"></div>

                <Button
                    title="notifications"
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => dispatch(toggleNotificationContainer())}
                >
                    <Bell className="w-5 h-5 opacity-80" />
                    <span className="absolute top-2.5 right-2.5 size-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(59,130,246,0.8)] border border-[var(--menuBg)]"></span>
                </Button>
            </div>
        </nav>
    );
}

export default InfoHeader