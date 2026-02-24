import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { toggleReviewCreateForm } from "@/utils/redux/slices/userSlice";
import { userCreateReview, userCancelBooking } from "@/utils/apis/user.api";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { UserCreateReviewRequest } from "@/utils/interface/api/userApiInterface";

interface UseUserBookingActionsCustomHookReturnType {
    handleUserCancelBooking: (bookingId: Booking["_id"]) => void;
    handleAddReview: (data: UserCreateReviewRequest) => void;
    handleReviewAddFormToggle: (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => void;
}

export const useUserBookingActions = (): UseUserBookingActionsCustomHookReturnType => {

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

    return { handleUserCancelBooking, handleAddReview, handleReviewAddFormToggle }
}