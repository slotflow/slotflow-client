import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import FullCalendar from '@fullcalendar/react';
import { useNavigate } from "react-router-dom";
import { Role } from "@/utils/interface/enums";
import { useQuery } from '@tanstack/react-query';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CreditCard, Unplug } from "lucide-react";
import { RootState } from "@/utils/redux/appStore";
import timeGridPlugin from "@fullcalendar/timegrid";
import FeatureLocked from "@/components/app/FeatureLocked";
import { fetchCalendarEvents } from "@/utils/apis/google";
import CalendarShimmer from '@/components/shimmers/CalendarShimmer';
import DataFetchingError from '@/components/error/DataFetchingError';

const CalendarPage: React.FC = () => {

    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const handleUpgradeSubscription = () => {
        navigate('/provider/subscriptions');
    }

    const handleMoveToSettings = () => {
        navigate('/provider/settings');
    }

    const canUseCalendar = useMemo(() => {
        if (!authUser) return false;
        if (authUser.role === Role.PROVIDER) {
            return ["Professional", "Enterprise"].includes(authUser.providerSubscription ?? "");
        }
        return true;
    }, [authUser]);

    const { data: calendarEvents, isLoading, isError, error } = useQuery({
        queryFn: fetchCalendarEvents,
        queryKey: ["calendarEvents"],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: Boolean(
            authUser &&
            canUseCalendar &&
            (authUser.role === Role.USER || authUser.googleConnected)
        ),
    })

    if (isLoading) return <CalendarShimmer />;
    if (isError && error) {
        return (
            <DataFetchingError message={error.message || "Calendar events fetching failed"} />
        )
    }

    if (!canUseCalendar) {
        return (
            <div className="p-4 h-full">
                <FeatureLocked
                    message="Sorry, your current subscription does not include the calendar feature."
                    buttonText="Upgrade Subscription"
                    buttonVariant="outline"
                    onButtonClick={handleUpgradeSubscription}
                    icon={CreditCard}
                />
            </div>
        )
    };

    if (!authUser?.googleConnected) {
        return (
            <FeatureLocked
                message="You are not connected to Google. You can connect your account to google in settings."
                buttonText="Settings"
                buttonVariant="outline"
                onButtonClick={handleMoveToSettings}
                icon={Unplug}
            />
        )
    }

    return (
        <div className="p-4 h-full">
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
        </div>
    )
}

export default CalendarPage