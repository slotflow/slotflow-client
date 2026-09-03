import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import {
  AdminFetchAllProvidersResponse,
  AdminChangeProviderTrustTagRequest,
  AdminChangeProviderBlockStatusRequest,
} from '@/shared/types/api/providerProfile';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/app/store/appStore';
import { useAdminProvider } from '@/hooks/adminHooks/useProvider';
import { slideIn } from '@/shared/utils/helper/gsapAnimationSlide';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { fetchServiceProvidersForAdmin } from '@/services/apis/providerProfile';
import RejectproviderForm from '@/components/form/Admin/RejectproviderForm';
import AdminProvidersTableColumns from '@/components/table/tableColumns/AdminProvidersTableColumn';

const AdminServiceProvidersPage = () => {
  const navigate = useNavigate();
  const { isProviderRejectModalOpen } = useSelector((state: RootState) => state.admin);

  const {
    approveProviderHandler,
    handleProviderRejectModal,
    changeProviderBlockStatusHandler,
    changeProviderSlotflowTrustTag,
  } = useAdminProvider();

  const handleAdminApproveProvider = async (providerId: string) => {
    const res = await approveProviderHandler(providerId);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleAdminChangeProviderBlockStatus = async (
    data: AdminChangeProviderBlockStatusRequest,
  ) => {
    const res = await changeProviderBlockStatusHandler(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleAdminChangeProviderSlotflowTrustTag = async (
    data: AdminChangeProviderTrustTagRequest,
  ) => {
    const res = await changeProviderSlotflowTrustTag(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleGetProviderDetailPage = (providerId: string) => {
    navigate(`/admin/service-providers/${providerId}`);
  };

  const columns = AdminProvidersTableColumns(
    handleAdminApproveProvider,
    handleProviderRejectModal,
    handleAdminChangeProviderBlockStatus,
    handleGetProviderDetailPage,
    handleAdminChangeProviderSlotflowTrustTag,
  );

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isProviderRejectModalOpen && formRef.current) {
      slideIn(formRef.current);
    }
  }, [isProviderRejectModalOpen]);

  return (
    <div className="p-4">
      <PaginatedDataTable<AdminFetchAllProvidersResponse>
        fetchApiFunction={fetchServiceProvidersForAdmin}
        queryKey="providers"
        column={columns}
        columnsCount={6}
      />
      {isProviderRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <RejectproviderForm
            onClose={() => {
              handleProviderRejectModal({ modalState: false, providerId: null });
            }}
            formRef={formRef}
          />
        </div>
      )}
    </div>
  );
};

export default AdminServiceProvidersPage;
