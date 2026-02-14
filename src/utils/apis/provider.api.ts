import { axiosInstance } from "@/lib/axios";
import {
    ProviderFetchPlansResponse,
    ProviderFetchAddressResponse,
    ProviderCreateAddressRequest,
    ProviderSubmitDetailsResponse,
    ProviderCheckoutForSubscribePlanRequest,
    ProviderDashboardGraphResponse,
    ProviderSubscribeToPlanResponse,
    ProviderFetchAllServicesResponse,
    ProviderUpdateProviderInfoRequest,
    ProviderFetchAllAppServiceRequest,
    ProviderUpdateProfileImageRequest,
    ProviderUpdateProviderInfoResponse,
    ProviderUpdateProfileImageResponse,
    ProviderFetchProfileDetailsResponse,
    ProviderFetchServiceDetailsResponse,
    ProviderCreateServiceDetailsRequest,
    ProviderUpdateServiceDetailsRequest,
    ProviderChangeAppointmentStatusRequest,
    ProviderFetchDashboardStatsDataResponse,
    ProviderFetchUsersForChatSidebarResponse,
    ProviderFetchServiceAvailabilityResponse,
    CreateProviderServiceAvailabilitiesRequest,
    ProviderSubscribedPlanRespone,
} from "../interface/api/providerApiInterface";
import { DateRange } from "react-day-picker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Review } from "../interface/entityInterface/reviewInterface";
import { Booking } from "../interface/entityInterface/bookingInterface";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { ApiBaseResponse, FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";
import { FetchBookingDetailsResponse, FetchBookingsResponse, FetchOnlineBookingParams, FetchOnlineBookingsForProviderResponse, FetchPaymentsResponse, FetchProvidersProofsResponse, FetchProviderSubscriptionsResponse, FetchReviewsResponse, FetchSubscriptionDetailsResponse, JoinRoomCallbackRequest, JoinRoomCallbackResponse, UpdateAddressRequest, UpdateAddressResponse, UpdateFileDataRequest, UpdateFileDataResponse, ValidateRoomId } from "../interface/api/commonApiInterface";
import { PlanName } from "../interface/enums";


// **** Address apis
export const providerCreateAddress = createAsyncThunk<ApiBaseResponse, ProviderCreateAddressRequest>("/provider/addAddress",
    async (data: ProviderCreateAddressRequest) => {
        const response = await axiosInstance.post(`/provider/addresses`, data);
        return response.data;
    }
)

export const providerFetchAddress = async (): Promise<ProviderFetchAddressResponse> => {
    const response = await axiosInstance.get('/provider/address');
    return response.data.data;
}

export const providerUpdateAddress = async (data: UpdateAddressRequest): Promise<UpdateAddressResponse> => {
    const response = await axiosInstance.patch(`/provider/addresses/${data._id}`, data);
    return response.data;
}


// **** App service apis
export const providerFetchAllAppServices = async (data: ProviderFetchAllAppServiceRequest): Promise<ProviderFetchAllServicesResponse> => {
    console.log("data : ",data);
    const response = await axiosInstance.get('/provider/appservices', {
        params: {
            serviceCategory: [data.serviceCategory]
        }
    });
    return response.data.data;
}


// **** Booking apis
export const providerFetchBookingAppoinments = async <T extends FetchBookingsResponse | FetchOnlineBookingsForProviderResponse>(params?: FetchOnlineBookingParams): Promise<ApiPaginatedResponse<T>> => {
    const query = buildQueryParams<FetchOnlineBookingParams>(params);
    const response = await axiosInstance.get(`/provider/bookings/${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<T>(response.data.data);
}

export const adminFetchBookingDetails = async (bookingId: Booking["_id"]): Promise<FetchBookingDetailsResponse> => {
    const response = await axiosInstance.get(`/provider/bookings/${bookingId}`);
    return response.data.data;
}

export const providerChangeAppointmentStatus = async (data: ProviderChangeAppointmentStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/provider/bookings/${data.appointmentId}`, data);
    return response.data;
}

export const providerValidateRoomId = async (data: ValidateRoomId): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.get(`/provider/bookings/${data.appointmentId}/can-join?roomId=${data.roomId}`);
    return response.data;
}

export const providerFetchBookingDetails = async (appointmentId: Booking['_id']): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.get(`/provider/bookings${appointmentId}`);
    return response.data;
}

export const providerJoinOrLeftRoomCallBack = async (data: JoinRoomCallbackRequest): Promise<JoinRoomCallbackResponse> => {
    const response = await axiosInstance.patch(`/provider/bookings/${data.videoCallRoomId}/join-left`, data);
    return response.data;
}


// **** Provider services apis
export const providerCreateServiceDetails = createAsyncThunk<ApiBaseResponse, ProviderCreateServiceDetailsRequest>("/provider/addServiceDetails",
    async (data: ProviderCreateServiceDetailsRequest) => {
        const response = await axiosInstance.post(`/provider/service`, data);
        return response.data;
    }
)

export const providerUpdateServiceDetails = async (data: ProviderUpdateServiceDetailsRequest): Promise<ApiBaseResponse> => {
    console.log("provider updating service details");
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
        console.log("data : ",data);
        const response = await axiosInstance.post(`/provider/availabilities`, data);
        return response.data;
    }
)

export const providerFetchServiceAvailability = async (date: Date): Promise<ProviderFetchServiceAvailabilityResponse> => {
    const response = await axiosInstance.get('/provider/availability', { params: { date: date.toISOString() } });
    return response.data.data;
}


// **** Provider profile apis
export const providerFetchProfileDetails = async (): Promise<ProviderFetchProfileDetailsResponse> => {
    const response = await axiosInstance.get('/provider/');
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


// **** Provider plans apis
export const providerFetchPlans = async (): Promise<ProviderFetchPlansResponse[]> => {
    const response = await axiosInstance.get('/provider/plans');
    return response.data.data;
}


// **** Provider subscription apis

export const providerSubscribedPlan = async (): Promise<ProviderSubscribedPlanRespone> => {
    const response = await axiosInstance.get('/provider/subscriptions/subscribed');
    return response.data;
}

export const providerFetchSubscriptions = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchProviderSubscriptionsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/provider/subscriptions${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data.data);
}

export const providerSubscribeToTrialPlan = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/provider/subscriptions/trial');
    return response.data;
}

export const providerFetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<FetchSubscriptionDetailsResponse> => {
    const response = await axiosInstance.get(`/provider/subscriptions/${subscriptionId}`);
    return response.data.data;
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


// **** provider review api
export const providerFetchAllReviews = async (query: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchReviewsResponse>> => {
    const refactoredQuery = buildQueryParams(query);
    const response = await axiosInstance.get(`/provider/reviews${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return response.data.data;
}

export const providerReportReview = async (reviewId: Review["_id"]): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/provider/reviews/${reviewId}`);
    return response.data;
}


// **** provider integration api
export const connectStripeAccount = async (): Promise<{ url: string }> => {
    const response = await axiosInstance.post("/provider/stripe/connect");
    return response.data.data;
};


// **** Provider payment service api

export const providerCheckoutForSubscribePlan = async (data: ProviderCheckoutForSubscribePlanRequest): Promise<ProviderSubscribeToPlanResponse> => {
    const response = await axiosInstance.post('/payments/subscriptions/checkout/session', data)
    return response.data;
}

export const providerFetchPayments = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/payments/provider${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data.data);
}