import { useDispatch } from "react-redux";
import { appConfig } from "@/shared/config/env";
import { AppDispatch } from "@/shared/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { setProviderRejectModal } from "@/shared/redux/slices/adminSlice";
import { Provider } from "@/shared/interface/entityInterface/providerInterface";
import { adminApproveProvider, adminChangeProviderBlockStatus, adminChangeProviderTrustTag } from "@/shared/apis/provider";
import { AdminChangeProviderBlockStatusRequest, AdminChangeProviderTrustTagRequest, AdminRejectProviderModalState } from "@/shared/interface/api/provider";

interface UseAdminProviderReturn {
  approveProviderHandler: (providerId: Provider["_id"]) => Promise<ApiBaseResponse>;
  changeProviderBlockStatusHandler: (data: AdminChangeProviderBlockStatusRequest) => Promise<ApiBaseResponse>;
  changeProviderSlotflowTrustTag: (data: AdminChangeProviderTrustTagRequest) => Promise<ApiBaseResponse>;
  handleProviderRejectModal: (data: AdminRejectProviderModalState) => void;
}

export const useAdminProvider = (): UseAdminProviderReturn => {

  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const approveProviderHandler = async (providerId: Provider["_id"]) => {
    try {
      const res = await adminApproveProvider(providerId);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["providers"] });
      }
      return res;
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log("Error in approveProviderHandler", error);
      }
      return { success: false, message: "Please try again" };
    }
  };

  const changeProviderBlockStatusHandler = async (data: AdminChangeProviderBlockStatusRequest) => {
    try {
      const res = await adminChangeProviderBlockStatus(data)
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["providers"] });
      }
      return res;
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log("Error in changeProviderBlockStatusHandler", error);
      }
      return { success: false, message: "Please try again" };
    }
  }

  const changeProviderSlotflowTrustTag = async (data: AdminChangeProviderTrustTagRequest) => {
    try {
      const res = await adminChangeProviderTrustTag(data);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["providers"] });
      }
      return res;
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log("Error in hanldeAdminChangeProviderSlotflowTrustTag", error);
      }
      return { success: false, message: "Please try again" };
    }
  }

  const handleProviderRejectModal = (data: AdminRejectProviderModalState) => {
    dispatch(setProviderRejectModal(data))
  };

  return {
    approveProviderHandler,
    changeProviderBlockStatusHandler,
    changeProviderSlotflowTrustTag,
    handleProviderRejectModal,
  };
};