import { appConfig } from "@/shared/config/env";
import { useQueryClient } from "@tanstack/react-query";
import { changeServiceBlockStatus } from "@/shared/apis/service";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { ChangeServiceBlockStatusRequest } from "@/shared/interface/api/service";

interface AdminServiceActionsReturnType {
    changeServiceStatus: (data: ChangeServiceBlockStatusRequest) => Promise<ApiBaseResponse>;
}

export const useAdminServiceActions = (): AdminServiceActionsReturnType => {
    const queryClient = useQueryClient();

   const changeServiceStatus = async (data: ChangeServiceBlockStatusRequest) => {
    try {
      const res = await changeServiceBlockStatus(data);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["appServices"] });
      }
      return res;
    } catch (error) {
      if(appConfig.isDevelopment) {
        console.log("Error while changing service status:", error);
      }
      return { success: false, message: "Please try again" };
    }
  }

  return {
    changeServiceStatus
  }
}