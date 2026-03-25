import { toast } from 'react-toastify';
import { Loader, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { stripeConfig } from '@/utils/env';
import { useCallback, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { getEventSocket } from '@/lib/socketService';
import paypalLogo from '../../assets/iconImages/Paypal.png';
import stripeLogo from '../../assets/iconImages/Stripe.jpeg';
import { bookAnAppointment } from '@/utils/apis/booking.api';
import { SubscriptionValidity } from '@/utils/interface/enums';
import razorpayLogo from '../../assets/iconImages/Razorpay.png';
import { EventSocketEnum } from '@/utils/interface/socket.interface';
import { setSubscriptionUpdating } from '@/utils/redux/slices/authSlice';
import { Provider } from '@/utils/interface/entityInterface/providerInterface';
import { setPaymentSelectionPage, setSubscriptionIsTrailPlan, setSubscriptionPlanDuration, setSubscriptionPlanId } from '@/utils/redux/slices/providerSlice';
import { checkoutForSubscribePlan } from '@/utils/apis/subscription.api';

type UserBookinAppointmentDataProps = {
    providerId: Provider["_id"]
    slotId: string;
    date: Date;
    selectedServiceMode: string;
}

interface ProviderSubscriptionDataProps {
    planId: string;
    planDuration: SubscriptionValidity;
}

interface PaymentSelecionComponentPropst {
    setOpenPayment?: (data: boolean) => void;
    data: UserBookinAppointmentDataProps | ProviderSubscriptionDataProps;
    isAppointmentBooking?: boolean;
    isProviderSubscription?: boolean;
}

const CommonPaymentSelection: React.FC<PaymentSelecionComponentPropst> = ({
    setOpenPayment,
    data,
    isAppointmentBooking,
    isProviderSubscription,
}) => {


    const dispatch = useDispatch();
    const eventSocket = getEventSocket();
    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

    const makeStripePayment = useCallback(async () => {
    const stripePublishKey = stripeConfig.stripePublishableKey;

    if (!stripePublishKey) {
        toast.error("Stripe key is missing!");
        return;
    }

    const stripe = await loadStripe(stripePublishKey);

    if (!stripe) {
        toast.error("Stripe failed to load!");
        return;
    }

    try {
        setPaymentLoading(true);

        if (isAppointmentBooking) {

            const infoData = data as UserBookinAppointmentDataProps;

            if (!infoData.slotId || !infoData.providerId || !infoData.selectedServiceMode || !infoData.date) {
                toast.error("Incomplete booking details.");
                return;
            }

            eventSocket.emit(EventSocketEnum.slotEngageRequest, {
                providerId: infoData.providerId,
                date: infoData.date,
                slotId: infoData.slotId,
            });

            eventSocket.once(EventSocketEnum.slotEngageApproved, async () => {
                try {

                    const response = await bookAnAppointment(infoData);
                    const sessionId = response.data;

                    if (!sessionId) {
                        toast.error("Failed to create checkout session.");
                        return;
                    }

                    dispatch(setPaymentSelectionPage(false));

                    const result = await stripe.redirectToCheckout({ sessionId });

                    if (result?.error) {
                        toast.error(result.error.message);

                        eventSocket.emit(EventSocketEnum.slotUnlockRequest, {
                            providerId: infoData.providerId,
                            date: infoData.date,
                            slotId: infoData.slotId,
                        });
                    }

                } catch {
                    toast.error("Booking payment failed");

                    eventSocket.emit(EventSocketEnum.slotUnlockRequest, {
                        providerId: infoData.providerId,
                        date: infoData.date,
                        slotId: infoData.slotId,
                    });
                }
            });

            eventSocket.once(EventSocketEnum.slotEngageRejected, () => {
                toast.error("Slot already engaged by another user");
            });

            return;
        }

        if (isProviderSubscription) {

            const infoData = data as ProviderSubscriptionDataProps;

            if (!infoData.planId || !infoData.planDuration) {
                toast.error("Subscription details missing");
                return;
            }

            const response = await checkoutForSubscribePlan(infoData);
            const sessionId = response.data;

            if (!sessionId) {
                toast.error("Failed to create checkout session.");
                return;
            }

            dispatch(setPaymentSelectionPage(false));
            dispatch(setSubscriptionUpdating(true));

            const result = await stripe.redirectToCheckout({ sessionId });

            if (result?.error) {
                toast.error(result.error.message);
            }
        }

    } catch {
        toast.error("Something went wrong during payment.");
    } finally {

        setPaymentLoading(false);

        dispatch(setSubscriptionPlanId(null));
        dispatch(setSubscriptionPlanDuration(null));
        dispatch(setSubscriptionIsTrailPlan(false));
    }

}, [data, isAppointmentBooking, isProviderSubscription, dispatch]);


    const paymentGateways = [
        {
            name: "Stripe",
            img: stripeLogo,
            text: <h6 className="font-bold italic text-[#635bff]">Stripe</h6>,
            onClick: makeStripePayment,
        },
        {
            name: "PayPal",
            img: paypalLogo,
            text: (
                <h6 className="font-bold italic space-x-1">
                    <span className="text-[#002991]">Pay</span>
                    <span className="text-[#60cdff]">Pal</span>
                </h6>
            ),
            onClick: makeStripePayment,
        },
        {
            name: "Razorpay",
            img: razorpayLogo,
            text: <h6 className="font-bold italic text-[#072654]">Razorpay</h6>,
            onClick: makeStripePayment,
        },
    ];



    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
            {!paymentLoading ? (
                <div className="w-full max-w-sm rounded-lg shadow-lg border p-4 bg-[var(--background)]">
                    <X
                        className="cursor-pointer ml-auto"
                        onClick={() => {
                            dispatch(setPaymentSelectionPage(false));
                            if (setOpenPayment)
                                setOpenPayment(false);
                        }}
                    />
                    <div className="py-6 space-y-4">
                        <h2 className="text-lg font-bold mb-4 text-center">Choose Payment Gateway</h2>
                        {paymentGateways.map((gateway, index) => (
                            <button
                                key={index}
                                onClick={gateway.onClick}
                                className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]"
                            >
                                <img src={gateway.img} alt={gateway.name} className="w-8 h-8" />
                                {gateway.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <Loader className="w-10 h-10 animate-spin text-white" />
            )}
        </div>
    )
}

export default CommonPaymentSelection