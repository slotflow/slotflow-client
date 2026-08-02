import { toast } from "react-toastify";
import { axiosInstance } from "./axios";
import { appStore } from "@/shared/redux/appStore";
import { setAuthUser } from "@/shared/redux/slices/authSlice";

export const setupAxiosInterceptors = () => {

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Unexpected Error";
            if (!error.response) {
                toast.error("Unable to connect to the server. Please try again.");
                console.log("error : ", error);
                return Promise.reject(error);
            }

            switch (status) {
                case 400:
                    toast.error(message || "Invalid request.");
                    break;

                case 401:
                    appStore.dispatch(setAuthUser(null));
                    toast.error("Session expired. Please log in again.");
                    break;

                case 403:
                    appStore.dispatch(setAuthUser(null));
                    toast.error("Your account has been blocked.");
                    break;

                case 404:
                    toast.error("Requested resource not found.");
                    break;

                case 500:
                    toast.error("Internal server error. Please try again later.");
                    break;
                case 502:
                    toast.error("Bad gateway. Please try again later.");
                    break;
                case 503:
                    toast.error("Service is temporarily unavailable. Please try again later.");
                    break;
                case 504:
                    toast.error("The server took too long to respond. Please try again.");
                    break;

                default:
                    toast.error(message || "Unexpected error occurred.");
                    break;
            }

            return Promise.reject(error);
        }
    );
};