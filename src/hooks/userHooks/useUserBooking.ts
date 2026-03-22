import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/utils/apis/review.api";
import { cancelBooking } from "@/utils/apis/booking.api";
import { toggleReviewCreateForm } from "@/utils/redux/slices/userSlice";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { CreateReviewRequest } from "@/utils/interface/api/reviewApiInterface";

interface UseUserBookingActionsCustomHookReturnType {
    handleUserCancelBooking: (bookingId: Booking["_id"]) => void;
    handleAddReview: (data: CreateReviewRequest) => void;
    handleReviewAddFormToggle: (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => void;
}

export const useUserBookingActions = (): UseUserBookingActionsCustomHookReturnType => {

    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();

    const handleUserCancelBooking = (bookingId: Booking["_id"]) => {
        cancelBooking(bookingId)
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

    const handleAddReview = async ({ bookingId, rating, reviewText, providerId }: CreateReviewRequest) => {
        await createReview({ bookingId, rating, reviewText, providerId })
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