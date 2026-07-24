import {
  Receipt,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const PaymentPreview = () => {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/80 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Payment Summary
          </p>
          <h4 className="mt-1 text-lg font-bold">
            Appointment Confirmed
          </h4>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10">
          <CheckCircle2 className="h-7 w-7 text-green-500" />
        </div>
      </div>
      <div className="mt-8 rounded-2xl border border-border/60 bg-muted/30 p-5">
        <p className="text-sm text-muted-foreground">
          Total Paid
        </p>
        <p className="mt-2 text-4xl font-black tracking-tight">
          ₹799
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Payment Successful
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="text-sm">
              Visa •••• 2481
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            Card
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Receipt className="h-4 w-4 text-primary" />
            <span className="text-sm">
              Booking Fee
            </span>
          </div>
          <span className="text-sm font-medium">
            ₹799
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-sm">
              Secure Transaction
            </span>
          </div>
          <span className="text-xs rounded-full bg-primary/10 px-2 py-1 text-primary">
            Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPreview;