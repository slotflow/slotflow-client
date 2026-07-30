import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReferralCodeCardProps {
    value: string | null;
    onChange: (value: string) => void;
    onClose: () => void;
}

const ReferralCodeCard = ({
    value,
    onChange,
    onClose,
}: ReferralCodeCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <Card className="group relative mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-6 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 dark:border-neutral-700 dark:bg-neutral-900/70">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-500/10 dark:to-violet-500/10" />

                <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-base font-semibold text-foreground">
                                Referral Code
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Enter the referral code shared with you to unlock
                                referral benefits.
                            </p>
                        </div>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={onClose}
                            className="h-9 w-9 rounded-xl text-muted-foreground transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <input
                        type="text"
                        value={value ?? ""}
                        onChange={(e) => onChange(e.target.value.toUpperCase())}
                        placeholder="SF_REF_876876"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-background px-4 text-sm font-medium tracking-wide text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-neutral-700"
                    />

                    <p className="mt-3 text-xs text-muted-foreground">
                        Referral codes are optional and can only be applied during onboarding.
                    </p>
                </div>
            </Card>
        </motion.div>
    );
};

export default ReferralCodeCard;