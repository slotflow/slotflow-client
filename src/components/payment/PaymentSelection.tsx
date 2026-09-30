import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useCallback, useMemo } from 'react';
import { useBooking } from '@/hooks/useBooking';
import { RootState } from '@/app/store/appStore';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { useSubscription } from '@/hooks/useSubscription';
import paypalLogo from '../../assets/logos/external/paypal.png';
import stripeLogo from '../../assets/logos/external/stripe.jpeg';
import razorpayLogo from '../../assets/logos/external/razorpay.png';
import { setPaymentSelectionClose } from '@/app/store/slices/paymentSlice';
import { PaymentProcessStatus, PaymentProcessType } from '@/shared/types/enums';
import { X, ArrowRight, CreditCard, LockKeyhole, LoaderCircle, ShieldCheck } from 'lucide-react';

const PaymentSelection = () => {

  const dispatch = useDispatch();
  const { subscribePlan } = useSubscription();
  const { bookAppointment } = useBooking();
  const { bookingData, subscriptionData, status, type } = useSelector((state: RootState) => state.payment);
  const isSubscription = type === PaymentProcessType.SUBSCRIPTION;

  const makeStripePayment = useCallback(() => {
    if (type === PaymentProcessType.BOOKING) {
      if (!bookingData) {
        toast.error('Booking details are missing.');
        return;
      }
      bookAppointment(bookingData);
    } else if (type === PaymentProcessType.SUBSCRIPTION) {
      if (!subscriptionData) {
        toast.error('Subscription details are missing.');
        return;
      }
      subscribePlan(subscriptionData);
    }
  }, [bookingData, subscriptionData, type, bookAppointment, subscribePlan]);

  const paymentGateways = useMemo(() => {
    const gateways = [
      {
        id: 'stripe',
        name: 'Stripe',
        img: stripeLogo,
        text: <h6 className="font-bold italic text-[#635bff]">Stripe</h6>,
        onClick: makeStripePayment,
      },
      {
        id: 'paypal',
        name: 'PayPal',
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
        id: 'razorpay',
        name: 'Razorpay',
        img: razorpayLogo,
        text: <h6 className="font-bold italic text-[#072654]">Razorpay</h6>,
        onClick: makeStripePayment,
      },
    ];

    if (isSubscription) {
      return gateways.filter((gateway) => gateway.id === 'stripe');
    }

    return gateways;
  }, [type, makeStripePayment]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-md">
      {status === PaymentProcessStatus.PROCESSING && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-background/95 px-10 py-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <LoaderCircle className="h-7 w-7 animate-spin text-primary" />
            </div>

            <div className="text-center">
              <p className="font-semibold text-foreground">Redirecting to payment</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Please wait while we securely connect you...
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {status === PaymentProcessStatus.FAILED && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex max-w-sm flex-col items-center gap-4 rounded-2xl border border-red-500/20 bg-background/95 px-8 py-8 text-center shadow-2xl backdrop-blur-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
              <LockKeyhole className="h-7 w-7 text-red-500" />
            </div>

            <div>
              <p className="font-semibold text-foreground">Payment failed</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Something went wrong while starting the payment. Please try again.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(setPaymentSelectionClose())}
              className="w-full"
            >
              Close
            </Button>
          </motion.div>
        </div>
      )}

      {status !== PaymentProcessStatus.PROCESSING && status !== PaymentProcessStatus.FAILED && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
          className="w-full max-w-lg"
        >
          <Card className="overflow-hidden rounded-3xl border border-border/60 bg-[var(--background)] shadow-2xl">
            <div className="relative border-b border-border/60 px-6 pb-5 pt-6">
              <Button
                type="button"
                size='sm'
                variant='ghost'
                onClick={() => dispatch(setPaymentSelectionClose())}
                className={`absolute right-4 top-4`}
              >
                <X className="size-5" />
              </Button>

              <div className="flex items-start gap-4 pr-10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h2 className="text-xl font-bold tracking-tight">Complete Payment</h2>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {!isSubscription ? 'Choose your preferred payment method to continue securely.' : 'Secure payment through stripe'}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-border/50 bg-muted/40 px-3 py-2.5">
                <ShieldCheck className="size-4 text-emerald-500" />

                <span className="text-xs font-medium text-muted-foreground">
                  Secure payment • Your payment details are protected
                </span>
              </div>
            </div>

            <CardContent className="space-y-5 p-6">
              {!isSubscription && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Select payment method</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select one of the available payment providers below.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {paymentGateways.map((gateway) => (
                  <motion.button
                    key={gateway.id}
                    whileHover={{
                      scale: 1.015,
                      y: -1,
                    }}
                    whileTap={{
                      scale: 0.985,
                    }}
                    onClick={gateway.onClick}
                    className="cursor-pointer group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border/70 bg-[var(--menuBg)] p-4 text-left transition-all duration-200 hover:border-primary/40 hover:bg-[var(--menuItemHoverBg)] hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border shadow-sm">
                      <img
                        src={gateway.img}
                        alt={gateway.name}
                        className="h-9 w-9 rounded-md object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {gateway.text}

                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Secure
                        </span>
                      </div>

                      <span className="mt-1 block text-xs text-muted-foreground">
                        Secure payment via {gateway.name}
                      </span>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200">
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 text-center">
                <LockKeyhole className="h-3.5 w-3.5 text-muted-foreground" />

                <p className="text-xs text-muted-foreground">
                  Payments are processed securely by our payment partners
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentSelection;