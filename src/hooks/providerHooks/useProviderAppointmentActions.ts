import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { providerChangeAppointmentStatus } from "@/utils/apis/provider.api";
import { ProviderChangeAppointmentStatusRequest } from "@/utils/interface/api/providerApiInterface";

interface UseProviderAppointmentActions {
    handleChangeAppointmentStatus: (data: ProviderChangeAppointmentStatusRequest) => void;
}

export const useProviderAppointmentActions = (): UseProviderAppointmentActions => {

    const queryClient = useQueryClient();

    const handleChangeAppointmentStatus = ({ appointmentId, appointmentStatus }: ProviderChangeAppointmentStatusRequest) => {
        providerChangeAppointmentStatus({ appointmentId, appointmentStatus })
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