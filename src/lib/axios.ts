import axios from 'axios';
import { appConfig, contentfulConfig, serviceConfig } from '@/config/env';

export const axiosInstance = axios.create({
  baseURL: `${serviceConfig.apiGatewayUrl}${appConfig.version}`,
  withCredentials: true,
});

export const contentfulAxiosInstance = axios.create({
  baseURL: `${contentfulConfig.url}${contentfulConfig.spaceId}${contentfulConfig.urlEnd}${contentfulConfig.environment}`,
  headers: {
    Authorization: `Bearer ${contentfulConfig.consumeApikey}`,
  },
});
