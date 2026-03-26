import axios from 'axios';
import { appConfig, serviceConfig } from '@/utils/env';

export const axiosInstance = axios.create({
    baseURL: `${serviceConfig.apiGatewayUrl}${appConfig.version}`,
    withCredentials: true,
});

export const chatAxiosInstance = axios.create({
    baseURL: `${serviceConfig.apiGatewayUrl}${appConfig.version}`,
    withCredentials: true,
})