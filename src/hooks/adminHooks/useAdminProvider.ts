import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/shared/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { AdminVerificationStatus } from "@/shared/interface/enums";
import { setProviderRejectModal } from "@/shared/redux/slices/adminSlice";
import { setAdminVerificationState } from "@/shared/redux/slices/authSlice";
import { Provider } from "@/shared/interface/entityInterface/providerInterface";
import { adminApproveProvider, adminChangeProviderBlockStatus, adminChangeProviderTrustTag, adminRejectProvider } from "@/shared/apis/provider";
import { AdminChangeProviderBlockStatusRequest, AdminChangeProviderTrustTagRequest, AdminRejectProviderRequest } from "@/shared/interface/api/provider";

interface UseAdminProviderReturnInterface {
  handleAdminApproveProvider: (providerId: Provider["_id"]) => void;
  handleOpenProviderRejectModal: (providerId: Provider["_id"]) => void;
  handleAdminRejectProvider: (data: AdminRejectProviderRequest) => void;
  hanldeAdminChangeProviderBlockStatus: (data: AdminChangeProviderBlockStatusRequest) => void;
  handleGetProviderDetailPage: (providerId: Provider["_id"]) => void;
  hanldeAdminChangeProviderSlotflowTrustTag: (data: AdminChangeProviderTrustTagRequest) => void;
}

export const useAdminProvider = (): UseAdminProviderReturnInterface => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleAdminApproveProvider = (providerId: Provider["_id"]) => {
    adminApproveProvider(providerId)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["providers"] });
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  };

  const handleOpenProviderRejectModal = (providerId: Provider["_id"]) => {
    dispatch(setProviderRejectModal({
      modalState: true, providerId
    }))
  };

  const handleAdminRejectProvider = (data: AdminRejectProviderRequest) => {
    adminRejectProvider(data)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          dispatch(setAdminVerificationState(AdminVerificationStatus.REJECTED));
          queryClient.invalidateQueries({ queryKey: ["providers"] });
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  const hanldeAdminChangeProviderBlockStatus = ({ providerId, isBlocked }: AdminChangeProviderBlockStatusRequest) => {
    adminChangeProviderBlockStatus({ providerId, isBlocked })
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["providers"] });
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  const handleGetProviderDetailPage = (providerId: Provider["_id"]) => {
    navigate(`/admin/service-providers/${providerId}`)
  }

  const hanldeAdminChangeProviderSlotflowTrustTag = ({ providerId, trustedBySlotflow }: AdminChangeProviderTrustTagRequest) => {
    adminChangeProviderTrustTag({ providerId, trustedBySlotflow })
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["providers"] });
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  return { handleAdminApproveProvider, handleOpenProviderRejectModal, handleAdminRejectProvider, hanldeAdminChangeProviderBlockStatus, handleGetProviderDetailPage, hanldeAdminChangeProviderSlotflowTrustTag };
};