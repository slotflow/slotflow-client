import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { connectVideoSocket } from "@/utils/apis/video.api";
import { ValidateRoomId } from "@/utils/interface/api/commonApiInterface";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { providerChangeAppointmentStatus, providerValidateRoomId } from "@/utils/apis/provider.api";
import { ProviderChangeAppointmentStatusRequest } from "@/utils/interface/api/providerApiInterface";

export const useProviderAppointmentActions = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();

    const handleChangeAppointmentStatus = ({ appointmentId, appointmentStatus }: ProviderChangeAppointmentStatusRequest) => {
        providerChangeAppointmentStatus({ appointmentId, appointmentStatus })
            .then((res) => {
                if(res.success) {
                    toast.success(res.message);
                    queryClient.invalidateQueries({ queryKey: ["appointments"] });
                }
            })
            .catch(() => {
                toast.error("Please try again");
            });
    }

    const handleProviderJoinCall = async ({ appointmentId, roomId }: ValidateRoomId) => {
        await providerValidateRoomId({appointmentId, roomId})
        .then((res) => {
            if(res.success) {
                navigate(`/provider/video-call-lobby/${roomId}`);
                dispatch(connectVideoSocket());
            }
        })
        .catch(() => {
            toast.error("Invalid Request, please try again after sometimes.");
        })
    };

    const handleNavigateToAppointmentDetailPage = (appointmentId: Booking["_id"]) => {
        navigate(`/provider/appointments/${appointmentId}`);
    }

    return { handleChangeAppointmentStatus, handleProviderJoinCall, handleNavigateToAppointmentDetailPage }
}