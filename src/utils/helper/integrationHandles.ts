import { toast } from "react-toastify";
import { AppDispatch } from "../redux/appStore";
import { connectStripeAccount } from "../apis/provider.api";
import { setGoogleConnectionLoading, setStripeConnectionLoading } from "../redux/slices/integrationSlice";

export const handleConnectGoogle = (e: React.MouseEvent<HTMLButtonElement>, dispatch: AppDispatch) => {
    e.preventDefault();
    try {
        dispatch(setGoogleConnectionLoading(true));
        const apiUrl = import.meta.env.MODE === "development"
        ? import.meta.env.VITE_BACKEND_DEV_URL
        : import.meta.env.VITE_BACKEND_PRODUCTION_URL;
        window.location.href = `${apiUrl}/google/connect`;
    } catch {
        dispatch(setGoogleConnectionLoading(false));
        toast.error("Failed to connect google calendar");
    }
}


export const handleStripeConnect = async (e: React.MouseEvent<HTMLButtonElement>, dispatch: AppDispatch) => {
    console.log("handleStripeConnect Calling");
    e.preventDefault();
    try {
        dispatch(setStripeConnectionLoading(true));
        console.log("Handle connect Stripe");
        const res = await connectStripeAccount();
        console.log("res : ",res);
        window.location.href = res.url;
    } catch {
        dispatch(setStripeConnectionLoading(false));
        toast.error("Failed to connect stripe");
    } finally {
        dispatch(setStripeConnectionLoading(false));
    }
}