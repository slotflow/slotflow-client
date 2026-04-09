import { useDispatch } from "react-redux";
import { appConfig } from "@/shared/config/env";
import { AppDispatch } from "@/shared/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { toggleReviewCreateForm } from "@/shared/redux/slices/userSlice";
import { Booking } from "@/shared/interface/entityInterface/bookingInterface";
import { cancelBooking, changeAppointmentStatus } from "@/shared/apis/booking";
import { changeAppointmentStatusRequest } from "@/shared/interface/api/booking";

interface UseBookingCustomHookReturnType {
    handleReviewAddFormToggle: (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => void;
    changeAppointmentStatusHandler: (data: changeAppointmentStatusRequest) => Promise<ApiBaseResponse>;
    cancelBookingHandler: (bookingId: Booking["_id"]) => Promise<ApiBaseResponse>;
}

export const useBooking = (): UseBookingCustomHookReturnType => {

    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();

    const handleReviewAddFormToggle = (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => {
        e.preventDefault();
        dispatch(toggleReviewCreateForm({
            id: bookingId,
            isOpen: true,
            providerId: providerId
        }));
    }

    const changeAppointmentStatusHandler = async (data: changeAppointmentStatusRequest) => {
        try {
            const res = await changeAppointmentStatus(data);
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["bookings"] });
            }
            return res;
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("Error in changeAppointmentStatusHandler", error);
            }
            return { success: false, message: "Please try again" }
        }
    }

    const cancelBookingHandler = async (bookingId: string) => {
        try {
            const res = await cancelBooking(bookingId);
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["bookings"] });
            }
            return res;
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("Error in cancelBookingHandler ", error);
            }
            return { success: false, message: "Please try again" }
        }
    }

    return {
        handleReviewAddFormToggle,
        changeAppointmentStatusHandler,
        cancelBookingHandler
    }
}