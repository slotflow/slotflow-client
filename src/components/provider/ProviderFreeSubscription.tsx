import { useState } from "react";
import { toast } from "react-toastify";
import { X, Loader, Coins } from "lucide-react";
import { RootState } from "@/utils/redux/appStore";
import { PlanName } from "@/utils/interface/enums";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setSubscription } from "@/utils/redux/slices/authSlice";
import { providerSubscribeToTrialPlan } from "@/utils/apis/provider.api";
import { setPaymentSelectionPage, setSubscriptionIsTrailPlan } from "@/utils/redux/slices/providerSlice";

const ProviderFreeSubscription = () => {

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const { paymentSelectionOpen } = useSelector((store: RootState) => store.provider);

    const handlePaymentSelectionClose = () => {
        dispatch(setPaymentSelectionPage(false));
        dispatch(setSubscriptionIsTrailPlan(false));
        dispatch(setSubscription({
            data: {
                subscriptionPlan: PlanName.TRIAL,
                providerId: "",
                startDate: new Date(),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
            message: "Trial Plan Subscribed Successfully",
            success: true
        }));
    };

    const makeTrialubscription = async () => {
        setPaymentLoading(true);
        try {
            const res = await providerSubscribeToTrialPlan();
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
