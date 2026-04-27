import { appConfig } from "@/shared/config/env";
import { useQueryClient } from "@tanstack/react-query";
import { changeUserBlockStatus } from "@/shared/apis/user";
import { UseAdminUserReturn } from "@/shared/interface/hooksInterface";
import { AdminChangeUserStatusRequest } from "@/shared/interface/api/user";

export const useAdminUser = (): UseAdminUserReturn => {
    const queryClient = useQueryClient();

    const changeUserStatus = async (data: AdminChangeUserStatusRequest) => {
        try {
            const res = await changeUserBlockStatus(data);
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["users"] });
            }
            return res;
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("Error in handleAdminChangeUserBlockStatus: ", error);
            }
            return { success: false, message: "Please try again" };
        }
    }

    return {
        changeUserStatus
    }

}