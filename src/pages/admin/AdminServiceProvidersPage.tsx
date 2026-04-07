import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/shared/redux/appStore";
import CommonTable from "@/components/table/CommonTable";
import { slideIn } from "@/shared/helper/gsapAnimationSlide";
import { fetchServiceProvidersForAdmin } from "@/shared/apis/provider";
import { useAdminProviderActions } from "@/hooks/adminHooks/useProvider";
import RejectproviderForm from "@/components/form/AdminForms/RejectproviderForm";
import { AdminProvidersTableColumns } from "@/components/table/tableColumns/AdminProvidersTableColumn";
import { AdminChangeProviderBlockStatusRequest, AdminChangeProviderTrustTagRequest, AdminFetchAllProvidersResponse } from "@/shared/interface/api/provider";

const AdminServiceProvidersPage = () => {

  const navigate = useNavigate();
  const { isProviderRejectModalOpen } = useSelector((state: RootState) => state.admin);

  const {
    approveProviderHandler,
    handleProviderRejectModal,
    changeProviderBlockStatusHandler,
    changeProviderSlotflowTrustTag
  } = useAdminProviderActions();

  const handleAdminApproveProvider = async (providerId: string) => {
    const res = await approveProviderHandler(providerId);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  const handleAdminChangeProviderBlockStatus = async (data: AdminChangeProviderBlockStatusRequest) => {
    const res = await changeProviderBlockStatusHandler(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  const handleAdminChangeProviderSlotflowTrustTag = async (data: AdminChangeProviderTrustTagRequest) => {
    const res = await changeProviderSlotflowTrustTag(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  const handleGetProviderDetailPage = (providerId: string) => {
    navigate(`/admin/service-providers/${providerId}`)
  };

  const columns = AdminProvidersTableColumns(
    handleAdminApproveProvider,
    handleProviderRejectModal,
    handleAdminChangeProviderBlockStatus,
    handleGetProviderDetailPage,
    handleAdminChangeProviderSlotflowTrustTag
  )

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isProviderRejectModalOpen && formRef.current) {
      slideIn(formRef.current);
    }
  }, [isProviderRejectModalOpen]);

  return (
    <>
      <CommonTable<AdminFetchAllProvidersResponse>
        fetchApiFunction={fetchServiceProvidersForAdmin}
        queryKey="providers"
        column={columns}
        columnsCount={6}
      />
      {isProviderRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <RejectproviderForm
            onClose={() => {
              handleProviderRejectModal({ modalState: false, providerId: null })
            }}
            formRef={formRef}
          />
        </div>
      )}
    </>
  );

};

export default AdminServiceProvidersPage;
