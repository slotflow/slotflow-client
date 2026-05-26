import { appConfig } from "@/shared/config/env";
import { useQueryClient } from "@tanstack/react-query";
import { changePlanBlockStatus } from "@/shared/apis/plan";
import { UseAdminPlanReturn } from "@/shared/interface/hooksInterface";
import { ChangePlanBlockStatusRequest } from "@/shared/interface/api/plan";

export const useAdminPlan = (): UseAdminPlanReturn => {
    const queryClient = useQueryClient();

    const changePlanStatus = async (data: ChangePlanBlockStatusRequest) => {
        try {
            const res = await changePlanBlockStatus(data);
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["plans"] });
            }
            return res;
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("Error in changePlanStatus ", error);
            }
            return { success: false, message: "Please try again" };
        }
    }

    return {
        changePlanStatus
    }
}