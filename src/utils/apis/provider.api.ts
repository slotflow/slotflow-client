import { axiosInstance } from "@/lib/axios";
import {
    ProviderSubmitDetailsResponse,
    ProviderDashboardGraphResponse,
    ProviderSubscribeToPlanResponse,
    ProviderFetchAllServicesResponse,
    ProviderUpdateProviderInfoRequest,
    ProviderFetchAllAppServiceRequest,
    ProviderGetMySubscriptionResponse,
    ProviderUpdateProfileImageRequest,
    ProviderUpdateProviderInfoResponse,
    ProviderUpdateProfileImageResponse,
    ProviderFetchMyProfileDetailsResponse,
    ProviderFetchServiceDetailsResponse,
    ProviderCreateServiceDetailsRequest,
    ProviderUpdateServiceDetailsRequest,
    ProviderCheckoutForSubscribePlanRequest,
    ProviderFetchDashboardStatsDataResponse,
    ProviderFetchUsersForChatSidebarResponse,
    ProviderFetchServiceAvailabilityResponse,
    CreateProviderServiceAvailabilitiesRequest,
    AdminFetchProviderProfileDetailsResponse,
    UserFetchProviderProfileDetailsResponse,
} from "../interface/api/providerApiInterface";
import { DateRange } from "react-day-picker";
import { PlanName } from "../interface/enums";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "../interface/commonInterface";
import { FetchProvidersProofsResponse, UpdateFileDataRequest, UpdateFileDataResponse } from "../interface/api/commonApiInterface";


// **** App service apis
export const providerFetchAllAppServices = async (data: ProviderFetchAllAppServiceRequest): Promise<ProviderFetchAllServicesResponse> => {
    const response = await axiosInstance.get('/provider/appservices', {
        params: {
            serviceCategory: [data.serviceCategory]
        }
    });
    return response.data.data;
}




// **** Provider services apis
export const providerCreateServiceDetails = createAsyncThunk<ApiBaseResponse, ProviderCreateServiceDetailsRequest>("/provider/addServiceDetails",
    async (data: ProviderCreateServiceDetailsRequest) => {
        const response = await axiosInstance.post(`/provider/service`, data);
        return response.data;
    }
)

export const providerUpdateServiceDetails = async (data: ProviderUpdateServiceDetailsRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/provider/service/${data._id}`, data);
    return response.data;
}

export const providerFetchServiceDetails = async (): Promise<ProviderFetchServiceDetailsResponse> => {
    const response = await axiosInstance.get('/provider/service');
    return response.data.data;
}



// **** Provider service availability apis
export const providerCreateServiceAvailabilities = createAsyncThunk<ApiBaseResponse, CreateProviderServiceAvailabilitiesRequest>("/provider/addServiceAvailability",
    async ({ data }: CreateProviderServiceAvailabilitiesRequest) => {
        const response = await axiosInstance.post(`/provider/availabilities`, data);
        return response.data;
    }
)

export const providerFetchServiceAvailability = async (date: Date): Promise<ProviderFetchServiceAvailabilityResponse> => {
    const response = await axiosInstance.get('/provider/availability', { params: { date: date.toISOString() } });
    return response.data.data;
}


// **** Provider profile apis
export const fetchMyProfileDetails = async (): Promise<ProviderFetchMyProfileDetailsResponse> => {
    const response = await axiosInstance.get('/provider/me');
    return response.data.data;
}

export const fetchProviderDetailsForAdmin = async (providerId: string): Promise<AdminFetchProviderProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/providers/${providerId}/profile`);
    return response.data.data;
}

export const fetchProviderDetailsForUser = async (providerId: string): Promise<UserFetchProviderProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/providers/${providerId}`);
    return response.data.data;
}

export const providerUpdateProfileImage = createAsyncThunk<ProviderUpdateProfileImageResponse, ProviderUpdateProfileImageRequest>('/provider/profile/image',
    async (data: ProviderUpdateProfileImageRequest) => {
        const response = await axiosInstance.patch('/provider/profile/image', data);
        return response.data;
    }
)

export const providerUpdateInfo = createAsyncThunk<ProviderUpdateProviderInfoResponse, ProviderUpdateProviderInfoRequest>('/provider/profile',
    async (data: ProviderUpdateProviderInfoRequest) => {
        const response = await axiosInstance.patch('/provider/profile/info', data);
        return response.data;
    }
)

export const providerUpdateIdentityProof = async (data: UpdateFileDataRequest): Promise<UpdateFileDataResponse> => {
    const response = await axiosInstance.patch('/provider/profile/identity', data);
    return response.data;
}

export const providerUpdateProofServiceProof = async (data: UpdateFileDataRequest): Promise<UpdateFileDataResponse> => {
    const response = await axiosInstance.patch('/provider/profile/service', data);
    return response.data;
}

export const providerFetchProofs = async (): Promise<FetchProvidersProofsResponse> => {
    const response = await axiosInstance.get(`/provider/profile/proofs`);
    return response.data.data;
}

export const providerDeleteIdentityProof = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.delete('/provider/profile/identity');
    return response.data;
}

export const providerDeleteServiceProof = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.delete('/provider/profile/service');
    return response.data;
}

export const providerSubmitDetailsForReview = createAsyncThunk<ProviderSubmitDetailsResponse>('/provider/profile/details',
    async () => {
        const response = await axiosInstance.patch('/provider/profile/approval');
        return response.data;
    }
)

export const providerSetPushNotification = async (data: boolean): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch('/provider/profile/push-notification', { allowPushNotification: data });
    return response.data;
}


// **** Provider subscription apis

export const providerSubscribeToTrialPlan = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/provider/subscriptions/trial');
    return response.data;
}

export const providerFetchMySubscription = async (): Promise<ProviderGetMySubscriptionResponse> => {
    const response = await axiosInstance.get('/provider/subscriptions/me');
    return response.data;
}


// **** Provider chat apis
export const providerFetchUsersForChatSideBar = async (): Promise<ProviderFetchUsersForChatSidebarResponse> => {
    const response = await axiosInstance.get('/provider/chat/users');
    return response.data.data
}


// **** Provider dashboard apis
export const providerFetchDashboardStatsData = async (): Promise<ProviderFetchDashboardStatsDataResponse> => {
    const response = await axiosInstance.get('/provider/dashboard/stats');
    return response.data.data;
}

export const providerFetchDashboardGraphData = async (subscription?: PlanName, dateRange?: DateRange): Promise<ProviderDashboardGraphResponse> => {
    const response = await axiosInstance.get(`/provider/dashboard/graph-data`, {
        params: {
            subscription,
            ...(dateRange ? { start: dateRange.from, end: dateRange.to } : {}),
        }
    });
    return response.data.data;
}


// **** provider integration api
export const connectStripeAccount = async (): Promise<{ url: string }> => {
    const response = await axiosInstance.post("/provider/stripe/connect");
    return response.data.data;
};


// **** Provider payment service api
export const providerCheckoutForSubscribePlan = async (data: ProviderCheckoutForSubscribePlanRequest): Promise<ProviderSubscribeToPlanResponse> => {
    const response = await axiosInstance.post('/provider/subscriptions/checkout/session', data);
    return response.data;
}