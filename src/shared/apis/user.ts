import {
    UserUpdateUserInfoRequest,
    UserUpdateUserInfoResponse,
    AdminfetchAllUsersResponse,
    AdminChangeUserStatusRequest,
    UserUpdateProfileImageRequest,
    UserUpdateProfileImageResponse,
    UserFetchUserProfileDetailsResponse,
    AdminFetchUserProfileDetailsResponse,
    setRoleRequest,
    setRoleResponse,
} from "../interface/api/user";
import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseResponse } from "../helper/parseResponse";
import { buildQueryParams } from "../helper/buildQueryParams";
import { ProviderFetchUsersForChatSidebarResponse } from "../interface/api/provider";
import { ApiBaseResponse, ApiFetchFunction, FetchFunctionBaseQueryParams } from "../interface/commonInterface";

// user set role
export const setRole = async (data: setRoleRequest): Promise<setRoleResponse> => {
    const response = await axiosInstance.patch('/users/me/role', data);
    return response.data;
}

// user fetch own profile details
export const userFetchMyProfileDetails = async (): Promise<UserFetchUserProfileDetailsResponse> => {
    const response = await axiosInstance.get('/users/me');
    return response.data.data;
}

// user update profile image
export const userUpdateProfileImage = createAsyncThunk<UserUpdateProfileImageResponse, UserUpdateProfileImageRequest>("/user/updateProfileImage",
    async (data: UserUpdateProfileImageRequest) => {
        const response = await axiosInstance.patch('/users/me/image', data);
        return response.data;
    }
)

// user update info
export const userUpdateInfo = createAsyncThunk<UserUpdateUserInfoResponse, UserUpdateUserInfoRequest>('/user/updaterUserInfo',
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
    return parseResponse<AdminfetchAllUsersResponse>(response.data.data);
}

// admin changing user block status
export const changeUserBlockStatus = async (data: AdminChangeUserStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/users/${data.userId}/block`, { blockStatus: data.isBlocked });
    return response.data;
}

// admin fetching user profile details
export const fetchUserProfileDetails = async (userId: string): Promise<AdminFetchUserProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data.data;
}

// provider fetching users for chat
export const fetchUsersForChat = async (): Promise<ProviderFetchUsersForChatSidebarResponse> => {
    const response = await axiosInstance.get('/users');
    return response.data.data
}