import { appConfig } from "@/shared/config/env";
import { useQueryClient } from "@tanstack/react-query";
import { changeUserBlockStatus } from "@/shared/apis/user";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { AdminChangeUserStatusRequest } from "@/shared/interface/api/user";

interface AdminUserReturn {
    changeUserStatus: (data: AdminChangeUserStatusRequest) => Promise<ApiBaseResponse>;
}

export const useAdminUser = (): AdminUserReturn => {
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