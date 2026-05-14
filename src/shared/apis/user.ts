import {
    PreBoardingRequest,
    PreBoardingResponse,
    UpdatePasswordRequest,
    UserUpdateUserInfoRequest,
    UserUpdateUserInfoResponse,
    AdminfetchAllUsersResponse,
    AdminChangeUserStatusRequest,
    UserUpdateProfileImageRequest,
    UserUpdateProfileImageResponse,
    UserFetchUserProfileDetailsResponse,
    AdminFetchUserProfileDetailsResponse,
} from "../interface/api/user";
import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildQueryParams } from "../helper/buildQueryParams";
import { FetchUsersForChatSidebarResponse } from "../interface/api/user";
import { ApiBaseResponse, ApiFetchFunction, FetchFunctionBaseQueryParams } from "../interface/commonInterface";

// user preboarding
export const postPreBoarding = async (payload: PreBoardingRequest): Promise<ApiBaseResponse<PreBoardingResponse>> => {
    const response = await axiosInstance.patch("/users/me/preboarding", payload);
    return response.data;
}

// user fetch own profile details
export const userFetchMyProfileDetails = async (): Promise<ApiBaseResponse<UserFetchUserProfileDetailsResponse>> => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
}

// user update profile image
export const userUpdateProfileImage = createAsyncThunk<ApiBaseResponse<UserUpdateProfileImageResponse>, UserUpdateProfileImageRequest>("/user/updateProfileImage",
    async (data: UserUpdateProfileImageRequest) => {
        const response = await axiosInstance.patch('/users/me/image', data);
        return response.data;
    }
)

// user update info
export const userUpdateInfo = createAsyncThunk<ApiBaseResponse<UserUpdateUserInfoResponse>, UserUpdateUserInfoRequest>('/user/updaterUserInfo',
    async (data: UserUpdateUserInfoRequest) => {
        const response = await axiosInstance.patch('/users/me', data);
        return response.data;
    }
)

// user set push notification
export const userSetPushNotification = async (data: boolean): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch('/users/me/notification-settings', { allowPushNotification: data });
    return response.data;
}

// admin fetching users
export const fetchUsers: ApiFetchFunction<
    AdminfetchAllUsersResponse,
    FetchFunctionBaseQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/users?${query}`);
    return response.data.data;
}

// admin changing user block status
export const changeUserBlockStatus = async (data: AdminChangeUserStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/users/${data.userId}/block`, { blockStatus: data.isBlocked });
    return response.data;
}

// admin fetching user profile details
export const fetchUserProfileDetails = async (userId: string): Promise<ApiBaseResponse<AdminFetchUserProfileDetailsResponse>> => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
}

// provider fetching users for chat
export const fetchUsersForChat = async (): Promise<ApiBaseResponse<FetchUsersForChatSidebarResponse>> => {
    const response = await axiosInstance.get('/users');
    return response.data;
}

// user update password
export const updatePassword = async (data: UpdatePasswordRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch("/users/password", data);
    return response.data;
}