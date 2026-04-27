import { toast } from "react-toastify";
import { AppDispatch } from "../redux/appStore";
import { connectStripeAccount } from "../apis/payment";
import { appConfig, serviceConfig } from "../config/env";
import { setGoogleConnectionLoading, setStripeConnectionLoading } from "../redux/slices/integrationSlice";

export const handleConnectGoogle = (e: React.MouseEvent<HTMLButtonElement>, dispatch: AppDispatch) => {
    e.preventDefault();
    try {
        dispatch(setGoogleConnectionLoading(true));
        window.location.href = `${serviceConfig.apiGatewayUrl + appConfig.version}/google/connect`;
    } catch {
        dispatch(setGoogleConnectionLoading(false));
        toast.error("Failed to connect google calendar");
    };
};


export const handleStripeConnect = async (e: React.MouseEvent<HTMLButtonElement>, dispatch: AppDispatch) => {
    e.preventDefault();
    try {
        dispatch(setStripeConnectionLoading(true));
        const res = await connectStripeAccount();
        window.location.href = res.data.url;
    } catch {
        dispatch(setStripeConnectionLoading(false));
        toast.error("Failed to connect stripe");
    } finally {
        dispatch(setStripeConnectionLoading(false));
    };
};