import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import FullCalendar from '@fullcalendar/react';
import { useNavigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { useQuery } from '@tanstack/react-query';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CreditCard, Unplug } from "lucide-react";
import { RootState } from "@/shared/redux/appStore";
import timeGridPlugin from "@fullcalendar/timegrid";
import PageHeader from "@/components/common/PageHeader";
import FeatureLocked from "@/components/app/FeatureLocked";
import { fetchCalendarEvents } from "@/shared/apis/google";
import CalendarShimmer from '@/components/shimmers/CalendarShimmer';
import DataFetchingError from '@/components/error/DataFetchingError';

const CalendarPage: React.FC = () => {

    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const handleUpgradeSubscription = () => {
        navigate('/provider/subscriptions');
    }

    const handleMoveToSettings = () => {
        if(authUser?.role === Role.PROVIDER) {
            navigate('/provider/settings');
        } else {
            navigate('/user/settings');
        }
    }

    const canUseCalendar = useMemo(() => {
        if (!authUser) return false;
        if (authUser.role === Role.PROVIDER) {
            return ["Professional", "Enterprise"].includes(authUser.providerSubscription ?? "");
        }
        return true;
    }, [authUser]);

    const { data: calendarEvents, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const res = await fetchCalendarEvents()
            return res.data;
        },
        queryKey: ["calendarEvents"],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: Boolean(
            authUser?.googleConnected &&
            canUseCalendar
        ),
    })

    return (
        <div className="container p-4 space-y-6">
            <PageHeader
                title="Calendar"
                description="Shows your bookings and meetings."
            />
            {isLoading ? (
                <CalendarShimmer />
            ) : (isError && error) ? (
                <DataFetchingError message={error.message || "Calendar events fetching failed"} />
            ) : !canUseCalendar ? (
                <FeatureLocked
                    message="Sorry, your current subscription does not include the calendar feature."
                    buttonText="Upgrade Subscription"
                    onButtonClick={handleUpgradeSubscription}
                    icon={CreditCard}
                />
            ) : !authUser?.googleConnected ? (
                <FeatureLocked
                    message="You are not connected to Google. You can connect your account to google in settings."
                    buttonText="Settings"
                    onButtonClick={handleMoveToSettings}
                    icon={Unplug}
                />
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    events={calendarEvents}
                    height="auto"
                />
            )}
        </div>
    )
}

export default CalendarPage