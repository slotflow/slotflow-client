import { appConfig } from '@/config/env';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { ApiError } from '@/shared/types/common';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { getFcmToken } from '@/shared/utils/helper/getToken';
import { getDeviceId } from '@/shared/utils/helper/getDeviceId';
import { handleError } from '@/shared/utils/helper/handleError';
import { PermissionStatus, Platform } from '@/shared/types/enums';
import { dismissKey } from '@/shared/utils/constants/appConstants';
import { registerDevice, updatePushNotificationPreference } from '@/services/apis/notification';

export const useNotificationPermissionGate = () => {
  
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // Check if we should display the custom banner on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    const isDismissed = localStorage.getItem(dismissKey) === 'true';
    const isDefaultPermission = Notification.permission === PermissionStatus.DEFAULT;

    if (authUser?.isLoggedIn && isDefaultPermission && !isDismissed) {
      setShowBanner(true);
    }
  }, [authUser?.isLoggedIn]);

  // Enable Push Mutation
  const enableNotificationMutation = useMutation({
    mutationFn: async () => {
      console.log("enabling push notification")
      const deviceId = getDeviceId();
      const fcmToken = await getFcmToken();

      console.log("deviceId : ",deviceId);
      console.log("fcmToken : ",fcmToken);
      
      if (!deviceId || !fcmToken) {
        throw new Error('Device or FCM token generation failed.');
      }


      await registerDevice({
        deviceId,
        fcmToken,
        platform: Platform.WEB,
      });
    },
    onSuccess: (res) => {
      setShowBanner(false);
      if (appConfig.isDevelopment) {
        console.log('Device registered for push notifications:', res);
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Failed to enable push notifications.');
    },
  });

  // 3Disable Push Mutation Triggered if permission is denied
  const disableNotificationMutation = useMutation({
    mutationFn: async () => {
      console.log("Disabling push notification")
      return await updatePushNotificationPreference({ pushNotification: false });
    },
    onSuccess: () => {
      setShowBanner(false);
    },
    onError: (error: ApiError) => {
      if (appConfig.isDevelopment) {
        console.error('Failed to update push notification preference', error);
      }
    },
  });

  // Sync backend preference if browser permission is already denied on load
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

  // 5. Action: User clicks "Enable" on Custom UI
  const handleAllow = useCallback(async () => {
    if (!('Notification' in window)) return;

    const permission = await Notification.requestPermission();

    if (permission === PermissionStatus.GRANTED) {
      enableNotificationMutation.mutate();
    } else if (permission === PermissionStatus.DENIED) {
      disableNotificationMutation.mutate();
    } else {
      setShowBanner(false);
    }
  }, [enableNotificationMutation, disableNotificationMutation]);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
    localStorage.setItem(dismissKey, 'true');
  }, []);

  return {
    showBanner,
    handleAllow,
    handleDismiss,
    isPending: enableNotificationMutation.isPending || disableNotificationMutation.isPending,
  };
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) return 'denied';
  return await Notification.requestPermission();
};