import { Card } from "@/components/ui/card";
import { HearAboutUsOptionValue } from "@/shared/interface/enums";
import { hearAboutUsOptions } from "@/shared/utils/constants";

interface HearAboutUsOptionsProps {
    setSelectedOption: (value:  HearAboutUsOptionValue | null) => void;
    selectedOption: string | null;
}

const HearAboutUsOptions = ({
    setSelectedOption,
    selectedOption
}: HearAboutUsOptionsProps) => {
    return (
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {hearAboutUsOptions.map((option) => {
                    const Icon = option.icon
                    return (
                        <Card
                            key={option.value}
                            onClick={() => setSelectedOption(option.value)}
                            className={`group relative overflow-hidden cursor-pointer rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 bg-white/70 dark:bg-neutral-900/70 ${selectedOption === option.value
                                    ? "border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-500/30 shadow-[0_20px_60px_rgba(99,102,241,0.20)] bg-white dark:bg-neutral-900"
                                    : "border-gray-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                                }`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-500/10 dark:to-violet-500/10 opacity-0 transition-opacity duration-500 ${selectedOption === option.value ? "opacity-100" : "group-hover:opacity-100"}`} />

                            <div className="relative flex items-center gap-3">
                                <Icon className="h-5 w-5 text-muted-foreground" />
                                <p className="text-sm font-medium text-foreground">
                                    {option.label}
                                </p>
                            </div>
                        </Card>
                    )
                })}
            </div>
    );
};

export default HearAboutUsOptions;