import { axiosInstance } from "@/lib/axios";

export const fetchEngagedSlots = async (providerId: string, date: Date): Promise<string[]> => {
    const response = await axiosInstance.get(`/service-availability/engaged-slots/${providerId}/${date.toISOString()}`);
    return response.data.data;
};
