import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { adminAddNewService, adminChangeServiceBlockStatus } from "../../apis/adminService.api";
import { AdminAddNewAppServiceRequest, AdminChangeServiceBlockStatusRequest } from "@/utils/interface/api/adminServiceApiInterface";

interface UseAdminServiceActionReturnType {
  handleAdminServiceAdding: (data: AdminAddNewAppServiceRequest) => void;
  handleAdminChangeServiceStatus: (data: AdminChangeServiceBlockStatusRequest) => void;
}

export const useAdminServiceActions = (): UseAdminServiceActionReturnType => {

  const queryClient = useQueryClient();

  const handleAdminServiceAdding = ({ serviceName }: AdminAddNewAppServiceRequest) => {
    adminAddNewService({ serviceName })
      .then((res) => {
        if(res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["appServices"] });
        }
      })
      .catch(() => {
      });
  };

  const handleAdminChangeServiceStatus = ({ serviceId, isBlocked }: AdminChangeServiceBlockStatusRequest) => {
    adminChangeServiceBlockStatus({ serviceId, isBlocked })
      .then((res) => {
        if(res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["appServices"] });
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }


  return { handleAdminServiceAdding, handleAdminChangeServiceStatus };
}
