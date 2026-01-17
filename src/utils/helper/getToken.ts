import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";

export const registerPushNotifications = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") return;

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
  });

  if (!token) return;

  return token;
};
