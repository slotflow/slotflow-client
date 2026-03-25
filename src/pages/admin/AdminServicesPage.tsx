import { useEffect, useRef, useState } from "react";
import TableHeader from "@/components/table/TableHeader";
import CommonTable from "@/components/common/CommonTable";
import { slideIn } from "@/utils/helper/gsapAnimationSlide";
import { fetchServices } from "@/utils/apis/service.api";
import CreateServiceForm from "@/components/form/AdminForms/CreateServiceForm";
import { useAdminService } from "@/hooks/adminHooks/useAdminService";
import { FetchServicesResponse } from "@/utils/interface/api/service";
import { AdminAppServicesTableColumns } from "@/components/table/tableColumns/AdminAppServicesTableColumn";

const AdminServicesPage = () => {
  const { handleAdminChangeServiceStatus } = useAdminService();
  const column = AdminAppServicesTableColumns(handleAdminChangeServiceStatus);

  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && formRef.current) {
      slideIn(formRef.current);
    }
  }, [showForm]);

  return (
    <div className="relative">
      <TableHeader
        title="Services"
        actionLabel="Create New Service"
        onActionClick={() => setShowForm(true)}
      />

      <CommonTable<FetchServicesResponse>
        fetchApiFunction={fetchServices}
        queryKey="appServices"
        column={column}
        columnsCount={5}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <CreateServiceForm
            onClose={() => setShowForm(false)}
            formRef={formRef}
          />
        </div>
      )}
    </div>
  );
};

export default AdminServicesPage;
