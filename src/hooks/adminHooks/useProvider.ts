import { useDispatch } from "react-redux";
import { appConfig } from "@/shared/config/env";
import { AppDispatch } from "@/shared/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/shared/interface/entityInterface/userInterface";
import { setProviderRejectModal } from "@/shared/redux/slices/adminSlice";
import { UseAdminProviderReturn } from "@/shared/interface/hooksInterface";
import { AdminRejectProviderModalState } from "@/shared/interface/commonInterface";
import { adminApproveProvider, adminChangeProviderBlockStatus, adminChangeProviderTrustTag } from "@/shared/apis/providerProfile";
import { AdminChangeProviderBlockStatusRequest, AdminChangeProviderTrustTagRequest } from "@/shared/interface/api/providerProfile";

export const useAdminProvider = (): UseAdminProviderReturn => {

  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const approveProviderHandler = async (providerId: User["_id"]) => {
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