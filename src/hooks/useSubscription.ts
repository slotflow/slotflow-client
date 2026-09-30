import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { stripeClient } from "@/lib/stripe"
import { AppDispatch } from "@/app/store/appStore"
import { useMutation } from "@tanstack/react-query"
import { PaymentProcessStatus } from "@/shared/types/enums"
import { handleError } from "@/shared/utils/helper/handleError"
import { UseSubscriptionHookReturn } from "@/shared/types/hooks"
import { ApiBaseResponse, ApiError } from "@/shared/types/common"
import { subscribePlanCheckout } from "@/services/apis/subscription"
import { setSubscriptionUpdating } from "@/app/store/slices/authSlice"
import { SubscribePlanCheckoutRequest, SubscribePlanCheckoutResponse } from "@/shared/types/api/subscription"
import { setPaymentProcessStatus, setPaymentSelectionClose, setSubscriptionData } from "@/app/store/slices/paymentSlice"

export const useSubscription = (): UseSubscriptionHookReturn => {

    const dispatch = useDispatch<AppDispatch>();

    const subscribePlanMutation = useMutation<
        ApiBaseResponse<SubscribePlanCheckoutResponse>,
        ApiError,
        SubscribePlanCheckoutRequest
    >({
        mutationFn: (data) => {
            if (!data?.planId || !data?.billingCycle) {
                dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                throw new Error("Billing cycle missing, please try again.")
            }
            dispatch(setPaymentProcessStatus(PaymentProcessStatus.PROCESSING));
            return subscribePlanCheckout(data);
        },
        onSuccess: (res) => {
            if (res.success && res.data) {
                const { sessionId } = res.data;

                if (!sessionId) {
                    toast.error('Failed to create checkout session.');
                    dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
                    return;
                }

                dispatch(setSubscriptionUpdating(true));
                stripeClient?.redirectToCheckout({ sessionId });
            } else {
                toast.error(res.message || 'Could not subscribe to trial plan.');
                dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
            }
        },
        onError: (error: ApiError) => {
            handleError(error, 'Failed to subscribe to trial plan.');
            dispatch(setPaymentProcessStatus(PaymentProcessStatus.FAILED));
        },
        onSettled: () => {
            dispatch(setPaymentSelectionClose());
             dispatch(setSubscriptionData(null));
        },
    });

    return {
        subscribePlan: subscribePlanMutation.mutate,
    }
}