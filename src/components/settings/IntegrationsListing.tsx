import { toast } from "react-toastify";
import React, { useEffect } from 'react';
import { Separator } from '../ui/separator';
import { Card, CardContent } from '../ui/card';
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";
import { AppDispatch } from "@/shared/redux/appStore";
import { useDispatch, useSelector } from 'react-redux';
import { connectStripeAccount } from "@/shared/apis/payment";
import stripeLogo from '../../assets/iconImages/Stripe.jpeg';
import IntegrationCard from '../integrations/IntegrationCard';
import { appConfig, serviceConfig } from "@/shared/config/env";
import googleCalendar from '../../assets/iconImages/gCalendar.png';
import { setGoogleConnect, setStripeConnect } from '@/shared/redux/slices/authSlice';
import { setGoogleConnectionLoading, setStripeConnectionLoading } from "@/shared/redux/slices/integrationSlice";

const IntegrationsListing: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const authUser = useSelector((state: RootState) => state.auth.authUser);
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
                    toast.success("Google connected successfully");
                }
                if (response.stripeConnected) {
                    dispatch(setStripeConnect());
                    dispatch(setStripeConnectionLoading(false));
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


    const handleConnectGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            dispatch(setGoogleConnectionLoading(true));
            window.location.href = `${serviceConfig.apiGatewayUrl + appConfig.version}/google/connect`;
        } catch {
            dispatch(setGoogleConnectionLoading(false));
            toast.error("Failed to connect google calendar");
        };
    };


    const handleStripeConnect = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            dispatch(setStripeConnectionLoading(true));
            const res = await connectStripeAccount();
            window.location.href = res.data?.url || "";
        } catch {
            dispatch(setStripeConnectionLoading(false));
            toast.error("Failed to connect stripe");
        }
    };

    const listData = [
        {
            image: googleCalendar,
            heading: "Google",
            description: 'Connect your Google calendar to enable calendar syncing and manage your appointments automatically avoid overlapping.',
            title: "Connect Google",
            text: "Connect",
            action: handleConnectGoogle,
            show: true,
            connectionStatus: authUser?.googleConnected ?? false,
            isLoading: googleConnectionLoding,
        },
        {
            image: stripeLogo,
            heading: "Stripe",
            description: 'Connect your Stripe account to securely manage payments, payouts, and transaction tracking.',
            title: "Connect Stripe",
            text: "Connect",
            action: handleStripeConnect,
            show: authUser?.role === Role.PROVIDER,
            connectionStatus: authUser?.stripeConnected ?? false,
            isLoading: stripeConnectionLoading,
        }
    ]
    return (
        <>
            <div className='flex-none'>
                <h3 className='text-lg font-medium'>Integrations</h3>
                <p className='text-muted-foreground text-sm'>Integrations description</p>
            </div>
            <Separator className='my-4 flex-none' />
            <Card>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {listData?.map((item, index) => (
                            <IntegrationCard
                                key={index}
                                image={item.image}
                                heading={item.heading}
                                description={item.description}
                                title={item.title}
                                text={item.text}
                                action={item.action}
                                show={item.show}
                                connectionStatus={item.connectionStatus}
                                isLoading={item.isLoading}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default IntegrationsListing;