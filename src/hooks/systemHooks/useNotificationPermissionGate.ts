import { RootState } from "@/utils/redux/appStore";
import { getFcmToken } from "@/utils/helper/getToken";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { getDeviceId } from "@/utils/helper/getDeviceId";
import { registerDevice } from "@/utils/apis/notification.api";
import { userSetPushNotification } from "@/utils/apis/user.api";
import { providerSetPushNotification } from "@/utils/apis/provider.api";
import { PermissionStatus, Platform, Role } from "@/utils/interface/enums";
import { updateNotificationPreference } from "@/utils/redux/slices/authSlice";
import { requestNotificationPermission } from "@/utils/helper/requestNotificationPermission";

interface useNotificationPermissionGateInterface {
  askPermission: () => Promise<void>
}

export const useNotificationPermissionGate = (): useNotificationPermissionGateInterface => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const shouldAskPermission = useMemo(() => {
    if (typeof window === "undefined") return false;
    if (!("Notification" in window)) return false;

    return (
      Notification.permission === PermissionStatus.DEFAULT &&
      authUser?.isLoggedIn === true &&
      authUser?.allowPushNotification == null
    );
  }, [authUser]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;
    if (!authUser?.isLoggedIn) return;

    if (Notification.permission === PermissionStatus.DENIED) {
      const updateServer = async () => {
        try {
          if (authUser.role === Role.USER) {
            await userSetPushNotification(false);
          } else if (authUser.role === Role.PROVIDER) {
            await providerSetPushNotification(false);
          }
          dispatch(updateNotificationPreference(false));
        } catch (err) {
          console.error("Failed to update push notification preference", err);
        }
      };

      updateServer();
    }
  }, [authUser, dispatch]);

  const askPermission = useCallback(async () => {
    if (!shouldAskPermission) return;

    const permission = await requestNotificationPermission();

    if (permission === PermissionStatus.GRANTED) {
      const deviceId = getDeviceId();
      console.log("deviceId : ",deviceId);
      const fcmToken = await getFcmToken();
      console.log("fcmToken : ",fcmToken);

      if (!deviceId || !fcmToken) return;

      await registerDevice({
        deviceId,
        fcmToken,
        platform: Platform.WEB,
      });

      if (authUser?.role === Role.USER) {
        await userSetPushNotification(true);
      } else if (authUser?.role === Role.PROVIDER) {
        await providerSetPushNotification(true);
      }

      dispatch(updateNotificationPreference(true));
      return;
    }

    if (permission === PermissionStatus.DENIED) {
      dispatch(updateNotificationPreference(false));
    }
  }, [shouldAskPermission, authUser, dispatch]);

  useEffect(() => {
    askPermission();
  }, [askPermission]);

  return { askPermission };
};
