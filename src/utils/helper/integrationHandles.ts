import { toast } from "react-toastify";
import { AppDispatch } from "../redux/appStore";
import { appConfig, serviceConfig } from "../env";
import { setGoogleConnectionLoading, setStripeConnectionLoading } from "../redux/slices/integrationSlice";
import { connectStripeAccount } from "../apis/payment";

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
        window.location.href = res.url;
    } catch {
        dispatch(setStripeConnectionLoading(false));
        toast.error("Failed to connect stripe");
    } finally {
        dispatch(setStripeConnectionLoading(false));
    };
};