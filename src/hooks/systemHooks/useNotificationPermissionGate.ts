import { appConfig } from "@/shared/config/env";
import { RootState } from "@/shared/redux/appStore";
import { getFcmToken } from "@/shared/helper/getToken";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { getDeviceId } from "@/shared/helper/getDeviceId";
import { registerDevice } from "@/shared/apis/notification";
import { userSetPushNotification } from "@/shared/apis/user";
import { PermissionStatus, Platform } from "@/shared/interface/enums";
import { updateNotificationPreference } from "@/shared/redux/slices/authSlice";
import { requestNotificationPermission } from "@/shared/helper/requestNotificationPermission";

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
          const res = await userSetPushNotification(false);
          if(res.success) {
            dispatch(updateNotificationPreference(true));
          } else {
            dispatch(updateNotificationPreference(false));
          }
        } catch (error) {
          if(appConfig.isDevelopment) {
            console.error("Failed to update push notification preference", error);
          }
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
      if(appConfig.isDevelopment) {
        console.log("deviceId : ", deviceId);
      }
      const fcmToken = await getFcmToken();
      if(appConfig.isDevelopment) {
        console.log("fcmToken : ", fcmToken);
      }

      if (!deviceId || !fcmToken) return;

      await registerDevice({
        deviceId,
        fcmToken,
        platform: Platform.WEB,
      });

        const res = await userSetPushNotification(true);
        if(res.success) {
          dispatch(updateNotificationPreference(true));
        } else {
          dispatch(updateNotificationPreference(false));
        }
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
