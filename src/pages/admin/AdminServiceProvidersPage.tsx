import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "@/components/common/CommonTable";
import { slideIn } from "@/utils/helper/gsapAnimationSlide";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { setProviderRejectModal } from "@/utils/redux/slices/adminSlice";
import RejectproviderForm from "@/components/form/AdminForms/RejectproviderForm";
import { useAdminProvider } from "@/hooks/adminHooks/useAdminProvider";
import { AdminProvidersTableColumns } from "@/components/table/tableColumns/AdminProvidersTableColumn";
import { fetchServiceProvidersForAdmin } from "@/utils/apis/provider";
import { AdminFetchAllProvidersResponse } from "@/utils/interface/api/provider";

const AdminServiceProvidersPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { isProviderRejectModalOpen } = useSelector((state: RootState) => state.admin);

  const {
    handleAdminApproveProvider,
    handleOpenProviderRejectModal,
    hanldeAdminChangeProviderBlockStatus,
    handleGetProviderDetailPage,
    hanldeAdminChangeProviderSlotflowTrustTag
  } = useAdminProvider();

  const columns = AdminProvidersTableColumns(
    handleAdminApproveProvider,
    handleOpenProviderRejectModal,
    hanldeAdminChangeProviderBlockStatus,
    handleGetProviderDetailPage,
    hanldeAdminChangeProviderSlotflowTrustTag
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
            onClose={() => dispatch(setProviderRejectModal({ modalState: false, providerId: null }))}
            formRef={formRef}
          />
        </div>
      )}
    </>
  );

};

export default AdminServiceProvidersPage;
