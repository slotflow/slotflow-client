import { appConfig } from '@/config/env';
import { QUERY_KEYS } from '@/shared/utils/constants';
import { UseAdminServiceReturn } from '@/shared/types/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiBaseResponse, ApiPaginatedResponse } from '@/shared/types/common';
import { changeServiceBlockStatus, createService, updateService } from '@/services/apis/service';
import {
  CreateServiceRequest,
  UpdateServiceRequest,
  FetchServicesResponse,
  ChangeServiceBlockStatusRequest,
  ChangeServiceBlockStatusResponse,
} from '@/shared/types/api/service';

/**
 * Custom hook for managing App Service API interactions and React Query cache state.
 *
 * @returns An object containing App Service management functions.
 */
export const useAdminService = (): UseAdminServiceReturn => {
  const queryClient = useQueryClient();

  /**
   * Updates a servic'es block status and syncs the React Query cache.
   *
   * @param serviceData is the request payload
   * @returns A promise resolving to the api response containing status success and updated service details.
   */
  const changeBlockStatusMutation = useMutation<
    ApiBaseResponse<ChangeServiceBlockStatusResponse>,
    Error,
    ChangeServiceBlockStatusRequest
  >({
    mutationFn: changeServiceBlockStatus,
    onSuccess: (res, serviceData) => {
      if (!res.success) return;

      // Fallback to invalidation if no service list is cached
      const hasCache = queryClient
        .getQueriesData<ApiPaginatedResponse<FetchServicesResponse>>({
          queryKey: [QUERY_KEYS.APP_SERVICES],
        })
        .some(([, data]) => Boolean(data?.items));

      if (!hasCache) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APP_SERVICES] });
        return;
      }

      // Direct cache update to avoid full table re-fetches
      queryClient.setQueriesData<ApiPaginatedResponse<FetchServicesResponse>>(
        { queryKey: [QUERY_KEYS.APP_SERVICES] },
        (oldData) => {
          if (!oldData?.items) return oldData;

          return {
            ...oldData,
            items: oldData.items.map((service) =>
              service._id === serviceData._id
                ? {
                    ...service,
                    isBlocked: res.data?.isBlocked ?? serviceData.isBlocked,
                  }
                : service,
            ),
          };
        },
      );
    },
    onError: (error) => {
      if (appConfig.isDevelopment) {
        console.error('Error while changing service status:', error);
      }
    },
  });

  /**
   * update the services list cache
   *
   * @param data is the request payload
   */
  const updateServicesListCache = (serviceData: FetchServicesResponse) => {
    const hasCache = queryClient
      .getQueriesData<ApiPaginatedResponse<FetchServicesResponse>>({
        queryKey: [QUERY_KEYS.APP_SERVICES],
      })
      .some(([, data]) => Boolean(data && data.items));

    if (!hasCache) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APP_SERVICES] });
      return;
    }

    queryClient.setQueriesData<ApiPaginatedResponse<FetchServicesResponse>>(
      { queryKey: [QUERY_KEYS.APP_SERVICES] },
      (oldData) => {
        if (!oldData?.items) return oldData;

        const isExistingService = oldData.items.some((service) => service._id === serviceData._id);

        if (isExistingService) {
          return {
            ...oldData,
            items: oldData.items.map((service) =>
              service._id === serviceData._id ? { ...service, ...serviceData } : service,
            ),
          };
        }

        return {
          ...oldData,
          items: [serviceData, ...oldData.items],
          totalCount: (oldData.totalCount ?? 0) + 1,
        };
      },
    );
  };

  /**
   * update service with only changed fields and call the cache updating function
   *
   * @param data is the request payload
   */
  const updateServiceMutation = useMutation({
    mutationFn: (data: UpdateServiceRequest) => updateService(data),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const updatedService = res.data;
        updateServicesListCache(updatedService);
      }
    },
    onError: (error) => {
      if (appConfig.isDevelopment) {
        console.error('Error in updateServiceMutation:', error);
      }
    },
  });

  /**
   * creating a app service plan and calls the cache updating function
   *
   * @param data is the request payload
   */
  const createServiceMutation = useMutation({
    mutationFn: (data: CreateServiceRequest) => createService(data),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const updatedService = res.data;
        updateServicesListCache(updatedService);
      }
    },
    onError: (error) => {
      if (appConfig.isDevelopment) {
        console.error('Error in createServiceMutation:', error);
      }
    },
  });

  return {
    changeServiceBlockStatus: changeBlockStatusMutation.mutateAsync,
    changeBlockStatusServiceId: changeBlockStatusMutation.isPending
      ? changeBlockStatusMutation.variables?._id
      : null,
    updateService: updateServiceMutation.mutateAsync,
    createService: createServiceMutation.mutateAsync,
  };
};
