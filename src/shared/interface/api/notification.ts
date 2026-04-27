import { Platform } from "../enums";
import { Notification } from "../entityInterface/notificationInterface";

// request type of register device api
export interface RegisterDeviceRequest {
    fcmToken: string;
    deviceId: string;
    platform: Platform;
};

// response type of fetch notifications api
export type FetchNotificationsResponse = Pick<Notification, "_id" | "title" | "body" | "isRead" | "createdAt" >

// request type of fetch notifications api
export interface FetchNotificationsQueryParams {}; 