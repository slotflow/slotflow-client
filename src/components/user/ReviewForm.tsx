import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import FormField from "../form/FormField";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { toggleReviewCreateForm } from "@/utils/redux/slices/userSlice";
import { Review } from "@/utils/interface/entityInterface/reviewInterface";
import { useModalAnimation } from "@/hooks/systemHooks/useModalAnimation";
import { createReview } from "@/utils/apis/review.api";

type ReviewFormValues = Pick<Review, "reviewText" | "rating">;

const ReviewForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedBookingId, selectedBookingProviderId } = useSelector(
        (state: RootState) => state.user
    );

    const { closeModal, modalRef } = useModalAnimation(() => {
        dispatch(toggleReviewCreateForm({ id: null, isOpen: false, providerId: null }));
    });

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        closeModal();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReviewFormValues>({
        defaultValues: {
            reviewText: "",
            rating: 0,
        },
    });

    const submitHandler = async ({ reviewText, rating }: ReviewFormValues) => {
        if (!selectedBookingId || !selectedBookingProviderId) {
            toast.error("Something went wrong, refresh the page");
            return;
        }

        try {
            const res = await createReview({
                bookingId: selectedBookingId,
                reviewText,
                rating,
                providerId: selectedBookingProviderId,
            });

            if (res.success) {
                toast.success(res.message);
                dispatch(toggleReviewCreateForm({ id: null, isOpen: false, providerId: null }));
            } 
        } catch {
            toast.error("Review creating failed");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                className="bg-[var(--background)] rounded-lg shadow-lg p-6 w-full max-w-md mx-2"
                ref={modalRef}
            >
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="space-y-4 border p-4"
                >
                    <h4 className="text-xl">Review Form</h4>

                    <FormField<ReviewFormValues>
                        label="Review"
                        id="reviewText"
                        placeholder="Write your review..."
                        type="text"
                        register={register}
                        required
                        error={errors.reviewText?.message}
                    />

                    <FormField<ReviewFormValues>
                        label="Rating"
                        id="rating"
                        placeholder="Enter rating (1-5)"
                        type="number"
                        register={register}
                        required
                        error={errors.rating?.message}
                        {...register("rating", {
                            valueAsNumber: true,
                            min: { value: 1, message: "Rating must be at least 1" },
                            max: { value: 5, message: "Rating cannot exceed 5" },
                            validate: (val: number) =>
                                Number.isInteger(val) || "Rating must be an integer",
                        })}
                    />

                    <div className="flex gap-3 justify-end">
                        <Button
                            type="button"
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
