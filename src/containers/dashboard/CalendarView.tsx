import { useMemo } from 'react';
import { Unplug } from 'lucide-react';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/app/store/appStore';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { queryKeys } from '@/shared/utils/constants';
import FeatureLocked from '@/components/app/FeatureLocked';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { fetchCalendarEvents } from '@/services/apis/google';
import CalendarShimmer from '@/components/shimmers/CalendarShimmer';
import DataFetchingError from '@/components/error/DataFetchingError';
import { PlanName, Role, SubscriptionStatus } from '@/shared/types/enums';

const CalendarView = () => {

  const { toIntegrations } = useAppNavigation();
  const { googleCalendar } = useSelector((state: RootState) => state.integration);
  const { authUser } = useSelector((state: RootState) => state.auth);

  const canUseCalendar = useMemo(() => {
    let subscription: PlanName = PlanName.NO_SUBSCRIPTION;
    if (authUser && authUser.subscriptionStatus === SubscriptionStatus.ACTIVE && authUser.providerSubscription) {
      subscription = authUser.providerSubscription;
    }
    if (authUser?.role === Role.PROVIDER) {
      return [PlanName.TRIAL, PlanName.STARTER, PlanName.PROFESSIONAL, PlanName.ENTERPRISE].includes(subscription);
    }
    return true;
  }, [authUser]);

  const {
    data: calendarEvents,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await fetchCalendarEvents();
      return res.data;
    },
    queryKey: [queryKeys.CALENDAR_EVENTS],
    enabled: Boolean(googleCalendar?.isConnected && canUseCalendar),
  });

  return (
    <div className="space-y-6 h-full">
      {isLoading ? (
        <CalendarShimmer />
      ) : isError && error ? (
        <DataFetchingError message={error.message || 'Calendar events fetching failed'} />
      ) : !googleCalendar?.isConnected ? (
        <FeatureLocked
          message="Connect Google Calendar in Integrations Settings to continue."
          buttonText="Integrations"
          onButtonClick={() => toIntegrations(false)}
          icon={Unplug}
        />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={calendarEvents}
          height="auto"
        />
      )}
    </div>
  );
};

export default CalendarView;
