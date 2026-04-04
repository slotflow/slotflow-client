import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Loader2, CheckCircle2, LayoutDashboard, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import {
  setSubscription,
  setSubscriptionUpdating,
} from "@/shared/redux/slices/authSlice";
import { fetchMySubscription } from "@/shared/apis/subscription";

interface ProviderSubscriptionConfirmPageProps {
  status: boolean;
}

const ProviderSubscriptionConfirmPage: React.FC<ProviderSubscriptionConfirmPageProps> = ({ status }) => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { authUser, subscriptionUpdating } = useSelector(
    (state: RootState) => state.auth
  );

  const isFetched = useRef(false);

  const fetchSubscription = async () => {
    try {
      const res = await fetchMySubscription();
      if (res.success) {
        dispatch(setSubscription(res.data));
        toast.success("Subscription Activated!");
      }
    } catch (error) {
      toast.error("Subscription activation failed");
    } finally {
      setTimeout(() => {
        dispatch(setSubscriptionUpdating(false));
      }, 1500);
    }
  };

  useEffect(() => {
    if (!status || !authUser || isFetched.current) return;

    isFetched.current = true;
    const timeout = setTimeout(() => {
      fetchSubscription();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [authUser, status]);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-background/10 backdrop-blur-sm z-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md px-4"
      >
        <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[var(--mainColor)] to-[var(--mainColorHover)] bg-clip-text text-transparent">
              Account Setup
            </CardTitle>
          </CardHeader>

          <CardContent className="py-8">
            <AnimatePresence mode="wait">
              {status && subscriptionUpdating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center space-y-6 text-center"
                >
                  <Loader2 className="h-16 w-16 animate-spin text-[var(--mainColor)]" />
                  <h3 className="text-lg font-semibold">
                    Activating Subscription
                  </h3>
                </motion.div>
              ) : status ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center space-y-6 text-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <h3 className="text-xl font-bold">
                    Subscription Activated!
                  </h3>
                  <Button
                    title="Go to Dashboard"
                    onClick={() => navigate("/provider/dashboard")}
                    className="bg-[var(--mainColor)] text-white"
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center space-y-6 text-center"
                >
                  <XCircle className="h-16 w-16 text-red-500" />
                  <h3 className="text-xl font-bold">Payment Failed</h3>
                  <Button
                    title="Go to Dashboard"
                    onClick={() => navigate("/provider/dashboard")}
                    className="bg-[var(--mainColor)] text-white"
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

export default ProviderSubscriptionConfirmPage;