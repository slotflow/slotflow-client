import { motion } from 'framer-motion';
import { BillingCycle } from '@/shared/types/enums';

interface BillingCycleToggleProps {
  billingCycle: BillingCycle;
  onBillingCycleChange: (cycle: BillingCycle) => void;
  showDiscount?: boolean;
  discountText?: string;
  className?: string;
}

const BillingCycleToggle = ({
  billingCycle,
  onBillingCycleChange,
  showDiscount = true,
  discountText = 'Save 20%',
  className = '',
}: BillingCycleToggleProps) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex items-center gap-3">
        {/* Toggle */}
        <div className="relative flex h-11 items-center rounded-full border border-border bg-background/70 p-1 shadow-lg backdrop-blur-xl">
          {/* Animated active background */}
          <motion.div
            layoutId="billing-toggle"
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            className="absolute inset-y-1 left-1 w-[104px] rounded-full bg-primary"
            animate={{
              x: billingCycle === BillingCycle.MONTHLY ? 0 : 104,
            }}
          />

          <button
            type="button"
            onClick={() => onBillingCycleChange(BillingCycle.MONTHLY)}
            className={`relative z-10 flex h-9 w-[104px] cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              billingCycle === BillingCycle.MONTHLY
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>

          <button
            type="button"
            onClick={() => onBillingCycleChange(BillingCycle.YEARLY)}
            className={`relative z-10 flex h-9 w-[104px] cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              billingCycle === BillingCycle.YEARLY
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Discount */}
        {showDiscount && (
          <span className="whitespace-nowrap rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600">
            {discountText}
          </span>
        )}
      </div>
    </div>
  );
};

export default BillingCycleToggle;
