import { toast } from "react-toastify";
import { useCallback, useEffect } from "react";
import { RootState } from "@/app/store/appStore";
import { ApiError } from "@/shared/types/common";
import { useDispatch, useSelector } from "react-redux";
import { appConfig, serviceConfig } from "@/config/env";
import { PaymentAccountStatus } from "@/shared/types/enums";
import { handleError } from "@/shared/utils/helper/handleError";
import { ConnectStripeAccountRequest } from "@/shared/types/api/paymentAccount";
import { checkStripeAccountStatus, connectStripeAccount } from "@/services/apis/paymentAccount";
import { setGoogleCalendarConnecting, setGoogleCalendarData, setStripeConnecting, setStripeData } from "@/app/store/slices/integrationSlice";

export interface UseIntegrationReturn {
    connectStripe: (data: ConnectStripeAccountRequest) => Promise<void>;
    connectGoogleCalendar: () => void;
}

export const useIntegration = (): UseIntegrationReturn => {

    const dispatch = useDispatch();
    const { stripe, googleCalendar } = useSelector((state: RootState) => state.integration);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const data = params.get('response');
        if (!data) return;

        try {
            const response = JSON.parse(decodeURIComponent(data));

            if (!response.success) {
                toast.error('Connection failed, please try again');
            } else {
                if ('googleConnected' in response) {
                    if (response.googleConnected) {
                        dispatch(
                            setGoogleCalendarData({
                                isConnected: true,
                                isConnecting: false,
                            })
                        );
                        toast.success('Google Calendar connected successfully');
                    } else {
                        dispatch(setGoogleCalendarConnecting(false));
                        toast.error('Google Calendar connection failed');
                    }
                }

                if ('stripeOnboardingStatus' in response) {
                    if (response.stripeOnboardingStatus === 'success') {
                        dispatch(
                            setStripeData({
                                isConnecting: false,
                                status: PaymentAccountStatus.PENDING,
                            })
                        );
                        toast.success('Stripe onboarding completed successfully');
                    } else {
                        dispatch(setStripeConnecting(false));
                        toast.error('Stripe onboarding failed or cancelled');
                    }
                }
            }
        } catch (error) {
            handleError(error, 'Could not connect');
        } finally {
            const url = new URL(window.location.href);
            url.searchParams.delete('response');
            window.history.replaceState({}, '', url.toString());
        }
    }, [dispatch]);

    // connect stripe
    const connectStripe = async (data: ConnectStripeAccountRequest): Promise<void> => {
        if (!data.email) {
            toast.error('Email is missing. Please refresh the page.');
            return;
        }

        if (stripe.status === PaymentAccountStatus.ACTIVE) {
            toast.warn('Stripe is already connected.');
            return;
        }

        try {
            dispatch(setStripeConnecting(true));
            const res = await connectStripeAccount(data);

            if (res.success && res.data?.boardingUrl) {
                toast.success(res.message);
                window.location.href = res.data.boardingUrl;
            } else {
                dispatch(setStripeConnecting(false));
            }
        } catch (error) {
            dispatch(setStripeConnecting(false));
            handleError(error as ApiError, 'Could not connect google calendar.');
        }
    };

    // connect google calendar
    const connectGoogleCalendar = (): void => {
        try {
            if (googleCalendar.isConnected) {
                toast.info("Google calendar is already connected");
                return;
            }
            dispatch(setGoogleCalendarConnecting(true));
            window.location.href = `${serviceConfig.apiGatewayUrl}${appConfig.version}/google/connect`;
        } catch (error) {
            dispatch(setGoogleCalendarConnecting(false));
            handleError(error as ApiError, 'Could not connect stripe.');
        }
    };

    // check stripe status check
    const checkStripeStatus = useCallback(async () => {
        if (stripe.status === PaymentAccountStatus.ACTIVE) {
            return;
        }
        try {
            dispatch(setStripeConnecting(true));
            const res = await checkStripeAccountStatus();
            if (res.success) {
                if (res.data?.stripeStatus) {
                    dispatch(setStripeData({
                        isConnecting: false,
                        status: res.data?.stripeStatus
                    }));
                }
                if (res.data?.stripeStatus === PaymentAccountStatus.ACTIVE) {
                    toast.success('Stripe connected successfully');
                }
            } else {
                dispatch(setStripeConnecting(false));
            }
        } catch (error) {
            handleError(error, 'Could not check stripe status');
        } finally {
            dispatch(setStripeConnecting(false));
        }
    }, [stripe.status, dispatch]);

    // check stripe status if the status is pending ( if the provider intiated stripe boarding and if it completed it will be pending )
    useEffect(() => {
        if (stripe.status === PaymentAccountStatus.PENDING) {
            checkStripeStatus();
            const interval = setInterval(checkStripeStatus, 15000);

            return () => clearInterval(interval);
        }
    }, [stripe.status, checkStripeStatus]);

    return {
        connectStripe,
        connectGoogleCalendar,
    }
}