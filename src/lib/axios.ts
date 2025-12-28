import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    // baseURL: 'http://slotflow-main-backend:3000/api',
    withCredentials: true,
});

export const chatAxiosInstance = axios.create({
    baseURL: 'http://localhost:3002/api',
    withCredentials: true,
})