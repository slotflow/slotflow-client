import { axiosInstance } from '@/lib/axios';
import {
  RegisterDeviceRequest,
  FetchNotificationsResponse,
  FetchNotificationsQueryParams,
  UpdateNotificationPreferenceRequest,
  UpdateNotificationPreferenceResponse,
} from '../../shared/types/api/notification';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';
import { ApiBaseResponse, ApiFetchFunction } from '../../shared/types/common';

export const registerDevice = async (data: RegisterDeviceRequest): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.post('/user-devices', data);
  return response.data;
};

export const fetchNotifications: ApiFetchFunction<
  FetchNotificationsResponse,
  FetchNotificationsQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/notifications?${query}`);
  return response.data.data;
};

export const handleNotificationChange = async (
  data: UpdateNotificationPreferenceRequest,
): Promise<ApiBaseResponse<UpdateNotificationPreferenceResponse>> => {
  const response = await axiosInstance.patch('/notifications/preferences', data);
  return response.data;
};
