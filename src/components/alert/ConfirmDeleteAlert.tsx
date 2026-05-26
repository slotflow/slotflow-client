import React from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { appConfig } from "@/shared/config/env";
import { ConfirmDeleteAlertProps } from "@/shared/interface/componentInterface";

const ConfirmDeleteAlert: React.FC<ConfirmDeleteAlertProps> = ({
    message,
    reviewId,
    deleteReviewHandler,
    closeToast,
    errorMessage,
    successMessage
}) => {

    const handleDelete = async () => {
        try {
            const res = await deleteReviewHandler(reviewId);
            if (res.success) {
                toast.success(res.message || successMessage);
            } else {
                toast.error(res.message || errorMessage);
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("Error in deleteReviewHandler ", error);
            }
            toast.error(errorMessage);
        } finally {
            closeToast?.();
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p>{message}</p>
            <div className="flex gap-2">
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                >
                    Yes, Delete
                </Button>

                <Button size="sm" variant="ghost" onClick={closeToast}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default ConfirmDeleteAlert;