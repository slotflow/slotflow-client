import { appConfig } from "@/shared/config/env";
import { useQueryClient } from "@tanstack/react-query";
import { changeServiceBlockStatus } from "@/shared/apis/service";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { UseAdminServiceReturn } from "@/shared/interface/hooksInterface";
import { ChangeServiceBlockStatusRequest } from "@/shared/interface/api/service";

export const useAdminService = (): UseAdminServiceReturn => {
  const queryClient = useQueryClient();

  const changeServiceStatus = async (data: ChangeServiceBlockStatusRequest): Promise<ApiBaseResponse> => {
    try {
      const res = await changeServiceBlockStatus(data);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["appServices"] });
      }
      return res;
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log("Error while changing service status:", error);
      }
      return { success: false, message: "Please try again" };
    }
  }

  return {
    changeServiceStatus
  }
}