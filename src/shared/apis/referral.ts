import { axiosInstance } from "@/lib/axios";
import { buildQueryParams } from "../helper/buildQueryParams";
import { ApiBaseResponse, ApiFetchFunction } from "../interface/commonInterface";
import { FetchReferralDetailsRequest, FetchReferralDetailsResponse, FetchReferralsResponse, FetchReferralssQueryParams } from "../interface/api/referral";

export const fetchReferralDetails = async (data: FetchReferralDetailsRequest): Promise<ApiBaseResponse<FetchReferralDetailsResponse>> => {
    const query = buildQueryParams(data);
    const response = await axiosInstance.get(`/referrals/me?${query}`);
    console.log("response : ", response);
    return response.data;
}

export const fetchReferrals: ApiFetchFunction<
    FetchReferralsResponse,
    FetchReferralssQueryParams
> = async (queryParams) => {
    const query = buildQueryParams(queryParams);
    const response = await axiosInstance.get(`/referrals/?${query}`);
    return response.data.data;
}