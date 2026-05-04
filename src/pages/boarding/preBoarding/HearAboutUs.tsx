import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BoardingLayout from "@/layouts/BoardingLayout";
import { HearAboutUsOptionValue } from "@/shared/interface/enums";
import { hearAboutUsOptions, onboardingContent } from "@/shared/utils/constants";

interface HearAboutUsProps {
    selectedOption: HearAboutUsOptionValue | null;
    setSelectedOption: (option: HearAboutUsOptionValue | null) => void;
    setReferralCode: (code: string | null) => void;
    referralCode: string | null;
}

const HearAboutUs: React.FC<HearAboutUsProps> = ({
    referralCode,
    selectedOption,
    setReferralCode,
    setSelectedOption
}) => {
    return (
        <BoardingLayout
            pageNumber={0}
            heading={onboardingContent.hearAboutUs.title}
            description={onboardingContent.hearAboutUs.description}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {hearAboutUsOptions.map((option) => {
                    const Icon = option.icon
                    return (
                        <Card
                            key={option.value}
                            onClick={() => setSelectedOption(option.value)}
                            className={cn(
                                "cursor-pointer p-3 border transition-all rounded-md flex items-center gap-3",
                                "hover:border-[var(--mainColor)] hover:shadow-sm",
                                selectedOption === option.value
                                    ? "border-[var(--mainColor)] bg-primary/5"
                                    : "border-muted"
                            )}
                        >
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            <p className="text-sm font-medium">{option.label}</p>
                        </Card>
                    )
                })}
            </div>

            {selectedOption === HearAboutUsOptionValue.REFERRAL && (
                <Card className="mt-6 p-4 border rounded-md">
                    <div className="flex justify-between">
                        <p className="text-sm font-medium mb-2">
                            Enter referral code
                        </p>
                        <Button
                            className="shrink-0 cursor-pointer hover:bg-red-100 border-red-300 hover:text-red-700 size-6"
                            onClick={() => setSelectedOption(null)}
                        >
                            <X />
                        </Button>
                    </div>
                    <input
                        type="text"
                        value={referralCode ?? ""}
                        onChange={(e) => setReferralCode(e.target.value)}
                        placeholder="e.g. SF_REF_876876"
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-[var(--mainColor)]"
                    />
                </Card>
            )}
        </BoardingLayout>
    )
}

export default HearAboutUs;