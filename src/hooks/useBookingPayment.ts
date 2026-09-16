import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { stripeClient } from "@/lib/stripe";
import { AppDispatch } from "@/app/store/appStore";
import { useMutation } from "@tanstack/react-query";
import { getEventSocket } from "@/lib/socketService";
import { EventSocketEnum } from "@/shared/types/socket";
import { bookAnAppointment } from "@/services/apis/booking";
import { PaymentProcessStatus } from "@/shared/types/enums";
import { UseBookingPaymentReturn } from "@/shared/types/hooks";
import { ApiBaseResponse, ApiError } from "@/shared/types/common";
import { BookAppointmentRequest, BookAppointmentResponse } from "@/shared/types/api/booking";
import { setPaymentProcessStatus, setPaymentSelectionOpen } from "@/app/store/slices/paymentSlice";

export const useBookingPayment = (): UseBookingPaymentReturn => {

    const eventSocket = getEventSocket();
    const dispatch = useDispatch<AppDispatch>();

    const bookAnAppointmentMutation = useMutation<
        ApiBaseResponse<BookAppointmentResponse>,
        ApiError,
        BookAppointmentRequest
    >({
        mutationFn: (data: BookAppointmentRequest) => {
            if (
                !data?.slotId ||
                !data?.providerId ||
                !data?.selectedServiceMode ||
                !data?.date
            ) {
                dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                throw new Error("Incomplete booking details.");
            }

            return new Promise((resolve, reject) => {
                eventSocket.emit(EventSocketEnum.slotEngageRequest, {
                    providerId: data.providerId,
                    date: data.date,
                    slotId: data.slotId,
                });

                eventSocket.once(EventSocketEnum.slotEngageApproved, async () => {
                    try {
                        const response = await bookAnAppointment(data);
                        resolve(response);
                    } catch (error) {
                        eventSocket.emit(EventSocketEnum.slotUnlockRequest, {
                            providerId: data.providerId,
                            date: data.date,
                            slotId: data.slotId,
                        });
                        reject(error);
                    }
                });

                eventSocket.once(EventSocketEnum.slotEngageRejected, () => {
                    reject(new Error("Slot already engaged by another user"));
                });
            });
        },
        onSuccess: (res) => {
            const sessionId = res.data;

            if (!sessionId) {
                toast.error("Failed to create checkout session.");
                dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                return;
            }

            dispatch(setPaymentProcessStatus(PaymentProcessStatus.PROCESSING));
            stripeClient?.redirectToCheckout({ sessionId });
        },
        onError: (error: ApiError | Error) => {
            toast.error(error.message || "Booking payment failed");
            dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
        },
        onSettled: () => {
            eventSocket.off(EventSocketEnum.slotEngageApproved);
            eventSocket.off(EventSocketEnum.slotEngageRejected);
            dispatch(setPaymentSelectionOpen(false));
        },
    });

    return {
        bookAppointment: bookAnAppointmentMutation.mutate,
    };
};