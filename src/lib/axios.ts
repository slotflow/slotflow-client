import axios from 'axios';

 const mainBackendUrl = import.meta.env.MODE === "development"
        ? import.meta.env.VITE_BACKEND_DEV_URL
        : import.meta.env.VITE_BACKEND_PRODUCTION_URL;

const realtimeBackendUrl = import.meta.env.MODE === "development"
        ? import.meta.env.VITE_REALTIME_BACKEND_DEV_URL
        : import.meta.env.VITE_REALTIME_BACKEND_PRODUCTION_URL;

export const axiosInstance = axios.create({
    baseURL: `${mainBackendUrl}/v1`,
    withCredentials: true,
});

export const chatAxiosInstance = axios.create({
    baseURL: `${realtimeBackendUrl}/v1`,
    withCredentials: true,
})