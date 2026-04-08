import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { checkBookingConfirmed } from "@/shared/apis/booking";
import { Calendar, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate, useSearchParams,  } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserBookingConfirmPage: React.FC = () => {

  const [searchParams] = useSearchParams();
  const statusParam =  searchParams.get("status");
  const status = statusParam === "success";

  const navigate = useNavigate();

  const checkRecentBooking = async () => {
    try {
      const response = await checkBookingConfirmed();
      console.log("response : ", response);
      if (response.data) {
        toast.success("Your Booking has been confirmed");
      } else {
        toast.error("Booking failed");
      }
    } catch {
      toast.error("Booking failed");
    }
  };

  useEffect(() => {
    if (!status) return;
    const timeout = setTimeout(() => {
      checkRecentBooking();
    }, 5000);

    return (() => clearTimeout(timeout));
  }, [status]);

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
              Saving Booking
            </CardTitle>
          </CardHeader>

          <CardContent className="py-8">
            <AnimatePresence mode="wait">
              {status ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center space-y-6 text-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <h3 className="text-xl font-bold">Booking Confirmed!</h3>
                  <Button
                    title="My Bookings"
                    onClick={() => navigate("/user/bookings")}
                    className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    My Bookings
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
                    onClick={() => navigate("/user/dashboard")}
                    className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
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

export default UserBookingConfirmPage;