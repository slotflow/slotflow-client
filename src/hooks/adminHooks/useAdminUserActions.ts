import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { adminChangeUserBlockStatus } from "../../apis/adminUser.api";
import { User } from "@/utils/interface/entityInterface/userInterface";
import { AdminChangeUserStatusRequest } from "@/utils/interface/api/adminUserApiInterface";

interface useAdminUserActionsCustomHookReturnType {
  handleAdminChangeUserBlockStatus: (data: AdminChangeUserStatusRequest) => void;
  handleGetUserDetailPage: (e: React.MouseEvent<HTMLDivElement>, userId: User["_id"]) => void;
}

export const useAdminUserActions = (): useAdminUserActionsCustomHookReturnType => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleAdminChangeUserBlockStatus = ({ userId, isBlocked }: AdminChangeUserStatusRequest) => {
    adminChangeUserBlockStatus({ userId, isBlocked })
      .then((res) => {
        if(res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["users"] });
        }
      })
      .catch(() => {
        toast.error("Please try again.");
      })
  }

    const handleGetUserDetailPage = (e: React.MouseEvent<HTMLDivElement>, userId: User["_id"]) => {
      e.preventDefault();
      navigate(`/admin/users/${userId}`)
    }

  return { handleAdminChangeUserBlockStatus, handleGetUserDetailPage };
};