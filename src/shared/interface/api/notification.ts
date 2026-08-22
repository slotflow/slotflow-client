import { Platform } from '../enums';
import { Notification } from '../entityInterface/notificationInterface';
import { NotificationChannel, NotificationType } from '../commonInterface';

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