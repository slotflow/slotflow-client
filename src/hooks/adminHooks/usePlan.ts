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
import { UseAdminPlanReturn } from '@/shared/types/hooks';
import { ApiPaginatedResponse } from '@/shared/types/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  changePlanBlockStatus,
  createPlan,
  resyncPlanStripe,
  updatePlan,
} from '@/services/apis/plan';

export const useAdminPlan = (): UseAdminPlanReturn => {
  const queryClient = useQueryClient();

  const changePlanBlockStatusMutation = useMutation({
    mutationFn: (data: ChangePlanBlockStatusRequest) => changePlanBlockStatus(data),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['plans'] });
      }
    },
    onError: (error) => {
      if (appConfig.isDevelopment) {
        console.error('Error in changePlanStatus:', error);
      }
    },
  });

  const resyncStripeMutation = useMutation({
    mutationFn: (data: ResyncPlanStripeRequest) => resyncPlanStripe(data),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const { planId, stripePlanDetails, stripeSync } = res.data;

        queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>(
          { queryKey: ['plans'] },
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

  const updatePlansListCache = (planData: AdminFetchAllPlansResponse, isEdit: boolean) => {
    console.log('planData : ', planData);
    const hasCache = queryClient
      .getQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>({
        queryKey: ['plans'],
      })
      .some(([, data]) => Boolean(data && data.items));

    if (!hasCache) {
      console.log('fetching plans');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      return;
    }

    queryClient.setQueriesData<ApiPaginatedResponse<AdminFetchAllPlansResponse>>(
      { queryKey: ['plans'] },
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
        console.error('Error in updatePlan:', error);
      }
    },
  });

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
        console.error('Error in createPlan:', error);
      }
    },
  });

  return {
    createPlan: createPlanMutation.mutateAsync,
    isCreatingPlan: createPlanMutation.isPending,
    updatePlan: updatePlanMutation.mutateAsync,
    isUpdatingPlan: updatePlanMutation.isPending,
    changePlanBlockStatus: changePlanBlockStatusMutation.mutateAsync,
    changeBlockStatusPlanId: changePlanBlockStatusMutation.isPending
      ? changePlanBlockStatusMutation.variables?.planId
      : null,
    resyncPlanWithStripe: resyncStripeMutation.mutateAsync,
    resyncingPlanId: resyncStripeMutation.isPending ? resyncStripeMutation.variables?.planId : null,
  };
};
