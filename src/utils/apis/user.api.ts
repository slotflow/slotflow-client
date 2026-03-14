import {
    CreateUserAddressRequest,
    UserFetchAddressResponse,
    UserUpdateUserInfoRequest,
    UserCreateAddressResponse,
    UserUpdateUserInfoResponse,
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
import { ServiceCategory } from "../interface/enums";
import { ApiBaseResponse } from "../interface/commonInterface";
import { Provider } from "../interface/entityInterface/providerInterface";
import { UpdateAddressRequest, UpdateAddressResponse } from "../interface/api/commonApiInterface";

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

export const userSetPushNotification = async (data: boolean): Promise<ApiBaseResponse> => {
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
    console.log("categories : ", categories);
    const response = await axiosInstance.get(`/user/appservices`, {
        params: {
            categories
        }
    });
    return response.data.data;
}


// **** user service providers apis
export const userSearchServiceProviders = async (data: UserFetchServiceProvidersRequest): Promise<Array<UserFetchServiceProvidersResponse>> => {
    const response = await axiosInstance.get(`/user/providers`, {
        params: { ...data },
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

// user chat apis
export const UserFetchProvidersForChatSideBar = async (): Promise<UserFetchProvidersForChatSidebarResponse> => {
    const response = await axiosInstance.get('/user/chat/providers');
    return response.data.data;
}