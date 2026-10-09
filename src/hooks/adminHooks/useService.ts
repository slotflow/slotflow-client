import {
  CreateServicesRequest,
  UpdateServiceRequest,
  FetchServicesResponse,
  UpdateServiceResponse,
  AdminChangeServiceBlockStatusRequest,
  AdminChangeServiceBlockStatusResponse,
  CreateSservicesResponse,
} from '@/shared/types/api/service';
import { toast } from 'react-toastify';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import { UseAdminServiceReturn } from '@/shared/types/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleError } from '@/shared/utils/helper/handleError';
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
    onError: (error: ApiError) => {
      handleError(error, 'Could not block status.');
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
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Could not update service.');
    },
  });

  // Admin creating an app service plan and calls the cache updating function
  const createServiceMutation = useMutation<
    ApiBaseResponse<CreateSservicesResponse>,
    ApiError,
    CreateServicesRequest
  >({
    mutationFn: (data: CreateServicesRequest) => createService(data),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const newServices = res.data;

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

            const PAGE_SIZE = 14;
            const updatedTotalCount = (oldData.totalCount ?? 0) + newServices.length;
            const updatedTotalPages = Math.ceil(updatedTotalCount / PAGE_SIZE);
            const combinedItems = [...newServices, ...oldData.items].slice(0, PAGE_SIZE);

            return {
              ...oldData,
              items: combinedItems,
              totalCount: updatedTotalCount,
              currentPage: oldData.currentPage ?? 1,
              totalPages: updatedTotalPages > 0 ? updatedTotalPages : 1,
            };
          },
        );
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Could not create server.');
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
