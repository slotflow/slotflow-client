import {
  ApiBaseResponse,
  ApiFetchFunction,
  ApiPaginatedResponse,
  FetchFunctionBaseQueryParams,
} from '../../shared/types/common';
import {
  CreatePlanRequest,
  UpdatePlanRequest,
  UpdatePlanResponse,
  CreatePlanResponse,
  ResyncPlanStripeRequest,
  ResyncPlanStripeResponse,
  ProviderFetchPlansResponse,
  AdminFetchAllPlansResponse,
  ChangePlanBlockStatusRequest,
  AdminFetchPlanDetailsResponse,
  AdminFetchPlanDetailsRequest,
  ChangePlanBlockStatusResponse,
} from '../../shared/types/api/plan';
import { axiosInstance } from '@/lib/axios';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';

export const adminFetchAllPlans: ApiFetchFunction<
  AdminFetchAllPlansResponse,
  FetchFunctionBaseQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/plans?${query}`);
  return response.data.data;
};

export const createPlan = async (
  formData: CreatePlanRequest,
): Promise<ApiBaseResponse<CreatePlanResponse>> => {
  const response = await axiosInstance.post('/plans', formData);
  console.log('response : ', response);
  return response.data;
};

export const updatePlan = async (
  formData: UpdatePlanRequest,
): Promise<ApiBaseResponse<UpdatePlanResponse>> => {
  const response = await axiosInstance.patch(`/plans/${formData.planId}`, formData);
  return response.data;
};

export const changePlanBlockStatus = async (
  data: ChangePlanBlockStatusRequest,
): Promise<ApiBaseResponse<ChangePlanBlockStatusResponse>> => {
  const response = await axiosInstance.patch(`/plans/${data.planId}/block`, {
    blockStatus: data.isBlocked,
  });
  return response.data;
};

export const providerFetchPlans = async (): Promise<
  ApiBaseResponse<ApiPaginatedResponse<ProviderFetchPlansResponse>>
> => {
  const response = await axiosInstance.get('/plans');
  return response.data;
};

export const resyncPlanStripe = async (
  data: ResyncPlanStripeRequest,
): Promise<ApiBaseResponse<ResyncPlanStripeResponse>> => {
  const response = await axiosInstance.post(`/plans/${data.planId}/resync`);
  return response.data;
};

export const adminFetchPlanDetails = async (
  data: AdminFetchPlanDetailsRequest,
): Promise<ApiBaseResponse<AdminFetchPlanDetailsResponse>> => {
  const response = await axiosInstance.get(`/plans/${data.planId}`);
  return response.data;
};
