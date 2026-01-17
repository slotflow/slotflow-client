import axios from 'axios';
import { appConfig, serviceConfig } from '@/utils/env';

console.log("baseUrl : ",`${serviceConfig.apiGatewayUrl+appConfig.version}`);

export const axiosInstance = axios.create({
    baseURL: `${serviceConfig.apiGatewayUrl+appConfig.version}`,
    withCredentials: true,
});

export const chatAxiosInstance = axios.create({
    baseURL: `${serviceConfig.apiGatewayUrl}/v1`,
    withCredentials: true,
})