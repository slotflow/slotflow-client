import { useMemo } from 'react';
import { Unplug } from 'lucide-react';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/app/store/appStore';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { fetchCalendarEvents } from '@/services/apis/google';
import FeatureOverlay from '@/components/app/FeatureOverlay';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import CalendarShimmer from '@/components/shimmers/CalendarShimmer';
import DataFetchingError from '@/components/error/DataFetchingError';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { PlanName, Role, SubscriptionStatus } from '@/shared/types/enums';

const CalendarView = () => {

  const { goTo } = useAppNavigation();
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
        <FeatureOverlay
          size="lg"
          borderRadius="rounded-2xl"
          title="Connect Google Calendar in Integrations Settings to continue."
          description="Schedule appointments directly within your custom dashboard view."
          showButton={true}
          buttonText="Settings"
          onButtonClick={() => goTo(redirectPaths.INTEGRATIONS)}
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
