import { User } from '@/shared/types/entity/user';
import { useEffect, useRef, useState } from 'react';
import { QUERY_KEYS } from '@/shared/utils/constants';
import { useAdminProvider } from '@/hooks/adminHooks/useProvider';
import { slideIn } from '@/shared/utils/helper/gsapAnimationSlide';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import RejectproviderForm from '@/components/form/Admin/RejectproviderForm';
import { fetchServiceProvidersForAdmin } from '@/services/apis/providerProfile';
import { AdminFetchAllProvidersResponse } from '@/shared/types/api/providerProfile';
import AdminProvidersTableColumns from '@/components/table/tableColumns/AdminProvidersTableColumn';

const AdminServiceProvidersPage = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [rejectProvider, setRejectProvider] = useState<{ providerId: User['_id'] } | null>(null);

  const {
    approveProvider,
    approvingProviderId,
    changeProviderSlotflowTrustTag,
    changeProviderBlockStatus,
    changeBlockStatusProviderId,
    changeTrustTagProviderId,
  } = useAdminProvider();

  const { handleGetProviderDetailPage } = useRoleBasedNavigation();

  const handleProviderRejectClose = () => {
    setRejectProvider(null);
  };

  const handleProviderRejectOpen = (data: { providerId: User['_id'] }) => {
    setRejectProvider(data);
  };

  const columns = AdminProvidersTableColumns(
    approveProvider,
    approvingProviderId,
    changeProviderBlockStatus,
    changeBlockStatusProviderId,
    changeProviderSlotflowTrustTag,
    changeTrustTagProviderId,
    handleGetProviderDetailPage,
    handleProviderRejectOpen,
  );

  useEffect(() => {
    if (rejectProvider && formRef.current) {
      slideIn(formRef.current);
    }
  }, [rejectProvider]);

  return (
    <div className="p-4">
      <PaginatedDataTable<AdminFetchAllProvidersResponse>
        fetchApiFunction={fetchServiceProvidersForAdmin}
        queryKey={[QUERY_KEYS.PROVIDERS]}
        column={columns}
        columnsCount={6}
      />
      {rejectProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <RejectproviderForm
            onClose={handleProviderRejectClose}
            formRef={formRef}
            rejectProviderData={rejectProvider}
          />
        </div>
      )}
    </div>
  );
};

export default AdminServiceProvidersPage;
