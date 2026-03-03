import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { changeAppointmentStatus } from "@/utils/apis/booking.api";
import { changeAppointmentStatusRequest } from "@/utils/interface/api/bookingApiInterface";

interface UseProviderAppointmentActions {
    handleChangeAppointmentStatus: (data: changeAppointmentStatusRequest) => void;
}

export const useProviderAppointmentActions = (): UseProviderAppointmentActions => {

    const queryClient = useQueryClient();

    const handleChangeAppointmentStatus = ({ appointmentId, appointmentStatus }: changeAppointmentStatusRequest) => {
        changeAppointmentStatus({ appointmentId, appointmentStatus })
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    queryClient.invalidateQueries({ queryKey: ["appointments"] });
                }
            })
            .catch(() => {
                toast.error("Please try again");
            });
    }

    return { handleChangeAppointmentStatus }
}