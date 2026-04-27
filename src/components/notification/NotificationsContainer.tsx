import React from "react";
import { Bell, Loader2 } from "lucide-react";
import NotificationCard from "./NotificationCard";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import DataFetchingError from "../error/DataFetchingError";
import { fetchNotifications } from "@/shared/apis/notification";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import NotificationCardShimmer from "../shimmers/NotificationCardShimmer";
import { toggleNotificationContainer } from "@/shared/redux/slices/appSlice";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const NotificationsContainer: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { isNotificationsOpen } = useSelector((state: RootState) => state.app);

    const {
        data: notificationsData,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["notifications"],
        queryFn: ({ pageParam = 1 }) => fetchNotifications({ page: pageParam, limit: 10 }),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage && lastPage.totalPages && lastPage.currentPage < lastPage.totalPages) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: isNotificationsOpen,
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    const notifications = notificationsData?.pages.flatMap((page) => page.data || []) || [];

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    };

    return (
        <Sheet open={isNotificationsOpen} onOpenChange={() => dispatch(toggleNotificationContainer())}>
            <SheetContent className="w-[320px] sm:w-[400px] bg-[var(--menuBg)] border-l flex flex-col p-6 shadow-2xl">
                <SheetHeader className="mb-4">
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                        <Bell className="w-5 h-5 text-[var(--mainColor)]" />
                        Notifications
                    </SheetTitle>
                </SheetHeader>

                <div
                    className="flex-1 overflow-y-auto w-full pr-2 space-y-3 no-scrollbar pb-6 custom-scrollbar"
                    onScroll={handleScroll}
                >
                    {isLoading ? (
                        <NotificationCardShimmer />
                    ) : isError ? (
                        <DataFetchingError message={error?.message || "Failed to fetch notifications"} />
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
                            <Bell className="w-12 h-12 mb-3 text-gray-400 stroke-[1.5]" />
                            <p className="font-medium">No notifications yet</p>
                            <p className="text-xs mt-1">When you get updates, they will appear here</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <NotificationCard
                                key={notification._id}
                                title={notification.title}
                                body={notification.body}
                                isRead={notification.isRead}
                                createdAt={notification.createdAt}
                            />
                        ))
                    )}

                    {isFetchingNextPage && (
                        <div className="flex justify-center py-4">
                            <Loader2 className="w-6 h-6 animate-spin text-gray-400 opacity-70" />
                        </div>
                    )}

                    {!hasNextPage && notifications.length > 0 && (
                        <div className="text-center font-medium mt-6 text-[10px] uppercase tracking-wider text-gray-400 py-4 border-t border-black/5 dark:border-white/5">
                            You've reached the end
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default NotificationsContainer;