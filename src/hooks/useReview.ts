import { appConfig } from "@/shared/config/env";
import { useQueryClient } from "@tanstack/react-query";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { Review } from "@/shared/interface/entityInterface/reviewInterface";
import { ToggleReviewBlockStatusRequest } from "@/shared/interface/api/review";
import { deleteReview, reportReview, toggleReviewBlockStatus } from "@/shared/apis/review";

export interface useReviewReturn {
    reportReviewHandler: (reviewId: Review["_id"]) => Promise<ApiBaseResponse>;
    toggleBlockStatusHandler: (data: ToggleReviewBlockStatusRequest) => Promise<ApiBaseResponse>;
    deleteReviewHandler: (reviewId: Review["_id"]) => Promise<ApiBaseResponse>;
}

export const useReview = (): useReviewReturn => {

    const queryClient = useQueryClient();

    const reportReviewHandler = async (reviewId: Review["_id"]) => {
        if (!reviewId) {
            return { success: false, message: "Invalid review id" };
        }
        try {
            const res = await reportReview(reviewId);
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["reviews"] });
            }
            return res;
        } catch (error) {
            if(appConfig.isDevelopment) {
                console.log("Error in reportReviewHandler ",error);
            }
            return { success: false, message: "Review reporting failed" };
        }
    };

    const toggleBlockStatusHandler = async (data: ToggleReviewBlockStatusRequest) => {
        if (!data.reviewId) {
            return { success: false, message: "Invalid review id" };
        }
        try {
            const res = await toggleReviewBlockStatus(data);
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["reviews"] });
            }
            return res;
        } catch (error) {
            if(appConfig.isDevelopment) {
                console.log("Error in toggleBlockStatusHandler ",error);
            }
            return { success: false, message: "Review block status updating failed" };
        }
    };

    const deleteReviewHandler = async (reviewId: Review["_id"]) => {
        if (!reviewId) {
            return { success: false, message: "Invalid review id" };
        }
        try {
            const res = await deleteReview(reviewId);
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["reviews"] });
            }
            return res;
        } catch (error) {
            if(appConfig.isDevelopment) {
                console.log("Error in deleteReviewHandler ",error);
            }
            return { success: false, message: "Review deleting failed" };
        }
    };

    return {
        reportReviewHandler,
        toggleBlockStatusHandler,
        deleteReviewHandler
    };
};