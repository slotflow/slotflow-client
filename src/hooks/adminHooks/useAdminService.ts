import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { createService, changeServiceBlockStatus } from "@/shared/apis/service";
import { CreateServiceRequest, ChangeServiceBlockStatusRequest } from "@/shared/interface/api/service";

interface UseAdminServiceReturnInterface {
  handleAdminServiceCreating: (data: CreateServiceRequest) => void;
  handleAdminChangeServiceStatus: (data: ChangeServiceBlockStatusRequest) => void;
}

export const useAdminService = (): UseAdminServiceReturnInterface => {

  const queryClient = useQueryClient();

  const handleAdminServiceCreating = ({ serviceName, serviceCategory }: CreateServiceRequest) => {
    createService({ serviceName, serviceCategory })
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["appServices"] });
        }
      })
      .catch(() => { });
  };

  const handleAdminChangeServiceStatus = ({ serviceId, isBlocked }: ChangeServiceBlockStatusRequest) => {
    changeServiceBlockStatus({ serviceId, isBlocked })
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["appServices"] });
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }


  return { handleAdminServiceCreating, handleAdminChangeServiceStatus };
}
