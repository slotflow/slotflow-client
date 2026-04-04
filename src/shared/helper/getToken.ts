import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";
import { appConfig, firebaseCloudMessageConfig } from "../config/env";

export const getFcmToken = async (): Promise<string | undefined> => {
  try {
    console.log("vapidKey : ", firebaseCloudMessageConfig.vapidKey)
    const token = await getToken(messaging, { vapidKey: firebaseCloudMessageConfig.vapidKey });
    return token;
  } catch (error) {
    if (appConfig.isDevelopment) console.log("Failed to generated fcm token : ", error);
    return;
  }
};