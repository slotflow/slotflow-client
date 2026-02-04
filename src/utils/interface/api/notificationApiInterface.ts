import { Platform } from "../enums";

export interface RegisterDeviceRequest {
    fcmToken: string;
    deviceId: string;
    platform: Platform;
};