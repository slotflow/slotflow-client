import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { stripeClient } from "@/lib/stripe";
import { AppDispatch } from "@/app/store/appStore";
import { useMutation } from "@tanstack/react-query";
import { getEventSocket } from "@/lib/socketService";
import { EventSocketEnum } from "@/shared/types/enums";
import { UseBookingReturn } from "@/shared/types/hooks";
import { bookAnAppointment } from "@/services/apis/booking";
import { PaymentProcessStatus } from "@/shared/types/enums";
import { ApiBaseResponse, ApiError } from "@/shared/types/common";
import { BookAppointmentRequest, BookAppointmentResponse } from "@/shared/types/api/booking";
import { setBookingData, setPaymentProcessStatus, setPaymentSelectionClose } from "@/app/store/slices/paymentSlice";

export const useBooking = (): UseBookingReturn => {

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
                dispatch(setPaymentProcessStatus(PaymentProcessStatus.PROCESSING));
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
                        reject(error);
                    }
                });

                eventSocket.once(EventSocketEnum.slotEngageRejected, () => {
                    reject(new Error("Slot already engaged by another user"));
                });
            });
        },
        onSuccess: (res) => {

            if (res.success && res.data) {
                const { sessionId } = res.data;

                if (!sessionId) {
                    toast.error('Failed to create checkout session.');
                    dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                    return;
                }

                stripeClient?.redirectToCheckout({ sessionId });
            } else {
                toast.error(res.message || 'Could not complete booking.');
                dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
            }

        },
        onError: (error: ApiError | Error) => {
            const variables: BookAppointmentRequest | undefined = bookAnAppointmentMutation.variables;
            if (variables?.providerId && variables?.date && variables?.slotId) {
                eventSocket.emit(EventSocketEnum.slotUnlockRequest, {
                    providerId: variables.providerId,
                    date: variables.date,
                    slotId: variables.slotId,
                });
            }
            toast.error(error.message || "Booking payment failed");
            dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
        },
        onSettled: () => {
            dispatch(setPaymentSelectionClose());
            dispatch(setBookingData(null));
        },
    });

    return {
        bookAppointment: bookAnAppointmentMutation.mutate,
    };
};