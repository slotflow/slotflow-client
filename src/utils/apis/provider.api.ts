import { axiosInstance } from "@/lib/axios";
import {
    ProviderFetchPlansResponse,
    ProviderFetchAddressResponse,
    ProviderSubscribeToPlanRequest,
    ProviderDashboardGraphResponse,
    ProviderSubscribeToPlanResponse,
    ProviderFetchAllServicesResponse,
    ProviderSaveSubscriptionResponse,
    ProviderAddProviderAddressRequest,
    ProviderUpdateProviderInfoRequest,
    ProviderUpdateProviderInfoResponse,
    ProviderUpdateProfileImageResponse,
    ProviderFetchProfileDetailsResponse,
    ProviderFetchServiceDetailsResponse,
    ProviderChangeAppointmentStatusRequest,
    AddProviderServiceAvailabilitiesRequest,
    ProviderFetchDashboardStatsDataResponse,
    ProviderFetchUsersForChatSidebarResponse,
    ProviderFetchServiceAvailabilityResponse,
    ProviderCreateServiceDetailsRequest,
} from "../interface/api/providerApiInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { ApiBaseResponse, FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";
import { FetchBookingDetailsResponse, FetchBookingsResponse, FetchOnlineBookingParams, FetchOnlineBookingsForProviderResponse, FetchPaymentsResponse, FetchProvidersProofsResponse, FetchProviderSubscriptionsResponse, FetchReviewsResponse, FetchSubscriptionDetailsResponse, JoinRoomCallbackRequest, JoinRoomCallbackResponse, UpdateAddressRequest, UpdateAddressResponse, UpdateFileDataRequest, UpdateFileDataResponse, ValidateRoomId } from "../interface/api/commonApiInterface";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { Booking } from "../interface/entityInterface/bookingInterface";
import { Review } from "../interface/entityInterface/reviewInterface";
import { DateRange } from "react-day-picker";


// **** Address apis
export const providerAddProviderAddress = createAsyncThunk<ApiBaseResponse, ProviderAddProviderAddressRequest>("/provider/addAddress",
    async (data: ProviderAddProviderAddressRequest) => {
        const response = await axiosInstance.post(`/provider/addresses`, data);
        return response.data;
    }
)

export const providerFetchProviderAddress = async (): Promise<ProviderFetchAddressResponse> => {
    const response = await axiosInstance.get('/provider/address');
    return response.data.data;
}

export const providerUpdateProviderAddress = async (data: UpdateAddressRequest): Promise<UpdateAddressResponse> => {
    const response = await axiosInstance.patch(`/provider/addresses/${data._id}`, data);
    return response.data;
}


// **** App service apis
export const providerFetchAllAppServices = async (): Promise<ProviderFetchAllServicesResponse> => {
    const response = await axiosInstance.get('/provider/appservices');
    return response.data.data;
}


// **** Booking apis
export const providerFetchBookingAppoinments = async <T extends FetchBookingsResponse | FetchOnlineBookingsForProviderResponse>(params?: FetchOnlineBookingParams): Promise<ApiPaginatedResponse<T>> => {
    const query = buildQueryParams<FetchOnlineBookingParams>(params);
    const response = await axiosInstance.get(`/provider/bookings/${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<T>(response.data);
}

export const adminFetchBookingDetails = async(bookingId: Booking["_id"]): Promise<FetchBookingDetailsResponse> => {
    const response = await axiosInstance.get(`/provider/bookings/${bookingId}`);
    return response.data.data;
}

export const providerChangeAppointmentStatus = async (data: ProviderChangeAppointmentStatusRequest) : Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/provider/bookings/${data.appointmentId}`,data);
    return response.data;
}

export const providerValidateRoomId = async (data: ValidateRoomId): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.get(`/provider/bookings/${data.appointmentId}/can-join?roomId=${data.roomId}`);
    return response.data;
} 

export const providerFetchBookingDetails = async (appointmentId: Booking['_id']) : Promise<ApiBaseResponse> => {
    const response = await axiosInstance.get(`/provider/bookings${appointmentId}`);
    return response.data;
}

export const providerJoinOrLeftRoomCallBack = async (data: JoinRoomCallbackRequest): Promise<JoinRoomCallbackResponse> => {
    const response = await axiosInstance.patch(`/provider/bookings/${data.videoCallRoomId}/join-left`, data);
    return response.data;
}     


// **** Provider services apis
export const providerAddProviderServiceDetails = createAsyncThunk<ApiBaseResponse, ProviderCreateServiceDetailsRequest>("/provider/addServiceDetails",
    async (data: ProviderCreateServiceDetailsRequest) => {
        const response = await axiosInstance.post(`/provider/service`, data);
        return response.data;
    }
)

export const providerFetchProviderServiceDetails = async (): Promise<ProviderFetchServiceDetailsResponse> => {
    const response = await axiosInstance.get('/provider/service');
    return response.data.data;
}


// **** Provider service availability apis
export const providerAddProviderServiceAvailabilities = createAsyncThunk<ApiBaseResponse, AddProviderServiceAvailabilitiesRequest>("/provider/addServiceAvailability",
    async ({ data }: AddProviderServiceAvailabilitiesRequest) => {
        const response = await axiosInstance.post(`/provider/availabilities`, data);
        return response.data;
    }
)

export const providerFetchProviderServiceAvailability = async (date: Date): Promise<ProviderFetchServiceAvailabilityResponse> => {
    const response = await axiosInstance.get('/provider/availability', { params: { date: date.toISOString() } });
    return response.data.data;
}


// **** Provider profile apis
export const providerFetchProviderProfileDetails = async (): Promise<ProviderFetchProfileDetailsResponse> => {
    const response = await axiosInstance.get('/provider/');
    return response.data.data;
}


export const providerUpdateProviderProfileImage = createAsyncThunk<ProviderUpdateProfileImageResponse, FormData>('/provider/profile/image',
    async (formData: FormData) => {
        const response = await axiosInstance.patch('/provider/profile/image', formData);
        return response.data;
    }
)

export const providerUpdateProviderInfo = createAsyncThunk<ProviderUpdateProviderInfoResponse, ProviderUpdateProviderInfoRequest>('/provider/profile',
    async (data: ProviderUpdateProviderInfoRequest) => {
        const response = await axiosInstance.patch('/provider/profile/info', data);
        return response.data;
    }
)

export const providerUpdateIdentityProof = async(data: UpdateFileDataRequest): Promise<UpdateFileDataResponse> => {
    console.log("data : ",data);
    const response = await axiosInstance.patch('/provider/profile/identity', data);
    return response.data;
}

export const providerUpdateProofServiceProof = async(data: UpdateFileDataRequest): Promise<UpdateFileDataResponse> => {
    const response = await axiosInstance.patch('/provider/profile/service', data);
    return response.data;
}

export const providerFetchProviderProofs = async(): Promise<FetchProvidersProofsResponse> => {
    const response = await axiosInstance.get(`/provider/profile/proofs`);
    return response.data.data;
}


// **** Provider plans apis
export const providerFetchProviderPlans = async (): Promise<ProviderFetchPlansResponse[]> => {
    const response = await axiosInstance.get('/provider/plans');
    return response.data.data;
}


// **** Provider subscription apis
// This api will create the stripe session and return the session id 
export const providerSubscribeToPlan = async (data: ProviderSubscribeToPlanRequest): Promise<ProviderSubscribeToPlanResponse> => {
    const response = await axiosInstance.post('/provider/subscriptions/checkout-session', data)
    return response.data;
}

// This api will send the session id to backend and validate the sessionid and retrieve the subscription details
export const providerSaveSubscription = async (sessionId: string): Promise<ProviderSaveSubscriptionResponse> => {
    const response = await axiosInstance.post('/provider/subscriptions', { sessionId });
    return response.data;
}

export const providerFetchProviderSubscriptions = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchProviderSubscriptionsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/provider/subscriptions${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data);
}

export const providerSubscribeToTrialPlan = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/provider/subscriptions/trial');
    return response.data;
}

export const providerFetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<FetchSubscriptionDetailsResponse> => {
    const response = await axiosInstance.get(`/provider/subscriptions/${subscriptionId}`);
    return response.data.subscriptionDetails;
}


// **** Provider payment apis
export const providerFetchProviderPayments = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/provider/payments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}


// **** Provider chat apis
export const providerFetchUsersForChatSideBar = async () : Promise<ProviderFetchUsersForChatSidebarResponse> => {
    const response = await axiosInstance.get('/provider/chat/users');
    return response.data.data
}


// **** Provider dashboard apis
export const providerFetchDashboardStatsData = async () : Promise<ProviderFetchDashboardStatsDataResponse> => {
    const response = await axiosInstance.get('/provider/dashboard/stats');
    return response.data.data;
}

export const providerFetchDashboardGraphData = async (subscription?: string,dateRange?: DateRange) : Promise<ProviderDashboardGraphResponse> => {
    const response = await axiosInstance.get(`/provider/dashboard/graph-data`, { 
        params: { 
            subscription, 
            ...(dateRange ? { start: dateRange.from, end: dateRange.to } : {}),
         } });
    return response.data.data;
}


// **** provider review api
export const providerFetchAllReviews = async (query: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchReviewsResponse>> => {
    const refactoredQuery = buildQueryParams(query);
    const response = await axiosInstance.get(`/provider/reviews${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return response.data
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