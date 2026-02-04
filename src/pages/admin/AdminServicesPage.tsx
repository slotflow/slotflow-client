import { useEffect, useRef, useState } from "react";
import TableHeader from "@/components/table/TableHeader";
import CommonTable from "@/components/common/CommonTable";
import { slideIn } from "@/utils/helper/gsapAnimationSlide";
import { adminFetchAllServices } from "@/utils/apis/adminService.api";
import CreateServiceForm from "@/components/form/AdminForms/CreateServiceForm";
import { useAdminServiceActions } from "@/hooks/adminHooks/useAdminServiceActions";
import { AdminFetchAllServicesResponse } from "@/utils/interface/api/adminServiceApiInterface";
import { AdminAppServicesTableColumns } from "@/components/table/tableColumns/AdminAppServicesTableColumn";

const AdminServicesPage = () => {
  const { handleAdminChangeServiceStatus } = useAdminServiceActions();
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

      <CommonTable<AdminFetchAllServicesResponse>
        fetchApiFunction={adminFetchAllServices}
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
