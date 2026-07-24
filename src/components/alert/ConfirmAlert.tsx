import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { appConfig } from "@/shared/config/env";
import { ConfirmDeleteProps } from "@/shared/interface/componentInterface";

const ConfirmAlert = ({
    message,
    entityId,
    deleteHandler,
    closeToast,
    errorMessage,
    successMessage,
    btnTitle,
    btnText
}: ConfirmDeleteProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await deleteHandler(entityId);
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
            setLoading(false);
            closeToast?.();
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p>{message}</p>
            <div className="flex gap-2">
                {loading ? (<div className="flex justify-center items-center"><LoaderCircle className="animate-spin" /></div>) : (
                    <>
                        <Button
                            title={btnTitle}
                            size="sm"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Yes, {btnText}
                        </Button>

                        <Button 
                            title="Cancel"
                            size="sm" 
                            variant="ghost" 
                            onClick={closeToast}>
                            Cancel
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ConfirmAlert;