import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { userAddReview } from "@/utils/apis/user.api";
import { useDispatch, useSelector } from "react-redux";
import InputFieldWithLable from "../form/InputFieldWithLable";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { toggleReviewAddForm } from "@/utils/redux/slices/userSlice";
import { Review } from "@/utils/interface/entityInterface/reviewInterface";
import { useModalAnimation } from "@/utils/hooks/systemHooks/useModalAnimation";

type ReviewFormValues = Pick<Review, "reviewText" | "rating">;

const ReviewForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedBookingId, selectedBookingProviderId } = useSelector(
        (state: RootState) => state.user
    );

    const { closeModal, modalRef } = useModalAnimation(() => {
        dispatch(toggleReviewAddForm({ id: null, isOpen: false, providerId: null }));
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
            const res = await userAddReview({
                bookingId: selectedBookingId,
                reviewText,
                rating,
                providerId: selectedBookingProviderId,
            });

            if (res.success) {
                toast.success(res.message);
                dispatch(toggleReviewAddForm({ id: null, isOpen: false, providerId: null }));
            } else {
                toast.error(res.message || "Review adding failed");
            }
        } catch {
            toast.error("Review adding failed");
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

                    <InputFieldWithLable<ReviewFormValues>
                        label="Review"
                        id="reviewText"
                        placeholder="Write your review..."
                        type="text"
                        register={register}
                        required
                        error={errors.reviewText?.message}
                    />

                    <InputFieldWithLable<ReviewFormValues>
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
                            variant="outline"
                            className="cursor-pointer"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="cursor-pointer">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
