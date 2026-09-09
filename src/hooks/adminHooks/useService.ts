import {
  CreateServiceRequest,
  UpdateServiceRequest,
  FetchServicesResponse,
  UpdateServiceResponse,
  AdminChangeServiceBlockStatusRequest,
  AdminChangeServiceBlockStatusResponse,
} from '@/shared/types/api/service';
import { toast } from 'react-toastify';
import { appConfig } from '@/config/env';
import { queryKeys } from '@/shared/utils/constants';
import { UseAdminServiceReturn } from '@/shared/types/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiBaseResponse, ApiError, ApiPaginatedResponse } from '@/shared/types/common';
import { changeServiceBlockStatus, createService, updateService } from '@/services/apis/service';

export const useAdminService = (): UseAdminServiceReturn => {
  const queryClient = useQueryClient();

  // Admin change servic'es block status and syncs the React Query cache.
  const changeBlockStatusMutation = useMutation<
    ApiBaseResponse<AdminChangeServiceBlockStatusResponse>,
    ApiError,
    AdminChangeServiceBlockStatusRequest
  >({
    mutationFn: changeServiceBlockStatus,
    onSuccess: (res, serviceData) => {
      if (res.success) {
        toast.success(res.message);
        // Fallback to invalidation if no service list is cached
        const hasCache = queryClient
          .getQueriesData<ApiPaginatedResponse<FetchServicesResponse>>({
            queryKey: [queryKeys.APP_SERVICES],
          })
          .some(([, data]) => Boolean(data?.items));

        if (!hasCache) {
          queryClient.invalidateQueries({ queryKey: [queryKeys.APP_SERVICES] });
          return;
        }

        // Direct cache update to avoid full table re-fetches
        queryClient.setQueriesData<ApiPaginatedResponse<FetchServicesResponse>>(
          { queryKey: [queryKeys.APP_SERVICES] },
          (oldData) => {
            if (!oldData?.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((service) =>
                service._id === serviceData.serviceId
                  ? {
                      ...service,
                      isBlocked: res.data?.isBlocked ?? serviceData.isBlocked,
                    }
                  : service,
              ),
            };
          },
        );
      }
    },
    onError: (error) => {
      if (appConfig.isDevelopment) {
        console.error('Error while changing service status:', error);
      }
    },
  });

  // Update the services list cache
  const updateServicesListCache = (serviceData: FetchServicesResponse) => {
    const hasCache = queryClient
      .getQueriesData<ApiPaginatedResponse<FetchServicesResponse>>({
        queryKey: [queryKeys.APP_SERVICES],
      })
      .some(([, data]) => Boolean(data && data.items));

    if (!hasCache) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.APP_SERVICES] });
      return;
    }

    queryClient.setQueriesData<ApiPaginatedResponse<FetchServicesResponse>>(
      { queryKey: [queryKeys.APP_SERVICES] },
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

  /// Admin update service with only changed fields and call the cache updating function
  const updateServiceMutation = useMutation<
    ApiBaseResponse<UpdateServiceResponse>,
    ApiError,
    UpdateServiceRequest
  >({
    mutationFn: (data: UpdateServiceRequest) => updateService(data),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const updatedService = res.data;
        updateServicesListCache(updatedService);
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      if (appConfig.isDevelopment) {
        console.error('Error in updateServiceMutation:', error);
      }
    },
  });

  // Admin creating an app service plan and calls the cache updating function
  const createServiceMutation = useMutation<ApiBaseResponse, ApiError, CreateServiceRequest>({
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
    changeServiceBlockStatus: changeBlockStatusMutation.mutate,
    changeBlockStatusServiceId: changeBlockStatusMutation.isPending
      ? changeBlockStatusMutation.variables?.serviceId
      : null,
    updateService: updateServiceMutation.mutateAsync,
    createService: createServiceMutation.mutateAsync,
  };
};
