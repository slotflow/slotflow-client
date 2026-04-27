import { axiosInstance } from "@/lib/axios";
import { parseResponse } from "../helper/parseResponse";
import { buildQueryParams } from "../helper/buildQueryParams";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { FetchNotificationsQueryParams, FetchNotificationsResponse, RegisterDeviceRequest } from "../interface/api/notification";

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
  return parseResponse<FetchNotificationsResponse>(response.data.data);
};