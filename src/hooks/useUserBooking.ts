import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/redux/appStore";
import { toggleReviewCreateForm } from "@/shared/redux/slices/userSlice";

interface UseBookingCustomHookReturnType {
    handleReviewAddFormToggle: (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => void;
}

export const useBooking = (): UseBookingCustomHookReturnType => {

    const dispatch = useDispatch<AppDispatch>();

    const handleReviewAddFormToggle = (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => {
        e.preventDefault();
        dispatch(toggleReviewCreateForm({
            id: bookingId,
            isOpen: true,
            providerId: providerId
        }));
    }

    return { handleReviewAddFormToggle }
}