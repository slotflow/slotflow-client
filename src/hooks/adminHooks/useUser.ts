import {
  AdminfetchAllUsersResponse,
  AdminChangeUserBlockStatusRequest,
  AdminChangeUserBlockStatusResponse,
  AdminFetchUserProfileDetailsResponse,
} from '@/shared/types/api/user';
import { toast } from 'react-toastify';
import { queryKeys } from '@/shared/utils/constants';
import { UseAdminUserReturn } from '@/shared/types/hooks';
import { changeUserBlockStatus } from '@/services/apis/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleError } from '@/shared/utils/helper/handleError';
import { ApiBaseResponse, ApiError, ApiPaginatedResponse } from '@/shared/types/common';

export const useAdminUser = (): UseAdminUserReturn => {
  const queryClient = useQueryClient();

  const changeUserBlockStatusMutation = useMutation<
    ApiBaseResponse<AdminChangeUserBlockStatusResponse>,
    ApiError,
    AdminChangeUserBlockStatusRequest
  >({
    mutationFn: (data) => {
      if (!data.userId || data.isBlocked === undefined || data.isBlocked === null) {
        throw new Error('Provider details are missing. Please refresh the page.');
      }
      return changeUserBlockStatus(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success(res.message);
        const { _id, isBlocked } = res.data;

        queryClient.setQueriesData<ApiPaginatedResponse<AdminfetchAllUsersResponse>>(
          { queryKey: [queryKeys.USERS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;
            return {
              ...oldData,
              items: oldData.items.map((user) =>
                user._id === _id
                  ? {
                      ...user,
                      isBlocked: isBlocked,
                    }
                  : user,
              ),
            };
          },
        );

        queryClient.setQueryData<AdminFetchUserProfileDetailsResponse>(
          [queryKeys.PROFILE, _id],
          (oldUser) => {
            if (!oldUser) return oldUser;

            return {
              ...oldUser,
              isBlocked: isBlocked,
            };
          },
        );
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Could not change user blocks status.');
    },
  });

  return {
    changeUserBlockStatus: changeUserBlockStatusMutation.mutate,
    changeBlockStatusUserId: changeUserBlockStatusMutation.isPending
      ? changeUserBlockStatusMutation.variables.userId
      : null,
  };
};
