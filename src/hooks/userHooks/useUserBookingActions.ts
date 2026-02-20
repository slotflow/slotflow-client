import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { connectVideoSocket } from "@/utils/apis/video.api";
import { toggleReviewCreateForm } from "@/utils/redux/slices/userSlice";
import { ValidateRoomId } from "@/utils/interface/api/commonApiInterface";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { UserCreateReviewRequest } from "@/utils/interface/api/userApiInterface";
import { userCreateReview, userCancelBooking, userValidateRoomId } from "@/utils/apis/user.api";

interface UseUserBookingActionsCustomHookReturnType {
    handleUserCancelBooking: (bookingId: Booking["_id"]) => void;
    handleUserJoinCall: (data: ValidateRoomId) => void;
    handleNavigateToBookingDetailPage: (bookingId: Booking["_id"]) => void;
    handleAddReview: (data: UserCreateReviewRequest) => void;
    handleReviewAddFormToggle: (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => void;
}

export const useUserBookingActions = (): UseUserBookingActionsCustomHookReturnType => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();
    
    const handleUserCancelBooking = (bookingId: Booking["_id"]) => {
        userCancelBooking(bookingId)
            .then((res) => {
                if (res.success) {
                    queryClient.invalidateQueries({ queryKey: ["bookings"] });
                    toast.success(res.message);
                }
            })
            .catch(() => {
                toast.error("Please try again");
            });
    }

    const handleUserJoinCall = async ({ appointmentId, roomId }: ValidateRoomId) => {
        await userValidateRoomId({ appointmentId, roomId })
            .then((res) => {
                if (res.success) {
                    navigate(`/user/video-call-lobby/${roomId}`);
                    dispatch(connectVideoSocket());
                }
            })
            .catch(() => {
                toast.error("Invalid Request, please try again after sometimes.");
            })
    };

    const handleNavigateToBookingDetailPage = (bookingId: Booking["_id"]) => {
        navigate(`/user/bookings/${bookingId}`)
    }

    const handleAddReview = async ({ bookingId, rating, reviewText, providerId }: UserCreateReviewRequest) => {
        await userCreateReview({ bookingId, rating, reviewText, providerId })
            .then((res) => {
                if (res.success) {
                    queryClient.invalidateQueries({ queryKey: ["reviews"] });
                    toast.success(res.message);
                }
            })
            .catch(() => {
                toast.error("Please try again");
            });
    }

    const handleReviewAddFormToggle = (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => {
        e.preventDefault();
        dispatch(toggleReviewCreateForm({
            id: bookingId,
            isOpen: true,
            providerId: providerId
        }));
    }

    return { handleUserCancelBooking, handleUserJoinCall, handleNavigateToBookingDetailPage, handleAddReview, handleReviewAddFormToggle }
}