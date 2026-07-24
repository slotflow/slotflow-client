import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";

const PaymentCard = () => {
  return (
    <Card className="w-72 rounded-3xl border-border/60 bg-background/80 p-5 shadow-xl backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/10">
          <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Payment
            </h3>

            <Badge
              variant="secondary"
              className="rounded-full px-2.5 py-0.5"
            >
              Success
            </Badge>
          </div>

          <div className="space-y-1">
            <p className="font-medium">
              Payment Successful
            </p>

            <p className="text-sm leading-6 text-muted-foreground">
              Your payment has been securely processed and your appointment is
              confirmed.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <ShieldCheck className="h-4 w-4" />

            <span>Secure transaction completed</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />

            <span>Receipt available in your bookings.</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentCard;