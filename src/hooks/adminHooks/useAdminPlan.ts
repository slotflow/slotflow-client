import { toast } from "react-toastify";
import { appConfig } from "@/utils/env";
import { useQueryClient } from "@tanstack/react-query";
import { createPlan, changePlanBlockStatus } from "@/utils/apis/plan";
import { CreatePlanRequest, ChangePlanBlockStatusRequest } from "@/utils/interface/api/plan";

interface useAdminPlanReturnInterface {
  handleAdminPlanCreating: (formData: CreatePlanRequest) => void;
  handleAdminChangePlanStatus: (data: ChangePlanBlockStatusRequest) => void;
}

export const useAdminPlan = (): useAdminPlanReturnInterface => {

  const queryClient = useQueryClient();

  const handleAdminPlanCreating = async (formData: CreatePlanRequest) => {
    await createPlan(formData)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["plans"] });
        }
      })
      .catch((error) => {
        if (appConfig.dev) console.log("An error occured while saving plan : ", error);
      });
  };

  const handleAdminChangePlanStatus = ({ planId, isBlocked }: ChangePlanBlockStatusRequest) => {
    changePlanBlockStatus({ planId, isBlocked })
      .then((res) => {
        if (res.success) {
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