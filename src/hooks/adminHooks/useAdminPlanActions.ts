import { toast } from "react-toastify";
import { appConfig } from "@/utils/env";
import { useQueryClient } from "@tanstack/react-query";
import { adminAddNewPlan, adminChangePlanBlockStatus } from "@/utils/apis/adminPlan.api";
import { AdminAddNewPlanRequest, AdminChangePlanBlockStatusRequest } from "@/utils/interface/api/adminPlanApiInterface";

interface UseAdminPlanActionsReturnType {
    handleAdminPlanCreating: (formData: AdminAddNewPlanRequest) => void;
    handleAdminChangePlanStatus: (data: AdminChangePlanBlockStatusRequest) => void;
}

export const useAdminPlanActions = (): UseAdminPlanActionsReturnType => {

  const queryClient = useQueryClient();

  const handleAdminPlanCreating = async (formData: AdminAddNewPlanRequest) => {
      await adminAddNewPlan(formData)
      .then((res) => {
        if(res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["plans"] });
        }
      })
      .catch((error) => {
        if (appConfig.dev) console.log("An error occured while saving plan : ", error);
      });
    };

  const handleAdminChangePlanStatus = ({planId, isBlocked} : AdminChangePlanBlockStatusRequest) => {
    adminChangePlanBlockStatus({planId, isBlocked })
      .then((res) => {
        if(res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["plans"] });
        }
      })
      .catch((error) => {
        if (appConfig.dev) console.log("An error occured while change plan block status : ", error);
      });
  }

  return { handleAdminPlanCreating, handleAdminChangePlanStatus };
}