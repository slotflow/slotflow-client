export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!("Notification" in window)) return "denied";

  return await Notification.requestPermission();
};
