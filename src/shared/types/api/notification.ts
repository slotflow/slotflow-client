import { Notification } from '../entity/notification';
import { NotificationPreference } from '../entity/notificationPreference';
import { NotificationChannel, NotificationType, Platform } from '../enums';

// request type of register device api
export interface RegisterDeviceRequest {
  fcmToken: string;
  deviceId: string;
  platform: Platform;
}

// response type of fetch notifications api
export type FetchNotificationsResponse = Pick<
  Notification,
  '_id' | 'title' | 'body' | 'isRead' | 'createdAt'
>;

// request type of fetch notifications api
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FetchNotificationsQueryParams {}

// Update notification preference
export interface UpdateNotificationPreferenceRequest {
  channel: NotificationChannel;
  type: NotificationType;
  enabled: boolean;
}
export interface UpdateNotificationPreferenceResponse {
  channel: NotificationChannel;
  type: NotificationType;
  enabled: boolean;
}

// Get notification preference
export type FetchMyNotificationPreferenceResponse = Pick<
  NotificationPreference,
  'promotionalUpdates' | 'systemUpdates' | 'accountActivity'
>;

export interface UpdatePushNotificationPreferenceRequest {
  pushNotification: boolean;
}
