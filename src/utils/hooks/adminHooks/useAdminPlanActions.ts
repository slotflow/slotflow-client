import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { adminAddNewPlan, adminChangePlanBlockStatus } from "../../apis/adminPlan.api";
import { AdminAddNewPlanRequest, AdminChangePlanBlockStatusRequest } from "@/utils/interface/api/adminPlanApiInterface";

interface UseAdminPlanActionsReturnType {
    handleAdminPlanCreating: (formData: AdminAddNewPlanRequest) => void;
    handleAdminChangePlanStatus: (data: AdminChangePlanBlockStatusRequest) => void;
}

export const useAdminPlanActions = (): UseAdminPlanActionsReturnType => {

  const queryClient = useQueryClient();

  const handleAdminPlanCreating = (formData: AdminAddNewPlanRequest) => {
      adminAddNewPlan(formData)
      .then((res) => {
        if(res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["plans"] });
        }
      })
      .catch((res) => {
        toast.success(res.message);
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
      .catch(() => {
        toast.error("Please try again");
      });
  }

  return { handleAdminPlanCreating, handleAdminChangePlanStatus };
}