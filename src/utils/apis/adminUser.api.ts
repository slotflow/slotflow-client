import { axiosInstance } from "../../lib/axios";
import {
    AdminfetchAllUsersResponse,
    AdminChangeUserStatusRequest,
    AdminFetchUserProfileDetailsResponse,
} from "../interface/api/adminUserApiInterface";
import { User } from "../interface/entityInterface/userInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchFunctionBaseQueryParams, ApiBaseResponse } from "../interface/commonInterface";
import { ApiFetchFunction } from "../interface/api/commonApiInterface";

export const adminFetchAllUsers: ApiFetchFunction<
    AdminfetchAllUsersResponse,
    FetchFunctionBaseQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/admin/users${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminfetchAllUsersResponse>(response.data.data);
}

export const adminChangeUserBlockStatus = async (data: AdminChangeUserStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/users/${data.userId}`, { blockStatus: data.isBlocked });
    return response.data;
}

export const adminFetchUserProfileDetails = async (userId: User["_id"]): Promise<AdminFetchUserProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/admin/users/${userId}/profile`);
    return response.data.data;
}

// export const adminFetchUserAddress = async (userId: User["_id"]): Promise<AdminFetchddressResponse> => {
//     const response = await axiosInstance.get(`/admin/users/${userId}/address`);
//     return response.data.data;
// }