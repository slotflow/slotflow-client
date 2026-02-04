import { axiosInstance } from "@/lib/axios";
import { ApiBaseResponse } from "../interface/commonInterface";
import { RegisterDeviceRequest } from "../interface/api/notificationApiInterface";

export const registerDevice = async (data: RegisterDeviceRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/user-device',data);
    return response.data;
};