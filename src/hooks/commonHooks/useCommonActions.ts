import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import { Subscription } from "@/utils/interface/entityInterface/subscriptionInterface";
import { Role } from "@/utils/interface/enums";

interface UseCommonHookInterface {
    handleAdminGetProviderDetailPage: (subscriptionId: Subscription["_id"]) => void;
}
export const useCommonHook = (): UseCommonHookInterface => {

    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const handleAdminGetProviderDetailPage = (subscriptionId: Subscription["_id"]) => {
        if (authUser?.role === Role.ADMIN) {
            navigate(`/admin/subscription/${subscriptionId}`)
        } else if (authUser?.role === Role.PROVIDER) {
            navigate(`/provider/subscription/${subscriptionId}`)
        }
    }

    return { handleAdminGetProviderDetailPage }
}