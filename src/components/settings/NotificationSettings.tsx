import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '../ui/card';
import { useSelector } from 'react-redux';
import { Role } from '@/shared/interface/enums';
import { RootState } from '@/shared/redux/appStore';
import { handleNotificationChange } from '@/shared/apis/notification';
import NotificationSettingsItem from '../notification/NotificationSettingsItem';
import { NOTIFICATION_CHANNEL, NOTIFICATION_TYPE } from '@/shared/utils/constants';
import { NotificationType, NotificationChannel } from '@/shared/interface/commonInterface';

const NotificationSettings = () => {
  const authUser = useSelector(
    (state: RootState) => state.auth.authUser,
  );

  const preferences = useSelector(
    (state: RootState) => state.notification.preferences,
  );

  const getNotificationPreference = (
    channel: NotificationChannel,
    type: NotificationType,
  ): boolean => {
    return (
      preferences
        .find((item) => item.channel === channel)
        ?.preferences[type] ?? false
    );
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
      console.error(
        'Failed to update notification preference:',
        error,
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Email notifications
          </CardTitle>

          <CardDescription>
            Choose which notifications you want to receive by email.
          </CardDescription>
        </CardHeader>

        <CardContent className="divide-y">

          <NotificationSettingsItem
            title="Appointment updates"
            description="Receive emails when an appointment is booked, rescheduled, cancelled, or completed."
            channel={NOTIFICATION_CHANNEL.EMAIL}
            type={NOTIFICATION_TYPE.APPOINTMENT_UPDATES}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.EMAIL,
              NOTIFICATION_TYPE.APPOINTMENT_UPDATES,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Appointment reminders"
            description="Receive reminders about upcoming appointments."
            channel={NOTIFICATION_CHANNEL.EMAIL}
            type={NOTIFICATION_TYPE.APPOINTMENT_REMINDERS}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.EMAIL,
              NOTIFICATION_TYPE.APPOINTMENT_REMINDERS,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Payment notifications"
            description="Get notified about payments, refunds, and payment-related activity."
            channel={NOTIFICATION_CHANNEL.EMAIL}
            type={NOTIFICATION_TYPE.PAYMENT_NOTIFICATIONS}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.EMAIL,
              NOTIFICATION_TYPE.PAYMENT_NOTIFICATIONS,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Account activity"
            description="Receive important updates about your account and security."
            channel={NOTIFICATION_CHANNEL.EMAIL}
            type={NOTIFICATION_TYPE.ACCOUNT_ACTIVITY}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.EMAIL,
              NOTIFICATION_TYPE.ACCOUNT_ACTIVITY,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Promotional updates"
            description="Show product announcements, new features, and special offers."
            channel={NOTIFICATION_CHANNEL.EMAIL}
            type={NOTIFICATION_TYPE.PROMOTIONAL_UPDATES}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.EMAIL,
              NOTIFICATION_TYPE.PROMOTIONAL_UPDATES,
            )}
            onChange={handleNotificationToggle}
          />

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Push notifications
          </CardTitle>

          <CardDescription>
            Manage notifications sent directly to your device.
          </CardDescription>
        </CardHeader>

        <CardContent className="divide-y">

          {authUser?.role === Role.PROVIDER && (
            <NotificationSettingsItem
              title="New appointments"
              description="Get notified instantly when a new appointment is booked."
              channel={NOTIFICATION_CHANNEL.PUSH}
              type={NOTIFICATION_TYPE.NEW_APPOINTMENTS}
              checked={getNotificationPreference(
                NOTIFICATION_CHANNEL.PUSH,
                NOTIFICATION_TYPE.NEW_APPOINTMENTS,
              )}
              onChange={handleNotificationToggle}
            />
          )}

          <NotificationSettingsItem
            title="Appointment reminders"
            description="Receive reminders before an upcoming appointment."
            channel={NOTIFICATION_CHANNEL.PUSH}
            type={NOTIFICATION_TYPE.APPOINTMENT_REMINDERS}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.PUSH,
              NOTIFICATION_TYPE.APPOINTMENT_REMINDERS,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Appointment changes"
            description="Get notified when an appointment is rescheduled or cancelled."
            channel={NOTIFICATION_CHANNEL.PUSH}
            type={NOTIFICATION_TYPE.APPOINTMENT_CHANGES}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.PUSH,
              NOTIFICATION_TYPE.APPOINTMENT_CHANGES,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Payment activity"
            description="Receive alerts for successful payments, refunds, and failures."
            channel={NOTIFICATION_CHANNEL.PUSH}
            type={NOTIFICATION_TYPE.PAYMENT_ACTIVITY}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.PUSH,
              NOTIFICATION_TYPE.PAYMENT_ACTIVITY,
            )}
            onChange={handleNotificationToggle}
          />

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            In-app notifications
          </CardTitle>

          <CardDescription>
            Choose which notifications appear inside SlotFlow.
          </CardDescription>
        </CardHeader>

        <CardContent>

          <NotificationSettingsItem
            title="Appointments"
            description="Show updates about bookings, cancellations, and rescheduled appointments."
            channel={NOTIFICATION_CHANNEL.IN_APP}
            type={NOTIFICATION_TYPE.APPOINTMENT_UPDATES}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.IN_APP,
              NOTIFICATION_TYPE.APPOINTMENT_UPDATES,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Payments"
            description="Show payment and transaction updates."
            channel={NOTIFICATION_CHANNEL.IN_APP}
            type={NOTIFICATION_TYPE.PAYMENT_ACTIVITY}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.IN_APP,
              NOTIFICATION_TYPE.PAYMENT_ACTIVITY,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="System updates"
            description="Show important updates about SlotFlow and your account."
            channel={NOTIFICATION_CHANNEL.IN_APP}
            type={NOTIFICATION_TYPE.SYSTEM_UPDATES}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.IN_APP,
              NOTIFICATION_TYPE.SYSTEM_UPDATES,
            )}
            onChange={handleNotificationToggle}
          />

          <NotificationSettingsItem
            title="Promotional updates"
            description="Show product announcements, new features, and special offers."
            channel={NOTIFICATION_CHANNEL.IN_APP}
            type={NOTIFICATION_TYPE.PROMOTIONAL_UPDATES}
            checked={getNotificationPreference(
              NOTIFICATION_CHANNEL.IN_APP,
              NOTIFICATION_TYPE.PROMOTIONAL_UPDATES,
            )}
            onChange={handleNotificationToggle}
          />

        </CardContent>
      </Card>

    </div>
  );
};

export default NotificationSettings;