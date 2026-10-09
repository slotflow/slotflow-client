import { toast } from 'react-toastify';
import { RootState } from '@/app/store/appStore';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'recharts/types/state/store';
import { handleError } from '@/shared/utils/helper/handleError';
import { fetchMySubscription } from '@/services/apis/subscription';
import { PaymentProcessStatus, SubscriptionStatus } from '@/shared/types/enums';
import { setSubscription, setSubscriptionUpdating } from '@/app/store/slices/authSlice';
import { setPaymentProcessStatus, setSubscriptionData } from '@/app/store/slices/paymentSlice';

export const useSubscriptionCallback = () => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const status = statusParam === 'success';

  const dispatch = useDispatch<AppDispatch>();
  const { authUser, subscriptionUpdating } = useSelector((state: RootState) => state.auth);

  const maxRetries = 5;
  const attempts = useRef(0);
  const isFetched = useRef(false);

  const retryTimerRef = useRef<number | null>(null);

  const fetchSubscription = useCallback(async () => {
    try {
      const res = await fetchMySubscription();

      if (res.success && res.data) {
        dispatch(setSubscription(res.data));
        if (authUser?.subscriptionStatus !== SubscriptionStatus.ACTIVE) {
          toast.success(res.message);
        }
        dispatch(setPaymentProcessStatus(PaymentProcessStatus.SUCCESS));
        dispatch(setSubscriptionData(null));
        isFetched.current = true;

        dispatch(setSubscriptionUpdating(false));
        return;
      }

      attempts.current++;

      if (attempts.current < maxRetries) {
        retryTimerRef.current = window.setTimeout(fetchSubscription, 10000);
      } else {
        toast.error('Subscription activation delayed. Please check your account status later.');
        dispatch(setSubscriptionUpdating(false));
      }
    } catch (error) {
      handleError(error, 'Could not load subscription status, please refresh the page.');
      dispatch(setSubscriptionUpdating(false));
    }
  }, [dispatch, authUser?.subscriptionStatus]);

  useEffect(() => {
    if (!status || !authUser || isFetched.current) return;

    attempts.current = 0;
    dispatch(setSubscriptionUpdating(true));

    retryTimerRef.current = window.setTimeout(fetchSubscription, 10000);

    return () => {
      if (retryTimerRef.current !== null) {
        window.clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };
  }, [status, authUser, fetchSubscription, dispatch]);

  return {
    status,
    subscriptionUpdating,
  };
};
