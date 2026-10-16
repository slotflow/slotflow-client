import { useEffect, useRef, useState } from 'react';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import { fetchServices } from '@/services/apis/service';
import { useAdminService } from '@/hooks/adminHooks/useService';
import { slideIn } from '@/shared/utils/helper/gsapAnimationSlide';
import { FetchServicesResponse } from '@/shared/types/api/service';
import EditServiceForm from '@/components/form/Admin/EditServiceForm';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import CreateServiceForm from '@/components/form/Admin/CreateServiceForm';
import AdminAppServicesTableColumns from '@/components/table/tableColumns/AdminAppServicesTableColumn';

const AdminListServices = () => {
  const editFormRef = useRef<HTMLDivElement>(null);
  const createFormRef = useRef<HTMLDivElement>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedServiceToEdit, setSelectedServiceToEdit] = useState<FetchServicesResponse | null>(
    null,
  );

  const { changeServiceBlockStatus, changeBlockStatusServiceId } = useAdminService();

  const handleOpenServiceEditForm = (service: FetchServicesResponse) => {
    setSelectedServiceToEdit(service);
    setShowEditForm(true);
  };

  const column = AdminAppServicesTableColumns(
    changeServiceBlockStatus,
    handleOpenServiceEditForm,
    changeBlockStatusServiceId,
  );

  useEffect(() => {
    if (showCreateForm && createFormRef.current) {
      slideIn(createFormRef.current);
    }
    if (showEditForm && editFormRef.current) {
      slideIn(editFormRef.current);
    }
  }, [showCreateForm, showEditForm]);

  return (
    <>
      <PaginatedDataTable<FetchServicesResponse>
        fetchApiFunction={fetchServices}
        queryKey={[queryKeys.APP_SERVICES]}
        column={column}
        columnsCount={5}
        actionButtons={[
          {
            actionLabel: 'Create New Service',
            onActionClick: () => setShowCreateForm(true),
          },
        ]}
      />

      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <CreateServiceForm onClose={() => setShowCreateForm(false)} formRef={createFormRef} />
        </div>
      )}
      {showEditForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <EditServiceForm
            onClose={() => setShowEditForm(false)}
            formRef={editFormRef}
            serviceToEdit={selectedServiceToEdit}
          />
        </div>
      )}
    </>
  );
};

export default AdminListServices;
