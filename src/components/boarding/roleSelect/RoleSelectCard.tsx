import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Role } from "@/shared/interface/enums";
import { AppDispatch } from "@/shared/redux/appStore";
import { updateBoardingStep } from "@/shared/redux/slices/appSlice";
import { RoleSelectCardProps } from "@/shared/interface/componentInterface";

const RoleSelectCard = ({
    role,
    icon,
    title,
    description,
    selectedRole,
    onSelect,
}: RoleSelectCardProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const isSelected = selectedRole === role;

    const features =
        role === Role.USER
            ? [
                "Instant booking",
                "AI recommendations",
                "Calendar sync",
            ]
            : [
                "Manage appointments",
                "Accept online payments",
                "Grow your business",
            ];

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(role);
                }
            }}
            onClick={() => {
                onSelect(role);
                dispatch(updateBoardingStep(role === Role.USER ? 2 : 6));
            }}
            className={`group relative overflow-hidden cursor-pointer rounded-3xl border p-8 min-h-[360px] backdrop-blur-xl transition-all duration-300 bg-white/70 dark:bg-neutral-900/70 ${isSelected
                    ? "border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-500/30 shadow-[0_25px_80px_rgba(99,102,241,0.20)] bg-white dark:bg-neutral-900"
                    : "border-gray-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
                }`}
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-500/10 dark:to-violet-500/10 opacity-0 transition-opacity duration-500 ${isSelected ? "opacity-100" : "group-hover:opacity-100"
                    }`}
            />

            {isSelected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute right-5 top-5"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
                        <Check className="h-5 w-5" />
                    </div>
                </motion.div>
            )}

            <div className="relative flex h-full flex-col">
                <div className="mx-auto mb-8">
                    <div
                        className={`flex h-24 w-24 items-center justify-center rounded-3xl shadow-lg transition-transform duration-300 ${isSelected
                                ? "bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-violet-900/40"
                                : "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-800 dark:to-neutral-900 group-hover:scale-105"
                            }`}
                    >
                        <img
                            src={icon}
                            alt={title}
                            className="h-14 w-14 object-contain"
                        />
                    </div>
                </div>

                <h3 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h3>

                <p className="mt-3 text-center text-sm leading-6 text-gray-500 dark:text-neutral-400">
                    {description}
                </p>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-neutral-700 to-transparent" />

                <div className="space-y-3">
                    {features.map((feature) => (
                        <div
                            key={feature}
                            className="flex items-center gap-3"
                        >
                            <div
                                className={`flex h-6 w-6 items-center justify-center rounded-full ${isSelected
                                        ? "bg-indigo-100 dark:bg-indigo-500/20"
                                        : "bg-gray-100 dark:bg-neutral-800"
                                    }`}
                            >
                                <Check
                                    className={`h-3.5 w-3.5 ${isSelected
                                            ? "text-indigo-600 dark:text-indigo-400"
                                            : "text-gray-500 dark:text-neutral-400"
                                        }`}
                                />
                            </div>

                            <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default RoleSelectCard;