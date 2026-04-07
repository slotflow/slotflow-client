import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";
import { validateRoomId } from "@/shared/apis/booking";
import { ValidateRoomId } from "@/shared/interface/api/booking";
import { Booking } from "@/shared/interface/entityInterface/bookingInterface";
import { Payment } from "@/shared/interface/entityInterface/paymentInterface";
import { Subscription } from "@/shared/interface/entityInterface/subscriptionInterface";

interface useRoleBasedNavigationReturnInterface {
    handleAdminGetProviderDetailPage: (subscriptionId: Subscription["_id"]) => void;
    handleGetPaymentDetailsPage: (paymentId: Payment["_id"]) => void;
    JoinCallHandler: (data: ValidateRoomId) => Promise<{ success: boolean; message: string }>;
    handleNavigateToBookingsDetailPage: (appointmentId: Booking["_id"]) => void;
}

export const useRoleBasedNavigation = (): useRoleBasedNavigationReturnInterface => {

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
        if (authUser?.role === Role.ADMIN) {
            navigate(`/admin/payments/${paymentId}`)
        } else if (authUser?.role === Role.PROVIDER) {
            navigate(`/provider/payments/${paymentId}`)
        } else if (authUser?.role === Role.USER) {
            navigate(`/user/payments/${paymentId}`)
        }
    }

    const JoinCallHandler = async ({ appointmentId, roomId }: ValidateRoomId): Promise<{ success: boolean; message: string }> => {
        try {
            const res = await validateRoomId({ appointmentId, roomId });
            if (res.success) {
                if (authUser?.role === Role.PROVIDER) {
                    navigate(`/provider/video-call-lobby/${roomId}`);
                } else if (authUser?.role === Role.USER) {
                    navigate(`/user/video-call-lobby/${roomId}`);
                }
                return { success: true, message: res.message || "Redirecting to video call..." };
            }
            return { success: false, message: res.message || "Invalid Room ID" };
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.message || "Invalid Request, please try again after sometimes."
            };
        }
    };

    const handleNavigateToBookingsDetailPage = (appointmentId: Booking["_id"]) => {
        if (authUser?.role === Role.PROVIDER) {
            navigate(`/provider/appointments/${appointmentId}`);
        } else if (authUser?.role === Role.USER) {
            navigate(`/user/bookings/${appointmentId}`);
        }
    }

    return { handleAdminGetProviderDetailPage, handleGetPaymentDetailsPage, JoinCallHandler, handleNavigateToBookingsDetailPage }
}