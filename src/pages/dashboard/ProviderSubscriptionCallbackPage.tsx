import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useSubscriptionCallback } from '@/hooks/useSubscriptionCallback';
import { actionBtnClass, containerVariants } from '@/shared/utils/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle, CheckCircle2, LayoutDashboard, XCircle, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

const ProviderSubscriptionCallbackPage = () => {

  const { toDashboard } = useAppNavigation();
  const { status, subscriptionUpdating } = useSubscriptionCallback();

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
              {status && subscriptionUpdating
                ? 'Confirming Subscription'
                : status
                  ? 'Subscription Confirmed'
                  : 'Payment Failed'}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {status && subscriptionUpdating
                ? 'Verifying payment details and activating your plan...'
                : status
                  ? 'Your plan is active and ready to use'
                  : 'We were unable to process your subscription'}
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status && subscriptionUpdating ? (
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
                      Activating Subscription
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-[260px]">
                      We are confirming your transaction with the provider network. Please wait...
                    </p>
                  </div>

                  <div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[var(--mainColor)] h-full w-2/3 animate-[pulse_1.5s_infinite]" />
                  </div>
                </motion.div>
              ) : status ? (
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
                      Subscription Activated!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your provider account has been upgraded. You now have full access to features.
                    </p>
                  </div>

                  <Button
                    title="Go to Dashboard"
                    variant="secondary"
                    onClick={() => toDashboard(true)}
                    className={`${actionBtnClass} w-full shadow-lg shadow-primary/5 transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Go to Dashboard
                    <ArrowRight className="ml-auto h-4 w-4 opacity-70" />
                  </Button>
                </motion.div>
              ) : (
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
                      We couldn't process your subscription setup. Please try again or return to the main dashboard.
                    </p>
                  </div>

                  <Button
                    title="Go to Dashboard"
                    onClick={() => toDashboard(true)}
                    className="w-full bg-[var(--mainColor)] text-white hover:bg-[var(--mainColorHover)] shadow-lg shadow-[var(--mainColor)]/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Go to Dashboard
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

export default ProviderSubscriptionCallbackPage;
