import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { fetchServices } from '@/shared/apis/service';
import CommonTable from '@/components/table/CommonTable';
import { slideIn } from '@/shared/helper/gsapAnimationSlide';
import { useAdminService } from '@/hooks/adminHooks/useService';
import CreateServiceForm from '@/components/form/AdminForms/CreateServiceForm';
import AdminAppServicesTableColumns from '@/components/table/tableColumns/AdminAppServicesTableColumn';
import {
  ChangeServiceBlockStatusRequest,
  FetchServicesResponse,
} from '@/shared/interface/api/service';

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
      <CommonTable<FetchServicesResponse>
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
