import { toast } from 'react-toastify';
import { appConfig } from '@/config/env';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/app/store/appStore';
import { PaymentProcessStatus } from '@/shared/types/enums';
import { checkBookingConfirmed } from '@/services/apis/booking';
import { UseBookingCallbackReturn } from '@/shared/types/hooks';
import { setBookingPyamentData, setPaymentProcessStatus } from '@/app/store/slices/paymentSlice';

export const useBookingCallback = (): UseBookingCallbackReturn => {

    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const statusParam = searchParams.get('status');
    const status = statusParam === 'success';

    const checkRecentBooking = useCallback(async () => {
        try {
            const response = await checkBookingConfirmed();
            if (response.data) {
                toast.success('Your Booking has been confirmed');
                dispatch(setPaymentProcessStatus(PaymentProcessStatus.SUCCESS));
                dispatch(setBookingPyamentData(null));
            } else {
                toast.error('Booking failed');
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log(error, 'checkBookingConfirmed api failed');
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (!status) return;

        const timeout = setTimeout(() => {
            checkRecentBooking();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [status, checkRecentBooking]);

    return {
        status,
    };
};