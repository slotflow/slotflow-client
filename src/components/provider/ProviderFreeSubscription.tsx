import { useState } from "react";
import { toast } from "react-toastify";
import { X, Loader, Coins } from "lucide-react";
import { RootState } from "@/shared/redux/appStore";
import { PlanName, SubscriptionStatus } from "@/shared/interface/enums";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setSubscription } from "@/shared/redux/slices/authSlice";
import { setPaymentSelectionPage, setSubscriptionIsTrailPlan } from "@/shared/redux/slices/providerSlice";
import { subscribeToTrialPlan } from "@/shared/apis/subscription";

const ProviderFreeSubscription = () => {

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const { paymentSelectionOpen } = useSelector((store: RootState) => store.provider);

    const handlePaymentSelectionClose = () => {
        dispatch(setPaymentSelectionPage(false));
        dispatch(setSubscriptionIsTrailPlan(false));
        dispatch(setSubscription({
            subscribedPlan: PlanName.TRIAL,
            providerId: "",
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            subscriptionStatus: SubscriptionStatus.ACTIVE
        }));
    };

    const makeTrialubscription = async () => {
        setPaymentLoading(true);
        try {
            const res = await subscribeToTrialPlan();
            toast.success(res.message);
            handlePaymentSelectionClose();
            queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
        } catch {
            setPaymentLoading(false);
        } finally {
            setPaymentLoading(false);
        }
    }

    return paymentSelectionOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
            {!paymentLoading ? (
                <div className="w-3/12 rounded-lg shadow-lg border p-4 bg-[var(--background)]" >
                    <X className="cursor-pointer ml-auto" onClick={handlePaymentSelectionClose} />
                    <div className="py-6 space-y-4">
                        <button className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]" onClick={makeTrialubscription}>
                            <Coins className="w-8 h-8" />
                            <h6 className="font-bold italic">Enter To Trial Plan</h6>
                        </button>
                    </div>
                </div>
            ) : (
                <Loader className="w-10 h-10 animate-spin" />
            )}
        </div>
    );
};

export default ProviderFreeSubscription;
