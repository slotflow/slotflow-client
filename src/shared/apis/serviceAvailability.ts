import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "../interface/commonInterface";
import { FetchServiceAvailabilityRequest, FetchServiceAvailabilityResponse, CreateServiceAvailabilitiesRequest, FetchEngagedSlotsRequest, FetchEngagedSlotsResponse } from "../interface/api/serviceAvailability";

export const fetchEngagedSlots = async (data: FetchEngagedSlotsRequest): Promise<FetchEngagedSlotsResponse> => {
    const response = await axiosInstance.get(`/service-availabilities/engaged-slots/${data.providerId}/${data.date.toISOString()}`);
    return response.data.data;
};

export const createServiceAvailabilities = createAsyncThunk<ApiBaseResponse, CreateServiceAvailabilitiesRequest>("/provider/create-service-availability",
    async ({ data }: CreateServiceAvailabilitiesRequest) => {
        const response = await axiosInstance.post(`/service-availabilities/`, data);
        return response.data;
    }
);

export const fetchMyServiceAvailability = async ({ date }: { date: Date }): Promise<FetchServiceAvailabilityResponse> => {
    const response = await axiosInstance.get(`/service-availabilities/me`, { params: { date: date.toISOString() }});
    return response.data;
};

export const fetchServiceAvailabilityByProviderId = async ({ date, providerId }: FetchServiceAvailabilityRequest): Promise<FetchServiceAvailabilityResponse> => {
    const response = await axiosInstance.get(`/providers/${providerId}/service-availability`, { params: { date: date.toISOString() } });
    return response.data;
};

// Not implemented
// export const fetchServiceAvailability = async ({ date, id }: { date: Date, id: string }): Promise<FetchServiceAvailabilityResponse> => {
//     const response = await axiosInstance.get(`/service-availabilities/${id}`, { params: { date: date.toISOString() }});
//     return response.data;
// }

