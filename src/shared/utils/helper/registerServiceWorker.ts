// export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
//   if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
//     throw new Error('Service workers are not supported in this browser.');
//   }

//   const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
//   if (registration.active) return registration;

//   const worker = registration.installing ?? registration.waiting;
//   if (!worker) {
//     throw new Error('Firebase messaging service worker did not start installing.');
//   }

//   await new Promise<void>((resolve, reject) => {
//     const handleStateChange = () => {
//       if (worker.state === 'activated') {
//         worker.removeEventListener('statechange', handleStateChange);
//         resolve();
//       } else if (worker.state === 'redundant') {
//         worker.removeEventListener('statechange', handleStateChange);
//         reject(new Error('Firebase messaging service worker failed to activate.'));
//       }
//     };

//     worker.addEventListener('statechange', handleStateChange);
//     handleStateChange();
//   });

//   return registration;
// };

// registerServiceWorker.ts
const SW_URL = '/firebase-messaging-sw.js';

const waitForActivation = (registration: ServiceWorkerRegistration): Promise<void> =>
  new Promise((resolve, reject) => {
    if (registration.active) return resolve();

    const worker = registration.installing ?? registration.waiting;
    if (!worker) return reject(new Error('No service worker found to activate.'));

    worker.addEventListener('statechange', () => {
      if (worker.state === 'activated') resolve();
      if (worker.state === 'redundant') {
        reject(new Error('Service worker installation failed.'));
      }
    });
  });

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers are not supported in this browser.');
  }

  const registration = await navigator.serviceWorker.register(SW_URL, { scope: '/' });
  await waitForActivation(registration);
  return registration;
};