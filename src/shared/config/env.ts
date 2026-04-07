export const appConfig = {
    isDevelopment: import.meta.env.DEV,
    version: import.meta.env.VITE_API_VERSION,
};

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const firebaseCloudMessageConfig = {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
};

export const stripeConfig = {
    stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: import.meta.env.VITE_STRIPE_SECRET_KEY
};

export const serviceConfig = {
    apiGatewayUrl: appConfig.isDevelopment ? import.meta.env.VITE_API_GATEWAY_URL_DEV : import.meta.env.VITE_API_GATEWAY_URL,
};

export const locationIqConfig = {
    locationIqMapApiStart: import.meta.env.VITE_LOCATIONIQ_MAP_API_START,
    locationIqMapApi: import.meta.env.VITE_LOCATIONIQ_MAP_API_KEY,
    locationIqAttribution: import.meta.env.VITE_LOCATIONIQ_ATTRIBUTION,
    locationIqUrlStart: import.meta.env.VITE_LOCATIONIQ_URL_START,
    locationIqUrlLat: import.meta.env.VITE_LOCATIONIQ_URL_LAT,
    locationIqUrlLon: import.meta.env.VITE_LOCATIONIQ_URL_LON,
    locationIqUrlEnd: import.meta.env.VITE_LOCATIONIQ_URL_END
};

export const jwtConfig = {
    jwtSecret: import.meta.env.VITE_JWT_SECRET,
    jwtExpiresIn: import.meta.env.VITE_JWT_EXPIRES_IN
};

export const grafanaConfig = {
    grafanaUrl: import.meta.env.VITE_GRAFANA_URL,
    grafanaUrlDev: import.meta.env.VITE_GRAFANA_URL_DEV,
    grafanaUrlQuery: import.meta.env.VITE_GRAFANA_URL_QUERY,
    grafanaDashboardId: import.meta.env.VITE_GRAFANA_DASHBOARD_ID,
    grafanaDashboardName: import.meta.env.VITE_GRAFANA_DASHBOARD_NAME
};