import { motion } from "framer-motion";

export type BillingCycle = "monthly" | "yearly";

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
    discountText = "Save 20%",
    className = "",
}: BillingCycleToggleProps) => {
    return (
        <div className={`flex justify-center ${className}`}>
            <div className="relative flex items-center rounded-full border border-border bg-background/70 p-1 shadow-lg backdrop-blur-xl">
                <motion.div
                    layoutId="billing-toggle"
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                    }}
                    className="absolute inset-y-1 rounded-full bg-primary"
                    animate={{
                        width: billingCycle === "monthly" ? 108 : 100,
                        left: billingCycle === "monthly" ? 4 : 112,
                    }}
                />

                <button
                    type="button"
                    onClick={() => onBillingCycleChange("monthly")}
                    className={`relative z-10 px-8 py-2 text-sm font-semibold transition-colors ${
                        billingCycle === "monthly"
                            ? "text-primary-foreground"
                            : "text-muted-foreground"
                    }`}
                >
                    Monthly
                </button>

                <button
                    type="button"
                    onClick={() => onBillingCycleChange("yearly")}
                    className={`relative z-10 px-8 py-2 text-sm font-semibold transition-colors ${
                        billingCycle === "yearly"
                            ? "text-primary-foreground"
                            : "text-muted-foreground"
                    }`}
                >
                    Yearly
                </button>

                {showDiscount && (
                    <span className="ml-3 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                        {discountText}
                    </span>
                )}
            </div>
        </div>
    );
};

export default BillingCycleToggle;