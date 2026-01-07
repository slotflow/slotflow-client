import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { RootState } from '@/utils/redux/appStore';
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'recharts/types/state/store';
import stripeLogo from '../../assets/iconImages/Stripe.jpeg';
import IntegrationCard from '@/components/common/Integrations';
import googleCalendar from '../../assets/iconImages/gCalendar.png';
import { setGoogleConnect } from '@/utils/redux/slices/authSlice';
import { handleConnectGoogle, handleStripeConnect } from '@/utils/helper/integrationHandles';
import {
    setGoogleConnectionLoading,
    // setStripeConnectionLoading
} from '@/utils/redux/slices/integrationSlice';

const IntegrationsPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { authUser } = useSelector((state: RootState) => state.auth);
    const { googleConnectionLoding, stripeConnectionLoading } = useSelector((state: RootState) => state.integration);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const data = params.get("response");
        if (!data) return;
        try {
            const response = JSON.parse(decodeURIComponent(data));
            if (!response.success) {
                toast.error("Connection failed, please try again");
            } else {
                if (response.googleConnected) {
                    dispatch(setGoogleConnect());
                    dispatch(setGoogleConnectionLoading(false));
                    toast.success("Successfully connected!");
                }
                if (response.stripeConnected) {
                    toast.success("Stripe connected successfully");
                }
            }
        } catch (err) {
            toast.error("Connecting failed");
            console.error("Google connect parse error:", err);
        } finally {
            const url = new URL(window.location.href);
            url.searchParams.delete("response");
            window.history.replaceState({}, "", url.toString());
        }
    }, [dispatch]);

    if (!authUser) return;

    return (
        <div className="flex flex-col p-2">

            <div className='mb-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2'>
                        <h2 className="text-2xl font-bold tracking-tighter">Integrations</h2>
                    </div>
                </div>
                <p className='w-8/12 mt-2 text-gray-500 text-sm'>List of all integrations, you can use based on your subscription</p>
            </div>

            <Separator className='shadow-sm' />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                <IntegrationCard
                    image={googleCalendar}
                    connectOnClick={handleConnectGoogle}
                    connectingLoading={googleConnectionLoding}
                    description='Connect your Google calendar to enable calendar syncing and manage your appointments automatically avoid overlapping.'
                    heading='Google Calendar'
                    isConnected={authUser.googleConnected ?? false}
                />

                <IntegrationCard
                    image={stripeLogo}
                    connectOnClick={handleStripeConnect}
                    connectingLoading={stripeConnectionLoading}
                    description='Connect your Stripe account to securely manage payments, payouts, and transaction tracking.'
                    heading='Stripe'
                    isConnected={authUser.stripeConnected ?? false}
                />

            </div>
        </div>
    )
}

export default IntegrationsPage;