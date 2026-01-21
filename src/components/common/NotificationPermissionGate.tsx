import { RootState } from "@/utils/redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import NotificationPermissionModal from "./modal/NotificationPermissionModal";
import { updateNotificationPreference } from "@/utils/redux/slices/authSlice";
import { requestNotificationPermission } from "@/utils/helper/requestNotificationPermission";


export function NotificationPermissionGate() {

  const dispatch = useDispatch();

  const allowPushNotification = useSelector((state: RootState) => state.auth.authUser?.allowPushNotification);

  const shouldAskPermission =
    typeof window !== "undefined" &&
    "Notification" in window &&
    Notification.permission === "default" &&
    allowPushNotification == null;

  const handleAllow = async () => {
    const permission = await requestNotificationPermission();

    if (permission === "granted") {
      // Step 7 will handle token generation
    }

    dispatch(updateNotificationPreference(true));
  };

  const handleDecline = async () => {
    dispatch(updateNotificationPreference(false));
  };

  if (!shouldAskPermission) return null;

  return (
    <NotificationPermissionModal
      open={true}
      onAllow={handleAllow}
      onDecline={handleDecline}
    />
  );
}
