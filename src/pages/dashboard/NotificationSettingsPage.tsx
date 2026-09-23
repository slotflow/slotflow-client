import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { handleNotificationChange } from '@/services/apis/notification';
import { NotificationType, NotificationChannel } from '@/shared/types/common';
import NotificationSettingsItem from '../../components/notification/NotificationSettingsItem';
import { notificationChannel, notificationType } from '@/shared/utils/constants';

const NotificationSettingsPage = () => {
  
  const preferences = useSelector((state: RootState) => state.notification.preferences);

  const getNotificationPreference = (
    channel: NotificationChannel,
    type: NotificationType,
  ): boolean => {
    return preferences.find((item) => item.channel === channel)?.preferences[type] ?? false;
  };

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

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-2">
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Email Notifications
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose which notifications you want to receive by email.
          </p>
        </div>
        <NotificationSettingsItem
          title="Account activity"
          description="Receive emails regarding appointments, payments, password changes, and security updates."
          channel={notificationChannel.EMAIL}
          type={notificationType.ACCOUNT_ACTIVITY}
          checked={getNotificationPreference(
            notificationChannel.EMAIL,
            notificationType.ACCOUNT_ACTIVITY,
          )}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="System updates"
          description="Important platform maintenance, policy updates, and service disruptions."
          channel={notificationChannel.EMAIL}
          type={notificationType.SYSTEM_UPDATES}
          checked={getNotificationPreference(
            notificationChannel.EMAIL,
            notificationType.SYSTEM_UPDATES,
          )}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="Promotional updates"
          description="Receive news about new features, product announcements, and special offers."
          channel={notificationChannel.EMAIL}
          type={notificationType.PROMOTIONAL_UPDATES}
          checked={getNotificationPreference(
            notificationChannel.EMAIL,
            notificationType.PROMOTIONAL_UPDATES,
          )}
          onChange={handleNotificationToggle}
        />
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Push Notifications
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage notifications sent directly to your mobile or web browser.
          </p>
        </div>
        <NotificationSettingsItem
          title="Account activity"
          description="Get instant alerts for appointment updates, payment confirmations, and account activity."
          channel={notificationChannel.PUSH}
          type={notificationType.ACCOUNT_ACTIVITY}
          checked={getNotificationPreference(
            notificationChannel.PUSH,
            notificationType.ACCOUNT_ACTIVITY,
          )}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="System updates"
          description="Real-time alerts for system outages or maintenance schedules."
          channel={notificationChannel.PUSH}
          type={notificationType.SYSTEM_UPDATES}
          checked={getNotificationPreference(
            notificationChannel.PUSH,
            notificationType.SYSTEM_UPDATES,
          )}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="Promotional updates"
          description="Get push notifications for feature launches and special updates."
          channel={notificationChannel.PUSH}
          type={notificationType.PROMOTIONAL_UPDATES}
          checked={getNotificationPreference(
            notificationChannel.PUSH,
            notificationType.PROMOTIONAL_UPDATES,
          )}
          onChange={handleNotificationToggle}
        />
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            In-app notifications
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose which notifications appear inside SlotFlow.
          </p>
        </div>
        <NotificationSettingsItem
          title="Account activity"
          description="Show updates about bookings, cancellations, payments, and account actions inside the app."
          channel={notificationChannel.IN_APP}
          type={notificationType.ACCOUNT_ACTIVITY}
          checked={getNotificationPreference(
            notificationChannel.IN_APP,
            notificationType.ACCOUNT_ACTIVITY,
          )}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="System updates"
          description="Show important updates about SlotFlow platform performance."
          channel={notificationChannel.IN_APP}
          type={notificationType.SYSTEM_UPDATES}
          checked={getNotificationPreference(
            notificationChannel.IN_APP,
            notificationType.SYSTEM_UPDATES,
          )}
          onChange={handleNotificationToggle}
        />

        <NotificationSettingsItem
          title="Promotional updates"
          description="Show product announcements, new features, and special offers in-app."
          channel={notificationChannel.IN_APP}
          type={notificationType.PROMOTIONAL_UPDATES}
          checked={getNotificationPreference(
            notificationChannel.IN_APP,
            notificationType.PROMOTIONAL_UPDATES,
          )}
          onChange={handleNotificationToggle}
        />
      </div>
    </div>
  );
};

export default NotificationSettingsPage;