import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Role } from "@/utils/interface/enums";
import { RootState } from "@/utils/redux/appStore";
import { Payment } from "@/utils/interface/entityInterface/paymentInterface";
import { Subscription } from "@/utils/interface/entityInterface/subscriptionInterface";

interface UseCommonHookInterface {
    handleAdminGetProviderDetailPage: (subscriptionId: Subscription["_id"]) => void;
    handleGetPaymentDetailsPage: (paymentId: Payment["_id"]) => void;
}

export const useCommonHook = (): UseCommonHookInterface => {

    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const handleAdminGetProviderDetailPage = (subscriptionId: Subscription["_id"]) => {
        if (authUser?.role === Role.ADMIN) {
            navigate(`/admin/subscriptions/${subscriptionId}`)
        } else if (authUser?.role === Role.PROVIDER) {
            navigate(`/provider/subscriptions/${subscriptionId}`)
        }
    }

    const handleGetPaymentDetailsPage = (paymentId: Payment["_id"]) => {
        if(authUser?.role === Role.ADMIN){
            navigate(`/admin/payments/${paymentId}`)
        }else if(authUser?.role === Role.PROVIDER){
            navigate(`/provider/payments/${paymentId}`)
        } else if(authUser?.role === Role.USER) {
            navigate(`/user/payments/${paymentId}`)
        }
    }

    return { handleAdminGetProviderDetailPage, handleGetPaymentDetailsPage }
}