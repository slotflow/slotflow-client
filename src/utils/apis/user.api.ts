import { 
    UserCreateReviewRequest,
    CreateUserAddressRequest, 
    UserFetchAddressResponse, 
    UserUpdateUserInfoRequest,
    UserCreateAddressResponse,
    UserUpdateUserInfoResponse,
    UserBookAppointmentResponse, 
    UserBookAnAppointmentRequest, 
    UserFetchAllServicesResponse,
    UpdateUserProfileImageResponse, 
    UserFetchProviderAddressResponse, 
    UserFetchProviderServiceResponse, 
    UserFetchServiceProvidersResponse, 
    UserFetchUserProfileDetailsResponse, 
    UserFetchProviderAvailabilityResponse, 
    UserFetchProviderProfileDetailsResponse,
    UserFetchProvidersForChatSidebarResponse,
} from "../interface/api/userApiInterface";
import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Review } from "../interface/entityInterface/reviewInterface";
import { Booking } from "../interface/entityInterface/bookingInterface";
import { Provider } from "../interface/entityInterface/providerInterface";
import { ApiBaseResponse, FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";
import { FetchBookingDetailsResponse, FetchBookingsResponse, FetchOnlineBookingParams, FetchOnlineBookingsForUserResponse, FetchPaymentsResponse, FetchReviewsResponse, JoinRoomCallbackRequest, JoinRoomCallbackResponse, UpdateAddressRequest, UpdateAddressResponse, ValidateRoomId } from "../interface/api/commonApiInterface";

// **** User profile apis
export const userFetchProfileDetails = async (): Promise<UserFetchUserProfileDetailsResponse> => {
    const response = await axiosInstance.get('/user/profile');
    return response.data.data;
}

export const userUpdateProfileImage = createAsyncThunk<UpdateUserProfileImageResponse, FormData>("/user/updateProfileImage",
    async (payload: FormData) => {
        const response = await axiosInstance.post('/user/profile/image', payload);
        return response.data;
    }
)

export const userUpdateInfo = createAsyncThunk<UserUpdateUserInfoResponse, UserUpdateUserInfoRequest>('/user/updaterUserInfo',
    async (data: UserUpdateUserInfoRequest) => {
        const response = await axiosInstance.patch('/user/profile', data);
        return response.data;
    }
)


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
export const userFetchAllServicesForServiceSelectPage = async (): Promise<Array<UserFetchAllServicesResponse>> => {
    const response = await axiosInstance.get(`/user/appservices`);
    return response.data.data;
}


// **** user service providers apis
// const response = await axiosInstance.get(`/user/providers/${selectedServices.join(",")}`);
export const userSearchServiceProviders = async (selectedServices: string[]): Promise<UserFetchServiceProvidersResponse[]> => {
    const response = await axiosInstance.get(`/user/providers`,{
        params : {selectedServices}
    });
    return response.data.data;
};

export const userFetchProviderDetails = async (providerId : Provider["_id"]) : Promise<UserFetchProviderProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/user/providers/${providerId}`);
    return response.data.data;
}

export const userFetchProviderAddress = async (providerId : Provider["_id"]) : Promise<UserFetchProviderAddressResponse> => {
    const response = await axiosInstance.get(`/user/providers/${providerId}/address`);
    return response.data.data;
}

export const userFetchProviderService = async (providerId : Provider["_id"]) : Promise<UserFetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/user/providers/${providerId}/service`);
    return response.data.data;
}

export const userFetchProviderServiceAvailability = async (data : {providerId : Provider["_id"], date : Date}) : Promise<UserFetchProviderAvailabilityResponse> => {
    const response = await axiosInstance.get(`/user/providers/${data.providerId}/availability`, {
        params : {
            date : data.date.toISOString()
        }
    });
    return response.data.data;
}


// user booking apis
export const userBookAnAppointment = async (data : UserBookAnAppointmentRequest) : Promise<UserBookAppointmentResponse>  => {
    const response = await axiosInstance.post('/user/bookings/checkout-session', data);
    return response.data;
}

export const userSaveAppointmentBooking = async (sessionId: string) : Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/user/bookings', { sessionId });
    return response.data;
}

export const userFetchBookings = async <T extends FetchBookingsResponse | FetchOnlineBookingsForUserResponse> (query?: FetchOnlineBookingParams) : Promise<ApiPaginatedResponse<T>> => {
    const refactoredQuery = buildQueryParams<FetchOnlineBookingParams>(query);
    const response = await axiosInstance.get(`/user/bookings${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return parseNewCommonResponse<T>(response.data);
}

export const userFetchBookingDetails = async(bookingId: Booking["_id"]): Promise<FetchBookingDetailsResponse> => {
    const response = await axiosInstance.get(`/user/bookings/${bookingId}`);
    return response.data.data;
}

export const userCancelBooking = async (bookingId: Booking["_id"]) : Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/user/bookings/${bookingId}`);
    return response.data;
}

export const userValidateRoomId = async (data: ValidateRoomId): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.get(`/user/bookings/${data.appointmentId}/can-join?roomId=${data.roomId}`);
    return response.data;
} 

export const userJoinOrLeftRoomCallBack = async (data: JoinRoomCallbackRequest): Promise<JoinRoomCallbackResponse> => {
    const response = await axiosInstance.patch(`/user/bookings/${data.videoCallRoomId}/join-left`, data);
    return response.data;
}      

// user payment apis
export const userFetchPayments = async (query?: FetchFunctionParams) : Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const refactoredQuery = buildQueryParams(query);
    const response = await axiosInstance.get(`/user/payments${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}


// user chat apis
export const UserFetchProvidersForChatSideBar = async () : Promise<UserFetchProvidersForChatSidebarResponse> => {
    const response = await axiosInstance.get('/user/chat/providers');
    return response.data.data;
}


// user review api
export const userCreateReview = async (data: UserCreateReviewRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/user/reviews/', data );
    return response.data;
}

export const userFetchAllReviews = async (payload : FetchFunctionParams): Promise<ApiPaginatedResponse<FetchReviewsResponse>> => {
    const { id } = payload;
    const refactoredQuery = buildQueryParams(payload);
    const response = await axiosInstance.get(`/user/reviews/${id}${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return response.data;
}

export const userDeleteReview = async (reviewId: Review["_id"]): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.delete(`/user/reviews/${reviewId}`);
    return response.data;
}