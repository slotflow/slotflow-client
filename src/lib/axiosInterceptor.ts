import { toast } from "react-toastify";
import { axiosInstance } from "./axios";
import { appStore } from "@/utils/redux/appStore";
import { setAuthUser } from "@/utils/redux/slices/authSlice";

export const setupAxiosInterceptors = () => {

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Unexpected Error";
             if (!error.response) {
                toast.error("Network error: Please check your internet.");
                console.log("error : ",error);
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
                case 502:
                case 503:
                case 504:
                    toast.error("Server error. Please try again later.");
                    break;

                default:
                    toast.error(message || "Unexpected error occurred.");
                    break;
            }

            return Promise.reject(error);
        }
    );
};