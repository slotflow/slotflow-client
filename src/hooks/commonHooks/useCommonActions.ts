import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Role } from "@/utils/interface/enums";
import { useDispatch, useSelector } from "react-redux";
import { validateRoomId } from "@/utils/apis/booking.api";
import { connectVideoSocket } from "@/utils/socket/videoSocketThunk";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { Payment } from "@/utils/interface/entityInterface/paymentInterface";
import { Subscription } from "@/utils/interface/entityInterface/subscriptionInterface";
import { ValidateRoomId } from "@/utils/interface/api/bookingApiInterface";

interface UseCommonHookInterface {
    handleAdminGetProviderDetailPage: (subscriptionId: Subscription["_id"]) => void;
    handleGetPaymentDetailsPage: (paymentId: Payment["_id"]) => void;
    handleJoinCall: (data: ValidateRoomId) => void;
    handleNavigateToBookingsDetailPage: (appointmentId: Booking["_id"]) => void;
}

export const useCommonHook = (): UseCommonHookInterface => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const handleAdminGetProviderDetailPage = (subscriptionId: Subscription["_id"]) => {
        if (authUser?.role === Role.ADMIN) {
            navigate(`/admin/subscriptions/${subscriptionId}`)
        } else if (authUser?.role === Role.PROVIDER) {
            navigate(`/provider/subscriptions/${subscriptionId}`)
        }
    }

    const handleGetPaymentDetailsPage = (paymentId: Payment["_id"]) => {
        if(authUser?.role === Role.ADMIN){
            navigate(`/admin/payments/${paymentId}`)
        }else if(authUser?.role === Role.PROVIDER){
            navigate(`/provider/payments/${paymentId}`)
        } else if(authUser?.role === Role.USER) {
            navigate(`/user/payments/${paymentId}`)
        }
    }

     const handleJoinCall = async ({ appointmentId, roomId }: ValidateRoomId) => {
        // make it common for user and provider
        await validateRoomId({ appointmentId, roomId })
            .then((res) => {
                if (res.success) {
                    navigate(`/provider/video-call-lobby/${roomId}`);
                    dispatch(connectVideoSocket());
                }
            })
            .catch(() => {
                toast.error("Invalid Request, please try again after sometimes.");
            })
    };

    const handleNavigateToBookingsDetailPage = (appointmentId: Booking["_id"]) => {
        if(authUser?.role === Role.PROVIDER){
            navigate(`/provider/appointments/${appointmentId}`);
        } else if(authUser?.role === Role.USER) {
            navigate(`/user/appointments/${appointmentId}`);
        }
    }

    return { handleAdminGetProviderDetailPage, handleGetPaymentDetailsPage, handleJoinCall, handleNavigateToBookingsDetailPage }
}