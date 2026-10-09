import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/appStore';
import { stripeClientPromise } from '@/lib/stripe';
import { useMutation } from '@tanstack/react-query';
import { getEventSocket } from '@/lib/socketService';
import { EventSocketEnum } from '@/shared/types/enums';
import { UseBookingReturn } from '@/shared/types/hooks';
import { bookAnAppointment } from '@/services/apis/booking';
import { PaymentProcessStatus } from '@/shared/types/enums';
import { useParams, useSearchParams } from 'react-router-dom';
import { ApiBaseResponse, ApiError } from '@/shared/types/common';
import { BookAppointmentResponse } from '@/shared/types/api/booking';
import { setPaymentProcessStatus, setPaymentSelectionClose } from '@/app/store/slices/paymentSlice';

export const useBooking = (): UseBookingReturn => {
  const eventSocket = getEventSocket();
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();
  const { providerId } = useParams<{ providerId: string }>();

  const date = searchParams.get('date');
  const slotId = searchParams.get('slot');
  const mode = searchParams.get('mode');

  const handleBookingSuccess = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('date');
      newParams.delete('slot');
      newParams.delete('time');
      newParams.delete('mode');
      return newParams;
    });
  };

  const bookAnAppointmentMutation = useMutation<ApiBaseResponse<BookAppointmentResponse>, ApiError>(
    {
      mutationFn: () => {
        if (!slotId || !providerId || !mode || !date) {
          dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
          throw new Error('Incomplete booking details.');
        }

        return new Promise((resolve, reject) => {
          dispatch(setPaymentProcessStatus(PaymentProcessStatus.PROCESSING));
          eventSocket.emit(EventSocketEnum.slotEngageRequest, {
            providerId,
            date,
            slotId,
          });

          eventSocket.once(EventSocketEnum.slotEngageApproved, async () => {
            try {
              const response = await bookAnAppointment({
                date,
                providerId,
                selectedServiceMode: mode,
                slotId,
              });
              resolve(response);
            } catch (error) {
              reject(error);
            }
          });

          eventSocket.once(EventSocketEnum.slotEngageRejected, () => {
            reject(new Error('Slot already engaged by another user'));
          });
        });
      },
      onSuccess: async (res) => {
        if (res.success && res.data) {
          const { sessionId } = res.data;

          if (!sessionId) {
            toast.error('Failed to create checkout session.');
            dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
            return;
          }

          const stripeClient = await stripeClientPromise;

          if (!stripeClient) {
            toast.error('Failed to initialize Stripe.');
            dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
            return;
          }

          const { error } = await stripeClient.redirectToCheckout({ sessionId });

          if (error) {
            toast.error(error.message || 'Unable to redirect to checkout.');
            dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
          }
        } else {
          toast.error(res.message || 'Could not complete booking.');
          dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
        }
      },
      onError: (error: ApiError | Error) => {
        if (providerId && date && slotId) {
          eventSocket.emit(EventSocketEnum.slotUnlockRequest, {
            providerId,
            date,
            slotId,
          });
        }
        toast.error(error.message || 'Booking payment failed');
        dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
      },
      onSettled: () => {
        dispatch(setPaymentSelectionClose());
        handleBookingSuccess();
      },
    },
  );

  return {
    bookAppointment: bookAnAppointmentMutation.mutate,
    handleBookingSuccess,
  };
};
