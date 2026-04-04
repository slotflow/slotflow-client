import { useQueryClient } from "@tanstack/react-query";
import { ToggleReviewBlockStatusRequest } from "@/utils/interface/api/review";
import { deleteReview, reportReview, toggleReviewBlockStatus } from "@/utils/apis/review";

export const useReviewActions = () => {
    
    const queryClient = useQueryClient();

    const reportReviewHandler = async (reviewId: string) => {
        if (!reviewId) {
            throw new Error("Invalid review id");
        }

        try {
            const res = await reportReview(reviewId);

            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["reviews"] });
            }

            return res;
        } catch (error) {
            throw error;
        }
    };

    const toggleBlockStatusHandler = async (
        data: ToggleReviewBlockStatusRequest
    ) => {
        if (!data.reviewId) {
            throw new Error("Invalid review id");
        }

        try {
            const res = await toggleReviewBlockStatus(data);

            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["reviews"] });
            }

            return res;
        } catch (error) {
            throw error;
        }
    };

    const deleteReviewHandler = async (reviewId: string) => {
        if (!reviewId) {
            throw new Error("Invalid review id");
        }

        const res = await deleteReview(reviewId);

        if (res.success) {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        }

        return res;
    };

    return {
        reportReviewHandler,
        toggleBlockStatusHandler,
        deleteReviewHandler
    };
};