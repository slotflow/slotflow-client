import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { LoaderCircle, X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { stripeConfig } from '@/shared/config/env';
import { RootState } from '@/shared/redux/appStore';
import { getEventSocket } from '@/lib/socketService';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from "@/components/ui/card";
import { bookAnAppointment } from '@/shared/apis/booking';
import paypalLogo from '../../assets/iconImages/Paypal.png';
import stripeLogo from '../../assets/iconImages/Stripe.jpeg';
import razorpayLogo from '../../assets/iconImages/Razorpay.png';
import { EventSocketEnum } from '@/shared/interface/socket.interface';
import { checkoutForSubscribePlan } from '@/shared/apis/subscription';
import { setSubscriptionUpdating } from '@/shared/redux/slices/authSlice';
import { PaymentProcessStatus, PaymentProcessType } from '@/shared/interface/enums';
import { setPaymentProcessStatus, setPaymentSelectionOpen } from '@/shared/redux/slices/paymentSlice';

const PaymentSelection: React.FC = () => {

    const dispatch = useDispatch();
    const eventSocket = getEventSocket();
    const { bookingData, subscriptionData, status, type } = useSelector((state: RootState) => state.payment)

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
            if (type === PaymentProcessType.BOOKING) {

                if (!bookingData?.slotId || !bookingData?.providerId || !bookingData?.selectedServiceMode || !bookingData?.date) {
                    toast.error("Incomplete booking details.");
                    return;
                }

                eventSocket.emit(EventSocketEnum.slotEngageRequest, {
                    providerId: bookingData.providerId,
                    date: bookingData.date,
                    slotId: bookingData.slotId,
                });

                eventSocket.once(EventSocketEnum.slotEngageApproved, async () => {
                    try {
                        const response = await bookAnAppointment(bookingData);
                        const sessionId = response.data;

                        if (!sessionId) {
                            toast.error("Failed to create checkout session.");
                            dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                            return;
                        }

                        dispatch(setPaymentProcessStatus(PaymentProcessStatus.PROCESSING));
                        stripe.redirectToCheckout({ sessionId });

                    } catch {
                        toast.error("Booking payment failed");
                        dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                        eventSocket.emit(EventSocketEnum.slotUnlockRequest, {
                            providerId: bookingData.providerId,
                            date: bookingData.date,
                            slotId: bookingData.slotId,
                        });
                    }
                });

                eventSocket.once(EventSocketEnum.slotEngageRejected, () => {
                    toast.error("Slot already engaged by another user");
                });

                return;
            }

            if (type === PaymentProcessType.SUBSCRIPTION) {
                if (!subscriptionData?.planId || !subscriptionData?.planDuration) {
                    toast.error("Subscription details missing");
                    dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                    return;
                }
                try {
                    const response = await checkoutForSubscribePlan(subscriptionData);
                    const sessionId = response.data;

                    if (!sessionId) {
                        toast.error("Failed to create checkout session.");
                        dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                        return;
                    }

                    dispatch(setSubscriptionUpdating(true));
                    dispatch(setPaymentProcessStatus(PaymentProcessStatus.PROCESSING));
                    stripe.redirectToCheckout({ sessionId });

                } catch {
                    toast.error("Subscription payment failed.");
                    dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                }
            }

        } catch {
            toast.error("Something went wrong during payment.");
            dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
        } finally {
            dispatch(setPaymentSelectionOpen(false))
        }

    }, [bookingData, subscriptionData, type, dispatch]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            {status === PaymentProcessStatus.PROCESSING && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <LoaderCircle className="w-10 h-10 animate-spin text-white" />
                        <p className="text-white text-sm">Redirecting to payment...</p>
                    </motion.div>
                </div>
            )}
            {status !== PaymentProcessStatus.PROCESSING && (
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-md"
                >
                    <Card className="rounded-2xl shadow-xl border bg-[var(--background)]">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">Complete Payment</h2>
                            <X
                                className="cursor-pointer opacity-70 hover:opacity-100"
                                onClick={() => dispatch(setPaymentSelectionOpen(false))}
                            />
                        </div>
                        <CardContent className="p-5 space-y-5">
                            <div className="space-y-3">
                                {paymentGateways.map((gateway, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={gateway.onClick}
                                        className="w-full flex items-center gap-4 p-4 rounded-xl border bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)] transition-all"
                                    >
                                        <img
                                            src={gateway.img}
                                            alt={gateway.name}
                                            className="w-10 h-10 rounded-md object-cover"
                                        />
                                        <div className="flex flex-col items-start">
                                            {gateway.text}
                                            <span className="text-xs text-muted-foreground">
                                                Secure payment via {gateway.name}
                                            </span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    )
}

export default PaymentSelection