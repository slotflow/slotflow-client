import React from "react";
import { Bell } from "lucide-react";
import NotificationCard from "./notificationCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { toggleNotificationContainer } from "@/utils/redux/slices/appSlice";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const NotificationsContainer: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { isNotificationsOpen } = useSelector((state: RootState) => state.app);

    return (
        <Sheet open={isNotificationsOpen} onOpenChange={() => dispatch(toggleNotificationContainer())}>
            <SheetContent className="w-[320px] sm:w-[400px] bg-[var(--menuBg)] border-l flex flex-col p-6 shadow-2xl">
                <SheetHeader className="mb-4">
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                        <Bell className="w-5 h-5 text-[var(--mainColor)]" />
                        Notifications
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto overflow-x-hidden w-full pr-2 space-y-3 no-scrollbar">
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default NotificationsContainer;