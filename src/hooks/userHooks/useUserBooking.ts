import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/shared/apis/review";
import { cancelBooking } from "@/shared/apis/booking";
import { toggleReviewCreateForm } from "@/shared/redux/slices/userSlice";
import { Booking } from "@/shared/interface/entityInterface/bookingInterface";
import { CreateReviewRequest } from "@/shared/interface/api/review";

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