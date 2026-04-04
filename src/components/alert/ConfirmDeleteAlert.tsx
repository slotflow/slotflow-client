import React from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

interface ConfirmDeleteAlertProps {
    message: string;
    reviewId: string;
    deleteReviewHandler: (reviewId: string) => Promise<any>;
    closeToast: () => void;
    errorMessage: string;
    successMessage: string;
}

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
        toast.success(res.message || successMessage);
    } catch {
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