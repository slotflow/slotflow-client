import {
  UpdatePlanRequest,
  CreatePlanRequest,
  UpdatePlanResponse,
  CreatePlanResponse,
  ResyncPlanStripeRequest,
  AdminFetchAllPlansResponse,
  ChangePlanBlockStatusRequest,
} from '@/shared/types/api/plan';
import { appConfig } from '@/config/env';
import { QUERY_KEYS } from '@/shared/utils/constants';
import { UseAdminPlanReturn } from '@/shared/types/hooks';
import { ApiPaginatedResponse } from '@/shared/types/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPlan,
  updatePlan,
  resyncPlanStripe,
  changePlanBlockStatus,
} from '@/services/apis/plan';

/**
 * Custom hook for managing admin plan API interactions and React Query cache state.
 *
 * @returns  An object containing admin plan management functions and varibales.
 */
export const useAdminPlan = (): UseAdminPlanReturn => {
  const queryClient = useQueryClient();

  /**
   * Updates a plan's block status
   *
   * @param data is the request payload
   * @returns
   */
  const changePlanBlockStatusMutation = useMutation({
    mutationFn: (data: ChangePlanBlockStatusRequest) => changePlanBlockStatus(data),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLANS] });
      }
    },
    onError: (error) => {
      if (appConfig.isDevelopment) {
        console.error('Error in changePlanStatus:', error);
      }
    },
  });

  /**
   * Resync the plan details with stripe product
   *
   * @param data is the request payload
   * @returns update the plans cache with resynced data
   */
  const resyncStripeMutation = useMutation({
    mutationFn: (data: ResyncPlanStripeRequest) => resyncPlanStripe(data),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const { planId, stripePlanDetails, stripeSync } = res.data;

        queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>(
          { queryKey: [QUERY_KEYS.PLANS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((plan) =>
                plan._id === planId
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
      if (appConfig.isDevelopment) {
        console.error('Error in resyncPlanWithStripe:', error);
      }
    },
  });

  /**
   * update the plans list cache
   *  if plan is editing it will update only that specific plan in the list
   * or isEdit is false we update the list by appending the created plan
   *
   * @param planData is the request payload
   * @param isEdit boolean value to check the plan is editing or creting
   */
  const updatePlansListCache = (planData: AdminFetchAllPlansResponse, isEdit: boolean) => {
    const hasCache = queryClient
      .getQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>({
        queryKey: [QUERY_KEYS.PLANS],
      })
      .some(([, data]) => Boolean(data && data.items));

    if (!hasCache) {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      return;
    }

    queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>(
      { queryKey: [QUERY_KEYS.PLANS] },
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

  /**
   * update plan with only changed fields and call the cache updating function
   *
   * @param data is the request payload
   */
  const updatePlanMutation = useMutation({
    mutationFn: (data: UpdatePlanRequest) => updatePlan(data),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const updatedPlan = res.data;

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

        queryClient.setQueryData<UpdatePlanResponse>(['planDetails', updatedPlan._id], {
          ...updatedPlan,
        });
        updatePlansListCache(tablePlan, true);
      }
    },
    onError: (error) => {
      if (appConfig.isDevelopment) {
        console.error('Error in updatePlanMutation:', error);
      }
    },
  });

  /**
   * creating a new plan and calls the cache updating function
   *
   * @param data is the request payload
   */
  const createPlanMutation = useMutation({
    mutationFn: (data: CreatePlanRequest) => createPlan(data),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const createdPlan = res.data;

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

        queryClient.setQueryData<CreatePlanResponse>(['planDetails', createdPlan._id], {
          ...createdPlan,
        });

        updatePlansListCache(tablePlan, false);
      }
    },
    onError: (error) => {
      if (appConfig.isDevelopment) {
        console.error('Error in createPlanMutation:', error);
      }
    },
  });

  return {
    createPlan: createPlanMutation.mutateAsync,
    updatePlan: updatePlanMutation.mutateAsync,
    changePlanBlockStatus: changePlanBlockStatusMutation.mutateAsync,
    changeBlockStatusPlanId: changePlanBlockStatusMutation.isPending
      ? changePlanBlockStatusMutation.variables?.planId
      : null,
    resyncPlanWithStripe: resyncStripeMutation.mutateAsync,
    resyncingPlanId: resyncStripeMutation.isPending ? resyncStripeMutation.variables?.planId : null,
  };
};
