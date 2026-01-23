import { RootState } from "@/utils/redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import { PermissionStatus } from "@/utils/interface/enums";
import { updateNotificationPreference } from "@/utils/redux/slices/authSlice";
import { requestNotificationPermission } from "@/utils/helper/requestNotificationPermission";


export const useNotificationPermissionGate = () => {

  const dispatch = useDispatch();
  const allowPushNotification = useSelector((state: RootState) => state.auth.authUser?.allowPushNotification);

  const shouldAskPermission =
    typeof window !== "undefined" &&
    "Notification" in window &&
    Notification.permission === "default" &&
    allowPushNotification == null;

  const askPermission = async () => {
    if (!shouldAskPermission) return;

    const permission = await requestNotificationPermission();

    if (permission === PermissionStatus.GRANTED as string) {
      dispatch(updateNotificationPreference(true));
    } else if (permission === PermissionStatus.DENIED as string) {
      dispatch(updateNotificationPreference(false));
    };

  };

  return { askPermission };
}
