import { toast } from "react-toastify";
import { fetchServices } from "@/shared/apis/service";
import PageHeader from "@/components/common/PageHeader";
import CommonTable from "@/components/table/CommonTable";
import React, { useEffect, useRef, useState } from "react";
import { slideIn } from "@/shared/helper/gsapAnimationSlide";
import { useAdminService } from "@/hooks/adminHooks/useService";
import CreateServiceForm from "@/components/form/AdminForms/CreateServiceForm";
import AdminAppServicesTableColumns from "@/components/table/tableColumns/AdminAppServicesTableColumn";
import { ChangeServiceBlockStatusRequest, FetchServicesResponse } from "@/shared/interface/api/service";

const AdminServicesPage: React.FC = () => {

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
  }

  const column = AdminAppServicesTableColumns(
    handleAdminChangeServiceStatus
  );

  useEffect(() => {
    if (showForm && formRef.current) {
      slideIn(formRef.current);
    }
  }, [showForm]);

  return (
    <div className="p-4">
      <PageHeader
        title="Services"
        description="Application services list"
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
