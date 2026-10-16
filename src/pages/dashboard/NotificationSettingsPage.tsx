import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import DataFetchingError from '@/components/error/DataFetchingError';
import { NotificationChannel, NotificationType } from '@/shared/types/enums';
import NotificationSettingsItem from '../../components/notification/NotificationSettingsItem';
import {
  fetchMyNotificationPreference,
  handleNotificationChange,
} from '@/services/apis/notification';

const NotificationSettingsPage = () => {
  const handleNotificationToggle = async (
    channel: NotificationChannel,
    type: NotificationType,
    enabled: boolean,
  ) => {
    try {
      await handleNotificationChange({
        channel,
        type,
        enabled,
      });
    } catch (error) {
      console.error('Failed to update notification preference:', error);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKeys.NOTIFICATION_PREF],
    queryFn: fetchMyNotificationPreference,
  });

  if (isError && error) {
    return (
      <DataFetchingError message={error.message || 'Notification preference fetching error'} />
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-2">
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Email Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Choose which notifications you want to receive by email.
          </p>
        </div>
        <NotificationSettingsItem
          title="Account activity"
          description="Receive emails regarding appointments, payments, password changes, and security updates."
          channel={NotificationChannel.EMAIL}
          type={NotificationType.ACCOUNT_ACTIVITY}
          checked={data?.accountActivity.email ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="System updates"
          description="Important platform maintenance, policy updates, and service disruptions."
          channel={NotificationChannel.EMAIL}
          type={NotificationType.SYSTEM_UPDATES}
          checked={data?.systemUpdates.email ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="Promotional updates"
          description="Receive news about new features, product announcements, and special offers."
          channel={NotificationChannel.EMAIL}
          type={NotificationType.PROMOTIONAL_UPDATES}
          checked={data?.promotionalUpdates.email ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Push Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Manage notifications sent directly to your mobile or web browser.
          </p>
        </div>
        <NotificationSettingsItem
          title="Account activity"
          description="Get instant alerts for appointment updates, payment confirmations, and account activity."
          channel={NotificationChannel.PUSH}
          type={NotificationType.ACCOUNT_ACTIVITY}
          checked={data?.accountActivity.push ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="System updates"
          description="Real-time alerts for system outages or maintenance schedules."
          channel={NotificationChannel.PUSH}
          type={NotificationType.SYSTEM_UPDATES}
          checked={data?.systemUpdates.push ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="Promotional updates"
          description="Get push notifications for feature launches and special updates."
          channel={NotificationChannel.PUSH}
          type={NotificationType.PROMOTIONAL_UPDATES}
          checked={data?.promotionalUpdates.push ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">In-app notifications</h2>
          <p className="text-sm text-muted-foreground">
            Choose which notifications appear inside SlotFlow.
          </p>
        </div>
        <NotificationSettingsItem
          title="Account activity"
          description="Show updates about bookings, cancellations, payments, and account actions inside the app."
          channel={NotificationChannel.IN_APP}
          type={NotificationType.ACCOUNT_ACTIVITY}
          checked={data?.accountActivity.inapp ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="System updates"
          description="Show important updates about SlotFlow platform performance."
          channel={NotificationChannel.IN_APP}
          type={NotificationType.SYSTEM_UPDATES}
          checked={data?.systemUpdates.inapp ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="Promotional updates"
          description="Show product announcements, new features, and special offers in-app."
          channel={NotificationChannel.IN_APP}
          type={NotificationType.PROMOTIONAL_UPDATES}
          checked={data?.promotionalUpdates.inapp ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">SMS notifications</h2>
          <p className="text-sm text-muted-foreground">
            Choose which notifications appear inside SlotFlow.
          </p>
        </div>
        <NotificationSettingsItem
          title="Account activity"
          description="Show updates about bookings, cancellations, payments, and account actions inside the app."
          channel={NotificationChannel.IN_APP}
          type={NotificationType.ACCOUNT_ACTIVITY}
          checked={data?.accountActivity.sms ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="System updates"
          description="Show important updates about SlotFlow platform performance."
          channel={NotificationChannel.IN_APP}
          type={NotificationType.SYSTEM_UPDATES}
          checked={data?.systemUpdates.sms ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="Promotional updates"
          description="Show product announcements, new features, and special offers in-app."
          channel={NotificationChannel.IN_APP}
          type={NotificationType.PROMOTIONAL_UPDATES}
          checked={data?.promotionalUpdates.sms ?? false}
          isLoading={isLoading}
          onChange={handleNotificationToggle}
        />
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
