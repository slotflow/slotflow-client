import { FetchServicesResponse, ChangeServiceBlockStatusRequest } from '@/shared/types/api/service';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { fetchServices } from '@/services/apis/service';
import { useAdminService } from '@/hooks/adminHooks/useService';
import { slideIn } from '@/shared/utils/helper/gsapAnimationSlide';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import CreateServiceForm from '@/components/form/AdminForms/CreateServiceForm';
import AdminAppServicesTableColumns from '@/components/table/tableColumns/AdminAppServicesTableColumn';

const AdminServicesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const { changeServiceStatus } = useAdminService();

  const handleAdminChangeServiceStatus = async (data: ChangeServiceBlockStatusRequest) => {
    const res = await changeServiceStatus(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const column = AdminAppServicesTableColumns(handleAdminChangeServiceStatus);

  useEffect(() => {
    if (showForm && formRef.current) {
      slideIn(formRef.current);
    }
  }, [showForm]);

  return (
    <div className="p-4">
      <PaginatedDataTable<FetchServicesResponse>
        fetchApiFunction={fetchServices}
        queryKey="appServices"
        column={column}
        columnsCount={5}
        actionButtons={[
          {
            actionLabel: 'Create New Service',
            onActionClick: () => setShowForm(true),
          },
        ]}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <CreateServiceForm onClose={() => setShowForm(false)} formRef={formRef} />
        </div>
      )}
    </div>
  );
};

export default AdminServicesPage;
