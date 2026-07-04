import axios from 'axios';
import { appConfig, contentfulConfig, serviceConfig } from '@/shared/config/env';

export const axiosInstance = axios.create({
    baseURL: `${serviceConfig.apiGatewayUrl}${appConfig.version}`,
    withCredentials: true,
});

export const chatAxiosInstance = axios.create({
    baseURL: `${serviceConfig.apiGatewayUrl}${appConfig.version}`,
    withCredentials: true,
})

export const contentfulAxiosInstance = axios.create({
    baseURL: `${contentfulConfig.url}${contentfulConfig.spaceid}${contentfulConfig.urlEnd}${contentfulConfig.environmrnt}`,
    headers: {
        Authorization: `Bearer ${contentfulConfig.apikey}`,
    },
})