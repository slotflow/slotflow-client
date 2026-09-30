import { toast } from 'react-toastify';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import { useReviewReturn } from '@/shared/types/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleError } from '@/shared/utils/helper/handleError';
import { ApiBaseResponse, ApiError, ApiPaginatedResponse } from '@/shared/types/common';
import { deleteReview, reportReview, changeReviewBlockStatus } from '@/services/apis/review';
import { FetchReviewsResponse, ReportReviewRequest, ReportReviewResponse, ChangeReviewBlockStatusRequest, ChangeReviewBlockStatusResponse, DeleteReviewRequest } from '@/shared/types/api/review';

export const useReview = (): useReviewReturn => {
  const queryClient = useQueryClient();

  const reportReviewMutation = useMutation<
    ApiBaseResponse<ReportReviewResponse>,
    ApiError,
    ReportReviewRequest
  >({
    mutationFn: async ({ reviewId }: ReportReviewRequest) => {
      if (!reviewId) {
        throw new Error('Invalid review ID.');
      }
      return await reportReview({ reviewId });
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        const { _id, reported } = res.data;
        toast.success(res.message || 'Review reported successfully.');

        queryClient.setQueriesData<ApiPaginatedResponse<FetchReviewsResponse>>(
          { queryKey: [queryKeys.REVIEWS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((review) =>
                review._id === _id
                  ? {
                    ...review,
                    reported: reported,
                  }
                  : review
              ),
            };
          }
        );
      } else {
        toast.error(res.message || 'Could not report review, please try again.');
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Failed to report review.');
    },
  })

  const changeReviewBlockStatusMutation = useMutation<
    ApiBaseResponse<ChangeReviewBlockStatusResponse>,
    ApiError,
    ChangeReviewBlockStatusRequest
  >({
    mutationFn: async (data: ChangeReviewBlockStatusRequest) => {
      if (!data.reviewId) {
        throw new Error('Invalid review ID.');
      }
      return await changeReviewBlockStatus(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        const { _id, isBlocked } = res.data;
        toast.success(res.message || 'Review block status updated successfully.');

        queryClient.setQueriesData<ApiPaginatedResponse<FetchReviewsResponse>>(
          { queryKey: [queryKeys.REVIEWS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((review) =>
                review._id === _id
                  ? {
                    ...review,
                    isBlocked: isBlocked,
                  }
                  : review
              ),
            };
          }
        );
      } else {
        toast.error(res.message || 'Could not change review block status.');
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Failed to update review block status.');
    },
  });

  const deleteReviewMutation = useMutation<
    ApiBaseResponse,
    ApiError,
    DeleteReviewRequest
  >({
    mutationFn: async ({ reviewId }: DeleteReviewRequest) => {
      if (!reviewId) {
        throw new Error('Invalid review ID.');
      }
      return await deleteReview({ reviewId });
    },
    onSuccess: (res, variables) => {
      if (res.success) {
        toast.success(res.message || 'Review deleted successfully.');

        queryClient.setQueriesData<ApiPaginatedResponse<FetchReviewsResponse>>(
          { queryKey: [queryKeys.REVIEWS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.filter(
                (review) => review._id !== variables.reviewId
              ),
            };
          }
        );
      } else {
        toast.error(res.message || 'Could not delete review, please try again.');
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Failed to delete review.');
    },

  });

  return {
    reportReview: reportReviewMutation.mutate,
    isChangingReportStatus: reportReviewMutation.isPending,
    changeReviewBlockStatus: changeReviewBlockStatusMutation.mutate,
    isChangingBlockStatus: changeReviewBlockStatusMutation.isPending,
    deleteReview: deleteReviewMutation.mutate,
    isDeleting: deleteReviewMutation.isPending
  };
};
