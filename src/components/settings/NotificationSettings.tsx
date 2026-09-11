import { useSelector } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { RootState } from '@/app/store/appStore';
import { handleNotificationChange } from '@/services/apis/notification';
import { NotificationType, NotificationChannel } from '@/shared/types/common';
import NotificationSettingsItem from '../notification/NotificationSettingsItem';
import { notificationChannel, notificationType } from '@/shared/utils/constants';
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '../ui/card';

const NotificationSettings = () => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);

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
    <div className="max-w-5xl mx-auto space-y-6">
      <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Email notifications</CardTitle>
          <CardDescription>
            Choose which notifications you want to receive by email.
          </CardDescription>
        </CardHeader>

        <CardContent className="divide-y">
          <NotificationSettingsItem
            title="Appointment updates"
            description="Receive emails when an appointment is booked, rescheduled, cancelled, or completed."
            channel={notificationChannel.EMAIL}
            type={notificationType.APPOINTMENT_UPDATES}
            checked={getNotificationPreference(
              notificationChannel.EMAIL,
              notificationType.APPOINTMENT_UPDATES,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Appointment reminders"
            description="Receive reminders about upcoming appointments."
            channel={notificationChannel.EMAIL}
            type={notificationType.APPOINTMENT_REMINDERS}
            checked={getNotificationPreference(
              notificationChannel.EMAIL,
              notificationType.APPOINTMENT_REMINDERS,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Payment notifications"
            description="Get notified about payments, refunds, and payment-related activity."
            channel={notificationChannel.EMAIL}
            type={notificationType.PAYMENT_NOTIFICATIONS}
            checked={getNotificationPreference(
              notificationChannel.EMAIL,
              notificationType.PAYMENT_NOTIFICATIONS,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Account activity"
            description="Receive important updates about your account and security."
            channel={notificationChannel.EMAIL}
            type={notificationType.ACCOUNT_ACTIVITY}
            checked={getNotificationPreference(
              notificationChannel.EMAIL,
              notificationType.ACCOUNT_ACTIVITY,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Promotional updates"
            description="Show product announcements, new features, and special offers."
            channel={notificationChannel.EMAIL}
            type={notificationType.PROMOTIONAL_UPDATES}
            checked={getNotificationPreference(
              notificationChannel.EMAIL,
              notificationType.PROMOTIONAL_UPDATES,
            )}
            onChange={handleNotificationToggle}
          />
        </CardContent>
      </Card>
      <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Push notifications</CardTitle>

          <CardDescription>Manage notifications sent directly to your device.</CardDescription>
        </CardHeader>

        <CardContent className="divide-y">
          {authUser?.role === Role.PROVIDER && (
            <NotificationSettingsItem
              title="New appointments"
              description="Get notified instantly when a new appointment is booked."
              channel={notificationChannel.PUSH}
              type={notificationType.NEW_APPOINTMENTS}
              checked={getNotificationPreference(
                notificationChannel.PUSH,
                notificationType.NEW_APPOINTMENTS,
              )}
              onChange={handleNotificationToggle}
            />
          )}

          <NotificationSettingsItem
            title="Appointment reminders"
            description="Receive reminders before an upcoming appointment."
            channel={notificationChannel.PUSH}
            type={notificationType.APPOINTMENT_REMINDERS}
            checked={getNotificationPreference(
              notificationChannel.PUSH,
              notificationType.APPOINTMENT_REMINDERS,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Appointment changes"
            description="Get notified when an appointment is rescheduled or cancelled."
            channel={notificationChannel.PUSH}
            type={notificationType.APPOINTMENT_CHANGES}
            checked={getNotificationPreference(
              notificationChannel.PUSH,
              notificationType.APPOINTMENT_CHANGES,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Payment activity"
            description="Receive alerts for successful payments, refunds, and failures."
            channel={notificationChannel.PUSH}
            type={notificationType.PAYMENT_ACTIVITY}
            checked={getNotificationPreference(
              notificationChannel.PUSH,
              notificationType.PAYMENT_ACTIVITY,
            )}
            onChange={handleNotificationToggle}
          />
        </CardContent>
      </Card>
      <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">In-app notifications</CardTitle>
          <CardDescription>Choose which notifications appear inside SlotFlow.</CardDescription>
        </CardHeader>

        <CardContent>
          <NotificationSettingsItem
            title="Appointments"
            description="Show updates about bookings, cancellations, and rescheduled appointments."
            channel={notificationChannel.IN_APP}
            type={notificationType.APPOINTMENT_UPDATES}
            checked={getNotificationPreference(
              notificationChannel.IN_APP,
              notificationType.APPOINTMENT_UPDATES,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Payments"
            description="Show payment and transaction updates."
            channel={notificationChannel.IN_APP}
            type={notificationType.PAYMENT_ACTIVITY}
            checked={getNotificationPreference(
              notificationChannel.IN_APP,
              notificationType.PAYMENT_ACTIVITY,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="System updates"
            description="Show important updates about SlotFlow and your account."
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
            description="Show product announcements, new features, and special offers."
            channel={notificationChannel.IN_APP}
            type={notificationType.PROMOTIONAL_UPDATES}
            checked={getNotificationPreference(
              notificationChannel.IN_APP,
              notificationType.PROMOTIONAL_UPDATES,
            )}
            onChange={handleNotificationToggle}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
