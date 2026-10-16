import axios from 'axios';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import { axiosInstance } from '@/lib/axios';
import { appConfig, serviceConfig } from '@/config/env';
import { BackendApiErrorResponse } from '@/shared/types/common';

declare module 'axios' {
  interface AxiosRequestConfig {
    skipErrorToast?: boolean;
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}

const baseURL = `${serviceConfig.apiGatewayUrl}${appConfig.version}`;

const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

let refreshPromise: Promise<void> | null = null;
let sessionExpired = false;
let sessionGeneration = 0;
let onAuthExpired: (() => void) | null = null;
let responseInterceptorId: number | null = null;

export const setAuthExpiredHandler = (handler: (() => void) | null) => {
  onAuthExpired = handler;
};

export const resetAuthSession = () => {
  sessionGeneration += 1;
  sessionExpired = false;
  refreshPromise = null;
};

export const refreshAccessToken = (): Promise<void> => {
  if (!refreshPromise) {
    const requestPromise = refreshClient.post('/auth/refresh').then(() => undefined);
    const trackedPromise: Promise<void> = requestPromise.finally(() => {
      if (refreshPromise === trackedPromise) {
        refreshPromise = null;
      }
    });
    refreshPromise = trackedPromise;
  }

  return refreshPromise;
};

const publicAuthRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/verify-otp',
  '/auth/resendOtp',
  '/auth/verify-email',
  '/auth/verify-reset-otp',
  '/auth/password',
  '/auth/refresh',
  '/auth/signout',
  '/auth/google',
];

const isPublicAuthRoute = (url: string): boolean => {
  const path = new URL(url, baseURL).pathname;

  return publicAuthRoutes.some((route) => path === route || path.endsWith(route));
};

const getErrorMessage = (error: AxiosError<BackendApiErrorResponse>): string => {
  const status = error.response?.status;
  const message = error.response?.data?.message;

  if (!error.response) {
    return error.code === 'ECONNABORTED'
      ? 'Request timed out. Please try again.'
      : 'Unable to connect to the server.';
  }

  switch (status) {
    case 400:
      return message ?? 'Invalid request.';

    case 401:
      return message ?? 'Unauthorized request.';

    case 403:
      return message ?? 'Access denied.';

    case 404:
      return message ?? 'Requested resource not found.';

    case 429:
      return 'Too many requests. Please try again later.';

    case 500:
      return 'Internal server error. Please try again later.';

    case 502:
      return 'Bad gateway. Please try again later.';

    case 503:
      return 'Service temporarily unavailable.';

    case 504:
      return 'The server took too long to respond.';

    default:
      return message ?? 'Something went wrong.';
  }
};

const notifySessionExpired = () => {
  if (sessionExpired) return;

  sessionExpired = true;

  onAuthExpired?.();

  toast.error('Your session has expired. Please log in again.', { toastId: 'session-expired' });
};

export const setupAxiosInterceptors = () => {
  if (responseInterceptorId !== null) return;

  responseInterceptorId = axiosInstance.interceptors.response.use(
    (response) => response,

    async (error: unknown) => {
      if (!axios.isAxiosError<BackendApiErrorResponse>(error)) {
        return Promise.reject(error);
      }

      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }

      const config = error.config;

      if (!config) {
        toast.error(getErrorMessage(error));
        return Promise.reject(error);
      }

      const url = config.url ?? '';
      const isPublicRoute = isPublicAuthRoute(url);

      const shouldRefresh =
        error.response?.status === 401 &&
        !config._retry &&
        !config.skipAuthRefresh &&
        !isPublicRoute &&
        !sessionExpired;

      if (shouldRefresh) {
        config._retry = true;
        const requestSessionGeneration = sessionGeneration;

        try {
          await refreshAccessToken();

          if (requestSessionGeneration !== sessionGeneration) {
            return axiosInstance(config);
          }

          if (sessionExpired) {
            return Promise.reject(error);
          }

          return axiosInstance(config);
        } catch (refreshError) {
          if (requestSessionGeneration !== sessionGeneration) {
            return axiosInstance(config);
          }

          if (axios.isCancel(refreshError)) {
            return Promise.reject(refreshError);
          }

          if (axios.isAxiosError(refreshError) && refreshError.response?.status === 401) {
            notifySessionExpired();
            return Promise.reject(error);
          }

          if (!config.skipErrorToast) {
            toast.error('Unable to restore your session. Please try again.', {
              toastId: 'session-refresh-failed',
            });
          }

          return Promise.reject(refreshError);
        }
      }

      if (!config.skipErrorToast && !sessionExpired) {
        toast.error(getErrorMessage(error));
      }

      return Promise.reject(error);
    },
  );
};
