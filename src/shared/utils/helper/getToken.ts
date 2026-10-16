import { messaging } from '@/lib/firebase';
import { getToken } from 'firebase/messaging';
import { registerServiceWorker } from './registerServiceWorker';
import { appConfig, firebaseCloudMessageConfig } from '../../../config/env';

const urlBase64ToUint8Array = (base64String: string): Uint8Array<ArrayBuffer> => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);

  const buffer = new ArrayBuffer(rawData.length);
  const output = new Uint8Array(buffer);

  for (let i = 0; i < rawData.length; i++) {
    output[i] = rawData.charCodeAt(i);
  }

  return output;
};

export const getFcmToken = async (): Promise<string> => {
  try {
    const vapidKey = firebaseCloudMessageConfig.vapidKey;

    if (!vapidKey) {
      throw new Error('Firebase VAPID key is missing. Set VITE_FIREBASE_VAPID_KEY.');
    }

    const serviceWorkerRegistration = await registerServiceWorker();

    console.log('SW scope:', serviceWorkerRegistration.scope);
    console.log('SW script:', serviceWorkerRegistration.active?.scriptURL);
    console.log('SW state:', serviceWorkerRegistration.active?.state);

    const existingSubscription = await serviceWorkerRegistration.pushManager.getSubscription();

    console.log('Existing push subscription:', existingSubscription);

    const testSubscription = await serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });

    console.log('DIRECT PUSH SUBSCRIPTION:', testSubscription);

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration,
    });

    return token;
  } catch (error) {
    if (appConfig.isDevelopment) {
      console.error('Failed to generate FCM token:', error);
    }

    throw error;
  }
};
