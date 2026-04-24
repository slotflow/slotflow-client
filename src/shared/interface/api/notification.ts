import { Platform } from "../enums";
import { Notification } from "../entityInterface/notificationInterface";

export interface RegisterDeviceRequest {
    fcmToken: string;
    deviceId: string;
    platform: Platform;
};

export type FetchNotificationsResponse = Pick<Notification, "_id" | "title" | "body" | "isRead" | "createdAt" >

export interface FetchNotificationsQueryParams {}; 