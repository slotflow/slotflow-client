import { appConfig } from '@/config/env';
import { RootState } from '@/app/store/appStore';
import { ApiError } from '@/shared/types/common';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { getFcmToken } from '@/shared/utils/helper/getToken';
import { registerDevice } from '@/services/apis/notification';
import { getDeviceId } from '@/shared/utils/helper/getDeviceId';
import { PermissionStatus, Platform } from '@/shared/types/enums';
import { useNotificationPermissionGateReturn } from '@/shared/types/hooks';
import { handleError } from '@/shared/utils/helper/handleError';
import { requestNotificationPermission } from '@/shared/utils/helper/requestNotificationPermission';

export const useNotificationPermissionGate = (): useNotificationPermissionGateReturn => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const shouldAskPermission = useMemo(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return false;
    return (
      Notification.permission === PermissionStatus.DEFAULT &&
      authUser?.isLoggedIn === true && true // TODO update
    );
  }, [authUser]);

  const enableNotificationMutation = useMutation({
    mutationFn: async () => {
      const deviceId = getDeviceId();
      const fcmToken = await getFcmToken();

      if (!deviceId || !fcmToken) {
        throw new Error('Device or FCM token generation failed.');
      }

      // Step 1: Register Device
      await registerDevice({
        deviceId,
        fcmToken,
        platform: Platform.WEB,
      });

      // Step 2: Update Server Preference
      // return await userSetPushNotification(true);
    },
    onSuccess: (res) => {
    },
    onError: (error: ApiError) => {
      handleError(error, 'Failed to enable push notifications.');
    },
  });

  const disableNotificationMutation = useMutation({
    mutationFn: async () => {
      // return await userSetPushNotification(false);
    },
    onSuccess: () => {
    },
    onError: (error: ApiError) => {
      if (appConfig.isDevelopment) {
        console.error('Failed to update push notification preference', error);
      }
    },
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    if (
      authUser?.isLoggedIn &&
      Notification.permission === PermissionStatus.DENIED &&
      !disableNotificationMutation.isPending
    ) {
      disableNotificationMutation.mutate();
    }
  }, [authUser?.isLoggedIn]);

  const askPermission = useCallback(async () => {
    if (!shouldAskPermission) return;

    const permission = await requestNotificationPermission();

    if (permission === PermissionStatus.GRANTED) {
      enableNotificationMutation.mutate();
    } else if (permission === PermissionStatus.DENIED) {
      disableNotificationMutation.mutate();
    }
  }, [shouldAskPermission, enableNotificationMutation, disableNotificationMutation]);

  useEffect(() => {
    askPermission();
  }, [askPermission]);

  return { askPermission };
};
