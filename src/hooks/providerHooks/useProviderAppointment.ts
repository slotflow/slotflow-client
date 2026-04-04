import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { changeAppointmentStatus } from "@/shared/apis/booking";
import { changeAppointmentStatusRequest } from "@/shared/interface/api/booking";

interface UseProviderAppointmentReturnInterface {
    handleChangeAppointmentStatus: (data: changeAppointmentStatusRequest) => void;
}

export const useProviderAppointment = (): UseProviderAppointmentReturnInterface => {

    const queryClient = useQueryClient();

    const handleChangeAppointmentStatus = ({ appointmentId, appointmentStatus }: changeAppointmentStatusRequest) => {
        changeAppointmentStatus({ appointmentId, appointmentStatus })
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    queryClient.invalidateQueries({ queryKey: ["bookings"] });
                }
            })
            .catch(() => {
                toast.error("Please try again");
            });
    }

    return { handleChangeAppointmentStatus }
}