import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@/app/store/appStore';
import { PaymentAccountStatus } from '@/shared/types/enums';
import { handleError } from '@/shared/utils/helper/handleError';
import { setGoogleCalendarConnecting, setGoogleCalendarData, setStripeConnecting, setStripeData } from '@/app/store/slices/integrationSlice';

export const useIntegrationsCallback = () => {

    const dispatch = useDispatch<AppDispatch>();

    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const [serviceName, setServiceName] = useState<string>('Integration');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const data = params.get('response');

        if (!data) {
            setLoading(false);
            setSuccess(false);
            toast.error('Invalid callback parameters');
            return;
        }

        const processCallback = async () => {
            try {
                const response = JSON.parse(decodeURIComponent(data));
                await new Promise((resolve) => setTimeout(resolve, 800));

                if (!response.success) {
                    setSuccess(false);
                    toast.error('Connection failed, please try again');
                } else {
                    if ('googleCalendarConnected' in response) {
                        setServiceName('Google Calendar');
                        if (response.googleCalendarConnected) {
                            dispatch(
                                setGoogleCalendarData({
                                    isConnected: true,
                                    isConnecting: false,
                                })
                            );
                            setSuccess(true);
                            toast.success('Google Calendar connected successfully');
                        } else {
                            dispatch(setGoogleCalendarConnecting(false));
                            setSuccess(false);
                            toast.error('Google Calendar connection failed');
                        }
                    }

                    if ('stripeOnboardingStatus' in response) {
                        setServiceName('Stripe Account');
                        if (response.stripeOnboardingStatus === 'success') {
                            dispatch(
                                setStripeData({
                                    isConnecting: false,
                                    status: PaymentAccountStatus.PENDING,
                                })
                            );
                            setSuccess(true);
                            toast.success('Stripe onboarding completed successfully');
                        } else {
                            dispatch(setStripeConnecting(false));
                            setSuccess(false);
                            toast.error('Stripe onboarding failed or cancelled');
                        }
                    }
                }
            } catch (error) {
                setSuccess(false);
                handleError(error, 'Could not connect service');
            } finally {
                setLoading(false);
                const url = new URL(window.location.href);
                url.searchParams.delete('response');
                window.history.replaceState({}, '', url.toString());
            }
        };

        processCallback();
    }, [dispatch]);

    return {
        loading,
        success,
        serviceName,
    };
};