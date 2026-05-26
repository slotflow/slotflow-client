import React from "react";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { PlanName } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";
import { defaultButtonClassName } from "@/shared/utils/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CustomizationCard: React.FC = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);

    const isPremium =
        authUser?.providerSubscription === PlanName.PROFESSIONAL ||
        authUser?.providerSubscription === PlanName.ENTERPRISE;

    const handleProfileCustomization = () => {
        toast.info("We are working on it")
    }

    const handleUpgradePlan = () => {
        toast.info("We are working on it")
    }

    return (
        <Card className="border shadow-sm rounded-xl">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Edit className="w-5 h-5 text-primary" />
                    {isPremium ? "Customize Your Profile" : "Unlock Profile Customization"}
                </CardTitle>

                <CardDescription>
                    {isPremium
                        ? "Personalize how your profile appears to customers and showcase your services professionally."
                        : "Upgrade your plan to customize your profile and stand out to potential clients."
                    }
                </CardDescription>
            </CardHeader>

            <CardContent>
                {isPremium ? (
                    <Button
                        variant="default"
                        className={defaultButtonClassName + " w-full"}
                        onClick={handleProfileCustomization}
                    >
                        Customize Profile
                    </Button>
                ) : (
                    <Button
                        variant="default"
                        className={defaultButtonClassName + " w-full"}
                        onClick={handleUpgradePlan}
                    >
                        Upgrade Plan
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default CustomizationCard;