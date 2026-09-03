import { appConfig } from '@/config/env';
import { UseAdminPlanReturn } from '@/shared/types/hooks';
import { ApiPaginatedResponse } from '@/shared/types/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changePlanBlockStatus, resyncPlanStripe } from '@/services/apis/plan';
import {
  ResyncPlanStripeRequest,
  AdminFetchAllPlansResponse,
  ChangePlanBlockStatusRequest,
} from '@/shared/types/api/plan';

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

  return {
    changePlanBlockStatus: changePlanBlockStatusMutation.mutateAsync,
    changeBlockStatusPlanId: changePlanBlockStatusMutation.isPending
      ? changePlanBlockStatusMutation.variables?.planId
      : null,
    resyncPlanWithStripe: resyncStripeMutation.mutateAsync,
    resyncingPlanId: resyncStripeMutation.isPending ? resyncStripeMutation.variables?.planId : null,
  };
};
