import {
  ApiBaseResponse,
  ApiFetchFunction,
  FetchFunctionBaseQueryParams,
} from '../../shared/types/common';
import {
  CreateServiceRequest,
  FetchServicesResponse,
  ChangeServiceBlockStatusRequest,
  FetchServicesByCategoryResponse,
} from '../../shared/types/api/service';
import { axiosInstance } from '@/lib/axios';
import { ServiceCategory } from '../../shared/types/enums';
import { buildQueryParams } from '../../shared/utils/helper/buildQueryParams';

export const fetchServices: ApiFetchFunction<
  FetchServicesResponse,
  FetchFunctionBaseQueryParams
> = async (queryParams) => {
  const query = buildQueryParams(queryParams);
  const response = await axiosInstance.get(`/services?${query}`);
  return response.data.data;
};

export const createService = async (data: CreateServiceRequest): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.post('/services', data);
  return response.data;
};

export const changeServiceBlockStatus = async (
  data: ChangeServiceBlockStatusRequest,
): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.patch(`/services/${data.serviceId}`, {
    blockStatus: data.isBlocked,
  });
  return response.data;
};

export const fetchServicesByCategory = async (
  categories: ServiceCategory[],
): Promise<ApiBaseResponse<Array<FetchServicesByCategoryResponse>>> => {
  const response = await axiosInstance.get(`/services`, {
    params: {
      serviceCategory: categories,
    },
  });
  return response.data;
};
