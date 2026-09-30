import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { PaymentProcessStatus } from '@/shared/types/enums';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { checkBookingConfirmed } from '@/services/apis/booking';
import { handleError } from '@/shared/utils/helper/handleError';
import { UseBookingCallbackReturn } from '@/shared/types/hooks';
import { setBookingUpdating } from '@/app/store/slices/authSlice';
import { setBookingData, setPaymentProcessStatus } from '@/app/store/slices/paymentSlice';

export const useBookingCallback = (): UseBookingCallbackReturn => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const status = statusParam === 'success';

  const dispatch = useDispatch<AppDispatch>();
  const { bookingUpdating } = useSelector((state: RootState) => state.auth);

  const isFetched = useRef(false);
  const maxRetries = 5;
  const attempts = useRef(0);
  
  const retryTimerRef = useRef<number | null>(null);
  const loadingTimerRef = useRef<number | null>(null);

  const checkRecentBooking = useCallback(async () => {
    try {
      const response = await checkBookingConfirmed();
      if (response.data) {
        toast.success('Your booking has been confirmed');
        dispatch(setPaymentProcessStatus(PaymentProcessStatus.SUCCESS));
        dispatch(setBookingData(null));
        isFetched.current = true;

        dispatch(setBookingUpdating(false));
        return;
      }

      attempts.current++;

      if (attempts.current < maxRetries) {
        retryTimerRef.current = setTimeout(checkRecentBooking, 10000);
      } else {
        toast.error('Booking confirmation delayed. Please check your bookings page.');
        dispatch(setBookingUpdating(false));
      }
    } catch (error) {
      handleError(error, 'Could not load booking status, please refresh the page.');
      dispatch(setBookingUpdating(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!status || isFetched.current) return;

    attempts.current = 0;
    
    dispatch(setBookingUpdating(true));

    retryTimerRef.current = setTimeout(checkRecentBooking, 10000);

    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, [status, checkRecentBooking, dispatch]);

  return {
    status,
    bookingUpdating,
  };
};