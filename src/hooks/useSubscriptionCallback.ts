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
import { setPaymentProcessStatus, setSubscriptionPaymentData } from '@/app/store/slices/paymentSlice';

export const useSubscriptionCallback = () => {

  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const status = statusParam === 'success';

  const dispatch = useDispatch<AppDispatch>();
  const { authUser, subscriptionUpdating } = useSelector((state: RootState) => state.auth);

  const isFetched = useRef(false);
  const maxRetries = 5;
  const attempts = useRef(0);

  const fetchSubscription = useCallback(async () => {
    try {
      const res = await fetchMySubscription();
      if (res.success && res.data) {
        dispatch(setSubscription(res.data));
        if (authUser?.subscriptionStatus !== SubscriptionStatus.ACTIVE) {
          toast.success(res.message);
        }
        dispatch(setPaymentProcessStatus(PaymentProcessStatus.SUCCESS));
        dispatch(setSubscriptionPaymentData(null));
        isFetched.current = true;
        return;
      }

      attempts.current++;

      if (attempts.current < maxRetries) {
        setTimeout(fetchSubscription, 10000);
      } else {
        toast.error('Subscription activation delayed');
      }
    } catch (error) {
      handleError(error, 'Could load subscription status, please refresh the page.');
    } finally {
      setTimeout(() => {
        dispatch(setSubscriptionUpdating(false));
      }, 5000);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!status || !authUser || isFetched.current) return;
    setTimeout(fetchSubscription, 10000);
  }, [authUser, status, fetchSubscription]);

  return {
    status,
    subscriptionUpdating,
  };
};