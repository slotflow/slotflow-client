import { axiosInstance } from "@/lib/axios";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { FetchNotificationsQueryParams, FetchNotificationsResponse, RegisterDeviceRequest } from "../interface/api/notificationApiInterface";

export const registerDevice = async (data: RegisterDeviceRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/user-device',data);
    return response.data;
};

export const fetchNotifications: ApiFetchFunction<
FetchNotificationsResponse,
FetchNotificationsQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/notifications${query ? `?${query}` : ""}`);
  return parseNewCommonResponse<FetchNotificationsResponse>(response.data.data);
};