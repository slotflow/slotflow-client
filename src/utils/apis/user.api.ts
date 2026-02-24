import {
    UserCreateReviewRequest,
    CreateUserAddressRequest,
    UserFetchAddressResponse,
    UserUpdateUserInfoRequest,
    UserCreateAddressResponse,
    UserUpdateUserInfoResponse,
    UserBookAppointmentResponse,
    UserBookAnAppointmentRequest,
    UserFetchAllAppServicesResponse,
    UserUpdateProfileImageRequest,
    UserUpdateProfileImageResponse,
    UserFetchProviderAddressResponse,
    UserFetchProviderServiceResponse,
    UserFetchServiceProvidersResponse,
    UserFetchUserProfileDetailsResponse,
    UserFetchProviderAvailabilityResponse,
    UserFetchProviderProfileDetailsResponse,
    UserFetchProvidersForChatSidebarResponse,
    UserFetchServiceProvidersRequest,
} from "../interface/api/userApiInterface";
import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildQueryParams } from "../helper";
import { Review } from "../interface/entityInterface/reviewInterface";
import { Booking } from "../interface/entityInterface/bookingInterface";
import { Provider } from "../interface/entityInterface/providerInterface";
import { ApiBaseResponse, FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";
import { FetchReviewsResponse, JoinRoomCallbackRequest, JoinRoomCallbackResponse, UpdateAddressRequest, UpdateAddressResponse } from "../interface/api/commonApiInterface";
import { ServiceCategory } from "../interface/enums";

// **** User profile apis
export const userFetchProfileDetails = async (): Promise<UserFetchUserProfileDetailsResponse> => {
    const response = await axiosInstance.get('/user/profile');
    return response.data.data;
}

export const userUpdateProfileImage = createAsyncThunk<UserUpdateProfileImageResponse, UserUpdateProfileImageRequest>("/user/updateProfileImage",
    async (data: UserUpdateProfileImageRequest) => {
        const response = await axiosInstance.post('/user/profile/image', data);
        return response.data;
    }
)

export const userUpdateInfo = createAsyncThunk<UserUpdateUserInfoResponse, UserUpdateUserInfoRequest>('/user/updaterUserInfo',
    async (data: UserUpdateUserInfoRequest) => {
        const response = await axiosInstance.patch('/user/profile', data);
        return response.data;
    }
)

export const userSetPushNotification = async(data: boolean): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch('/user/profile/push-notification', { allowPushNotification: data });
    return response.data;
}


// **** user address apis
export const userCreateUserAddress = async (data: CreateUserAddressRequest): Promise<UserCreateAddressResponse> => {
    const response = await axiosInstance.post('/user/addresses', data);
    return response.data;
}

export const userFetchAddress = async (): Promise<UserFetchAddressResponse> => {
    const response = await axiosInstance.get('/user/address');
    return response.data.data;
}

export const userUpdateAddress = async (data: UpdateAddressRequest): Promise<UpdateAddressResponse> => {
    const response = await axiosInstance.patch(`/user/addresses/${data._id}`, data);
    return response.data;
}


// **** user app services apis
export const userFetchAllAppServices = async (categories: ServiceCategory[]): Promise<Array<UserFetchAllAppServicesResponse>> => {
    const response = await axiosInstance.get(`/user/appservices`, {
        params: {
            categories
        }
    });
    return response.data.data;
}


// **** user service providers apis
// const response = await axiosInstance.get(`/user/providers/${selectedServices.join(",")}`);
export const userSearchServiceProviders = async (data: UserFetchServiceProvidersRequest): Promise<Array<UserFetchServiceProvidersResponse>> => {
    const response = await axiosInstance.get(`/user/providers`, {
        params: {...data},
    });
    return response.data.data;
};

export const userFetchProviderDetails = async (providerId: Provider["_id"]): Promise<UserFetchProviderProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/user/providers/${providerId}`);
    return response.data.data;
}

export const userFetchProviderAddress = async (providerId: Provider["_id"]): Promise<UserFetchProviderAddressResponse> => {
    const response = await axiosInstance.get(`/user/providers/${providerId}/address`);
    return response.data.data;
}

export const userFetchProviderService = async (providerId: Provider["_id"]): Promise<UserFetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/user/providers/${providerId}/service`);
    return response.data.data;
}

export const userFetchProviderServiceAvailability = async (data: { providerId: Provider["_id"], date: Date }): Promise<UserFetchProviderAvailabilityResponse> => {
    const response = await axiosInstance.get(`/user/providers/${data.providerId}/availability`, {
        params: {
            date: data.date.toISOString()
        }
    });
    return response.data.data;
}


// user booking apis
export const userBookAnAppointment = async (data: UserBookAnAppointmentRequest): Promise<UserBookAppointmentResponse> => {
    const response = await axiosInstance.post('/user/bookings/checkout-session', data);
    return response.data;
}

export const userSaveAppointmentBooking = async (sessionId: string): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/user/bookings', { sessionId });
    return response.data;
}

export const userCancelBooking = async (bookingId: Booking["_id"]): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/user/bookings/${bookingId}`);
    return response.data;
}

export const userJoinOrLeftRoomCallBack = async (data: JoinRoomCallbackRequest): Promise<JoinRoomCallbackResponse> => {
    const response = await axiosInstance.patch(`/user/bookings/${data.videoCallRoomId}/join-left`, data);
    return response.data;
}


// user chat apis
export const UserFetchProvidersForChatSideBar = async (): Promise<UserFetchProvidersForChatSidebarResponse> => {
    const response = await axiosInstance.get('/user/chat/providers');
    return response.data.data;
}


// user review api
export const userCreateReview = async (data: UserCreateReviewRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/user/reviews/', data);
    return response.data;
}

export const userFetchAllReviews = async (payload: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchReviewsResponse>> => {
    const { id } = payload;
    const refactoredQuery = buildQueryParams(payload);
    const response = await axiosInstance.get(`/user/reviews/${id}${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return response.data.data;
}

export const userDeleteReview = async (reviewId: Review["_id"]): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.delete(`/user/reviews/${reviewId}`);
    return response.data;
}