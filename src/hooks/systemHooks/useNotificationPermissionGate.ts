import { appConfig } from '@/config/env';
import { RootState } from '@/app/store/appStore';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { getFcmToken } from '@/shared/utils/helper/getToken';
import { registerDevice } from '@/services/apis/notification';
import { userSetPushNotification } from '@/services/apis/user';
import { getDeviceId } from '@/shared/utils/helper/getDeviceId';
import { PermissionStatus, Platform } from '@/shared/types/enums';
import { useNotificationPermissionGateReturn } from '@/shared/types/hooks';
import { updateNotificationPreference } from '@/app/store/slices/authSlice';
import { requestNotificationPermission } from '@/shared/utils/helper/requestNotificationPermission';

export const useNotificationPermissionGate = (): useNotificationPermissionGateReturn => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const shouldAskPermission = useMemo(() => {
    if (typeof window === 'undefined') return false;
    if (!('Notification' in window)) return false;

    return (
      Notification.permission === PermissionStatus.DEFAULT &&
      authUser?.isLoggedIn === true &&
      authUser?.allowPushNotification == null
    );
  }, [authUser]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;
    if (!authUser?.isLoggedIn) return;

    if (Notification.permission === PermissionStatus.DENIED) {
      const updateServer = async () => {
        try {
          const res = await userSetPushNotification(false);
          if (res.success) {
            dispatch(updateNotificationPreference(true));
          } else {
            dispatch(updateNotificationPreference(false));
          }
        } catch (error) {
          if (appConfig.isDevelopment) {
            console.error('Failed to update push notification preference', error);
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
      if (appConfig.isDevelopment) {
        console.log('deviceId : ', deviceId);
      }
      const fcmToken = await getFcmToken();
      if (appConfig.isDevelopment) {
        console.log('fcmToken : ', fcmToken);
      }

      if (!deviceId || !fcmToken) return;

      await registerDevice({
        deviceId,
        fcmToken,
        platform: Platform.WEB,
      });

      const res = await userSetPushNotification(true);
      if (res.success) {
        dispatch(updateNotificationPreference(true));
      } else {
        dispatch(updateNotificationPreference(false));
      }
      return;
    }

    if (permission === PermissionStatus.DENIED) {
      dispatch(updateNotificationPreference(false));
    }
  }, [shouldAskPermission, dispatch]);

  useEffect(() => {
    askPermission();
  }, [askPermission]);

  return { askPermission };
};
