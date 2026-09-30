import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useBookingCallback } from '@/hooks/useBookingCallback';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { containerVariants } from '@/shared/utils/constants/designConstants';
import { 
  LoaderCircle, 
  CheckCircle2, 
  Calendar, 
  XCircle, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';

const UserBookingCallbackPage = () => {
  
  const { goTo } = useAppNavigation();
  const { status, bookingUpdating } = useBookingCallback();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-background/30 backdrop-blur-md z-50 p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[var(--mainColor)]/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-border/60 shadow-2xl bg-card/80 dark:bg-card/40 backdrop-blur-2xl rounded-3xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[var(--mainColor)] via-primary to-[var(--mainColorHover)]" />

          <CardHeader className="text-center pt-8 pb-2 px-6">
            <CardTitle className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              {status && bookingUpdating
                ? 'Confirming Booking'
                : status
                  ? 'Booking Confirmed'
                  : 'Payment Failed'}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {status && bookingUpdating
                ? 'Securing your appointment slot with the provider...'
                : status
                  ? 'Your appointment has been successfully scheduled'
                  : 'We were unable to complete your booking reservation'}
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status && bookingUpdating ? (
                /* LOADING STATE: No buttons rendered here */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[var(--mainColor)]/20 blur-xl animate-pulse" />
                    <div className="relative p-4 rounded-2xl bg-background/60 border border-border/50 shadow-inner">
                      <LoaderCircle className="h-12 w-12 animate-spin text-[var(--mainColor)]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Saving Your Reservation
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-[260px]">
                      Confirming availability and processing payment details. Please wait...
                    </p>
                  </div>

                  <div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[var(--mainColor)] h-full w-2/3 animate-[pulse_1.5s_infinite]" />
                  </div>
                </motion.div>
              ) : status ? (
                /* SUCCESS STATE */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
                    <div className="relative p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5" /> Confirmed
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Slot Secured!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your booking details are stored and ready. You can review your scheduled appointments at any time.
                    </p>
                  </div>

                  <Button
                    title="My Bookings"
                    variant="secondary"
                    onClick={() => goTo(redirectPaths.BOOKINGS)}
                    className={`w-full shadow-lg shadow-primary/5 transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <Calendar className="mr-2 size-5" />
                    View My Bookings
                    <ArrowRight className="ml-auto size-4 opacity-70" />
                  </Button>
                </motion.div>
              ) : (
                /* ERROR STATE */
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-destructive/20 blur-xl" />
                    <div className="relative p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive">
                      <XCircle className="h-12 w-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                      <AlertCircle className="h-3.5 w-3.5" /> Action Required
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Payment Failed
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We couldn't process your payment for this booking slot. Please review your bookings and try reserving again.
                    </p>
                  </div>

                  <Button
                    title="See Bookings"
                    onClick={() => goTo(redirectPaths.BOOKINGS)}
                    className="w-full bg-[var(--mainColor)] text-white hover:bg-[var(--mainColorHover)] shadow-lg shadow-[var(--mainColor)]/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    See Bookings
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserBookingCallbackPage;