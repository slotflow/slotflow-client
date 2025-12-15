import dayjs from 'dayjs';
import { Button } from '../ui/button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../assets/defaultImages/avatar.png';
import { Circle, CircleOff, PanelLeft } from 'lucide-react';
import { toggleSidebar } from '@/utils/redux/slices/appSlice';
import { AppDispatch, RootState } from '@/utils/redux/appStore';

interface InfoHeaderProps {
    profileImage?: string;
    username: string;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({
    profileImage,
    username
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const formatted = dayjs().format('DD MM dddd hh:mm A');
    const { profileImageUpdating } = useSelector((state: RootState) => state.auth);

    const [isOnline, setIsOnline] = useState(true)
    useEffect(() => {
        window.addEventListener("offline", () => {
            setIsOnline(false);
        })

        window.addEventListener("online", () => {
            setIsOnline(true);
        })
    }, []);

    const handleSidebar = (): void => {
        dispatch(toggleSidebar());
    }
    return (
        <nav className={` bg-[var(--menuBg)] m-4 p-2 rounded-md mt-2 flex items-center`}>

            <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={handleSidebar}
            >
                <PanelLeft />
            </Button>

            <div className='flex ml-3'>
                {profileImageUpdating ? (
                    <div className="rounded-full size-6 shimmer"></div>
                ) : (
                    <img
                    src={profileImage || avatar}
                    className='size-6 rounded-full'
                    />
                )}
                <h4 className='italic ml-2'>Hi, {username}</h4>
            </div>

            <div className='flex space-x-2 items-center ml-auto'>
                <h4 className='text-sm'>{formatted}</h4>
                <div className='flex' title={isOnline ? "Online" : "Offline"} >
                    {isOnline ? (
                        <Circle className="size-4 text-green-500 fill-green-500" />
                    ) : (
                        <CircleOff className="size-4 text-red-500 fill-red-500" />
                    )}
                </div>
            </div>
        </nav>
    )
}

export default InfoHeader