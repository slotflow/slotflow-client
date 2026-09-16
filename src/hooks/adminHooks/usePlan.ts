import {
  createPlan,
  updatePlan,
  resyncPlanStripe,
  changePlanBlockStatus,
} from '@/services/apis/plan';
import {
  UpdatePlanRequest,
  CreatePlanRequest,
  UpdatePlanResponse,
  CreatePlanResponse,
  ResyncPlanStripeRequest,
  ResyncPlanStripeResponse,
  AdminFetchAllPlansResponse,
  ChangePlanBlockStatusRequest,
  ChangePlanBlockStatusResponse,
} from '@/shared/types/api/plan';
import { toast } from 'react-toastify';
import { queryKeys } from '@/shared/utils/constants';
import { UseAdminPlanReturn } from '@/shared/types/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleMutationError } from '@/shared/utils/helper/handleMutationError';
import { ApiBaseResponse, ApiError, ApiPaginatedResponse } from '@/shared/types/common';

// Custom hook for managing admin plan API interactions and React Query cache state
export const useAdminPlan = (): UseAdminPlanReturn => {
  const queryClient = useQueryClient();

  // Admin updates a plan's block status
  const changePlanBlockStatusMutation = useMutation<
    ApiBaseResponse<ChangePlanBlockStatusResponse>,
    ApiError,
    ChangePlanBlockStatusRequest
  >({
    mutationFn: (data) => {
      if (!data.planId || data.isBlocked === undefined || data.isBlocked === null) {
        throw new Error('Provider details are missing. Please refresh the page.');
      }
      return changePlanBlockStatus(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success(res.message);
        const { _id, isBlocked } = res.data;

        queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>(
          { queryKey: [queryKeys.PLANS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((plan) =>
                plan._id === _id
                  ? {
                      ...plan,
                      isBlocked: isBlocked,
                    }
                  : plan,
              ),
            };
          },
        );

        queryClient.setQueryData<UpdatePlanResponse>([queryKeys.PLAN_DETAILS, _id], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            isBlocked: isBlocked,
          };
        });
      }
    },
    onError: (error: ApiError) => {
      handleMutationError(error, 'Could not change plan block status.');
    },
  });

  // Admin resync the plan details with stripe product
  const resyncStripeMutation = useMutation<
    ApiBaseResponse<ResyncPlanStripeResponse>,
    ApiError,
    ResyncPlanStripeRequest
  >({
    mutationFn: (data) => {
      if (!data.planId) {
        throw new Error('Plan details are missing. Please refresh the page.');
      }
      return resyncPlanStripe(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success(res.message);
        const { _id, stripePlanDetails, stripeSync } = res.data;

        queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>(
          { queryKey: [queryKeys.PLANS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((plan) =>
                plan._id === _id
                  ? {
                      ...plan,
                      stripePlanDetails,
                      stripeSync,
                    }
                  : plan,
              ),
            };
          },
        );
      }
    },
    onError: (error) => {
      handleMutationError(error, 'Could not resync plan with stripe.');
    },
  });

  /**
   * Update the plans list cache
   *  if plan is editing it will update only that specific plan in the list
   * or isEdit is false we update the list by appending the created plan
   *
   * @param isEdit boolean value to check the plan is editing or creting
   */
  const updatePlansListCache = (planData: AdminFetchAllPlansResponse, isEdit: boolean) => {
    const hasCache = queryClient
      .getQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>({
        queryKey: [queryKeys.PLANS],
      })
      .some(([, data]) => Boolean(data && data.items));

    if (!hasCache) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.PLANS] });
      return;
    }

    queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>(
      { queryKey: [queryKeys.PLANS] },
      (oldData) => {
        if (!oldData || !oldData.items) return oldData;

        if (isEdit) {
          return {
            ...oldData,
            items: oldData.items.map((plan) =>
              plan._id === planData._id ? { ...plan, ...planData } : plan,
            ),
          };
        }

        return {
          ...oldData,
          items: [planData, ...oldData.items],
          totalCount: (oldData.totalCount ?? 0) + 1,
        };
      },
    );
  };

  // Admin Update plan with only changed fields and call the cache updating function
  const updatePlanMutation = useMutation<
    ApiBaseResponse<UpdatePlanResponse>,
    ApiError,
    UpdatePlanRequest
  >({
    mutationFn: (data) => {
      if (!data.planId) {
        throw new Error('Plan details are missing. Please refresh the page.');
      }
      return updatePlan(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success(res.message);
        const updatedPlan = res.data;

        queryClient.setQueryData<UpdatePlanResponse>([queryKeys.PLAN_DETAILS, updatedPlan._id], {
          ...updatedPlan,
        });

        const tablePlan: AdminFetchAllPlansResponse = {
          _id: updatedPlan._id,
          planName: updatedPlan.planName,
          monthlyPrice: updatedPlan.monthlyPrice,
          yearlyPrice: updatedPlan.yearlyPrice,
          maxBookingPerMonth: updatedPlan.maxBookingPerMonth,
          adVisibility: updatedPlan.adVisibility,
          isBlocked: updatedPlan.isBlocked,
          stripeSync: updatedPlan.stripeSync,
        };

        updatePlansListCache(tablePlan, true);
      }
    },
    onError: (error) => {
      handleMutationError(error, 'Could not update plan.');
    },
  });

  // Admin Creating a new plan and calls the cache updating function
  const createPlanMutation = useMutation<
    ApiBaseResponse<CreatePlanResponse>,
    ApiError,
    CreatePlanRequest
  >({
    mutationFn: (data) => {
      return createPlan(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success(res.message);
        const createdPlan = res.data;

        queryClient.setQueryData<CreatePlanResponse>([queryKeys.PLAN_DETAILS, createdPlan._id], {
          ...createdPlan,
        });

        const tablePlan: AdminFetchAllPlansResponse = {
          _id: createdPlan._id,
          planName: createdPlan.planName,
          monthlyPrice: createdPlan.monthlyPrice,
          yearlyPrice: createdPlan.yearlyPrice,
          maxBookingPerMonth: createdPlan.maxBookingPerMonth,
          adVisibility: createdPlan.adVisibility,
          isBlocked: createdPlan.isBlocked,
          stripeSync: createdPlan.stripeSync,
        };

        updatePlansListCache(tablePlan, false);
      }
    },
    onError: (error) => {
      handleMutationError(error, 'Could not update plan.');
    },
  });

  return {
    createPlan: createPlanMutation.mutateAsync,
    updatePlan: updatePlanMutation.mutateAsync,
    changePlanBlockStatus: changePlanBlockStatusMutation.mutate,
    changeBlockStatusPlanId: changePlanBlockStatusMutation.isPending
      ? changePlanBlockStatusMutation.variables?.planId
      : null,
    resyncPlanWithStripe: resyncStripeMutation.mutate,
    resyncingPlanId: resyncStripeMutation.isPending ? resyncStripeMutation.variables?.planId : null,
  };
};
