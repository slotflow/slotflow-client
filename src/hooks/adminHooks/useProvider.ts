import { toast } from 'react-toastify';
import {
  adminRejectProvider,
  adminApproveProvider,
  adminChangeProviderTrustTag,
  adminChangeProviderBlockStatus,
} from '@/services/apis/providerProfile';
import { useDispatch } from 'react-redux';
import {
  AdminRejectProviderRequest,
  AdminApproveProviderRequest,
  AdminRejectProviderResponse,
  AdminApproveProviderResponse,
  AdminFetchAllProvidersResponse,
  AdminChangeProviderTrustTagRequest,
  AdminChangeProviderTrustTagResponse,
  AdminChangeProviderBlockStatusRequest,
  AdminChangeProviderBlockStatusResponse,
  AdminFetchProviderProfileDetailsResponse,
} from '@/shared/types/api/providerProfile';
import { AppDispatch } from '@/app/store/appStore';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import { UseAdminProviderReturn } from '@/shared/types/hooks';
import { AdminVerificationStatus } from '@/shared/types/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setAdminVerificationState } from '@/app/store/slices/authSlice';
import { handleError } from '@/shared/utils/helper/handleError';
import { ApiBaseResponse, ApiError, ApiPaginatedResponse } from '@/shared/types/common';

export const useAdminProvider = (): UseAdminProviderReturn => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  // Admin approve provider
  const approveProviderMutation = useMutation<
    ApiBaseResponse<AdminApproveProviderResponse>,
    ApiError,
    AdminApproveProviderRequest
  >({
    mutationFn: (data) => {
      if (!data.providerId) {
        throw new Error('Provider details are missing. Please refresh the page.');
      }
      return adminApproveProvider(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success(res.message);
        const { _id, adminVerificationStatus, isAdminVerified } = res.data;
        queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllProvidersResponse>>(
          { queryKey: [queryKeys.PROVIDERS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((provider) =>
                provider._id === _id
                  ? {
                      ...provider,
                      isAdminVerified: isAdminVerified,
                      adminVerificationStatus: adminVerificationStatus,
                    }
                  : provider,
              ),
            };
          },
        );

        queryClient.setQueryData<AdminFetchProviderProfileDetailsResponse>(
          [queryKeys.PROFILE, _id],
          (oldProvider) => {
            if (!oldProvider) return oldProvider;

            return {
              ...oldProvider,
              isAdminVerified,
              adminVerificationStatus,
            };
          },
        );
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Could not approve provider.');
    },
  });

  // Admin change provider slotflow trust tag status
  const changeProviderSlotflowTrustTagMutation = useMutation<
    ApiBaseResponse<AdminChangeProviderTrustTagResponse>,
    ApiError,
    AdminChangeProviderTrustTagRequest
  >({
    mutationFn: (data) => {
      if (
        !data.providerId ||
        data.trustedBySlotflow === undefined ||
        data.trustedBySlotflow === null
      ) {
        throw new Error('Provider details are missing. Please refresh the page.');
      }
      return adminChangeProviderTrustTag(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success(res.message);
        const { _id, trustedBySlotflow } = res.data;

        queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllProvidersResponse>>(
          { queryKey: [queryKeys.PROVIDERS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((provider) =>
                provider._id === _id
                  ? {
                      ...provider,
                      trustedBySlotflow,
                    }
                  : provider,
              ),
            };
          },
        );

        queryClient.setQueryData<AdminFetchProviderProfileDetailsResponse>(
          [queryKeys.PROFILE, _id],
          (oldProvider) => {
            if (!oldProvider) return oldProvider;

            return {
              ...oldProvider,
              trustedBySlotflow,
            };
          },
        );
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Could not chage provider trust tag status.');
    },
  });

  // Admin change provider block status
  const changeProviderBlockStatusMutation = useMutation<
    ApiBaseResponse<AdminChangeProviderBlockStatusResponse>,
    ApiError,
    AdminChangeProviderBlockStatusRequest
  >({
    mutationFn: (data) => {
      if (!data.providerId || data.isBlocked === undefined || data.isBlocked === null) {
        throw new Error('Provider details are missing. Please refresh the page.');
      }
      return adminChangeProviderBlockStatus(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success(res.message);
        const { _id, isBlocked } = res.data;

        queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllProvidersResponse>>(
          { queryKey: [queryKeys.PROVIDERS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;
            return {
              ...oldData,
              items: oldData.items.map((provider) =>
                provider._id === _id
                  ? {
                      ...provider,
                      isBlocked: isBlocked,
                    }
                  : provider,
              ),
            };
          },
        );

        queryClient.setQueryData<AdminFetchProviderProfileDetailsResponse>(
          [queryKeys.PROFILE, _id],
          (oldProvider) => {
            if (!oldProvider) return oldProvider;

            return {
              ...oldProvider,
              isBlocked: isBlocked,
            };
          },
        );
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Could not change provider blocks status.');
    },
  });

  // Admin reject provider request for approval
  const rejectProviderMutation = useMutation<
    ApiBaseResponse<AdminRejectProviderResponse>,
    ApiError,
    AdminRejectProviderRequest
  >({
    mutationFn: (data) => adminRejectProvider(data),
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success(res.message);
        const {
          _id,
          isAddressVerified,
          isAvailabilityVerified,
          isProofsVerified,
          isServiceDetailsVerified,
        } = res.data;
        dispatch(setAdminVerificationState(AdminVerificationStatus.REJECTED));
        queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllProvidersResponse>>(
          { queryKey: [queryKeys.PROVIDERS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((provider) =>
                provider._id === _id
                  ? {
                      ...provider,
                      isAdminVerified: false,
                      adminVerificationStatus: AdminVerificationStatus.REJECTED,
                    }
                  : provider,
              ),
            };
          },
        );

        queryClient.setQueryData<AdminFetchProviderProfileDetailsResponse>(
          [queryKeys.PROFILE, _id],
          (oldProvider) => {
            if (!oldProvider) return oldProvider;

            return {
              ...oldProvider,
              isAdminVerified: false,
              adminVerificationStatus: AdminVerificationStatus.REJECTED,
              isAddressVerified: isAddressVerified,
              isAvailabilityVerified: isAvailabilityVerified,
              isProofsVerified: isProofsVerified,
              isServiceDetailsVerified: isServiceDetailsVerified,
            };
          },
        );
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Could not reject provider.');
    },
  });

  return {
    approveProvider: approveProviderMutation.mutate,
    approvingProviderId: approveProviderMutation.isPending
      ? approveProviderMutation.variables?.providerId
      : null,
    changeProviderSlotflowTrustTag: changeProviderSlotflowTrustTagMutation.mutate,
    changeTrustTagProviderId: changeProviderSlotflowTrustTagMutation.isPending
      ? changeProviderSlotflowTrustTagMutation.variables?.providerId
      : null,
    changeProviderBlockStatus: changeProviderBlockStatusMutation.mutate,
    changeBlockStatusProviderId: changeProviderBlockStatusMutation.isPending
      ? changeProviderBlockStatusMutation.variables?.providerId
      : null,
    rejectProvider: rejectProviderMutation.mutateAsync,
    rejectingProviderId: rejectProviderMutation.isPending
      ? rejectProviderMutation.variables?.providerId
      : null,
  };
};
