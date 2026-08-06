import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { adminFetchAllPlans } from '@/shared/apis/plan';
import CommonTable from '@/components/table/CommonTable';
import { useAdminPlan } from '@/hooks/adminHooks/usePlan';
import { slideIn } from '@/shared/helper/gsapAnimationSlide';
import CreatePlanForm from '@/components/form/AdminForms/CreatePlanForm';
import AdminPlansTableColumns from '@/components/table/tableColumns/AdminPlansTableColumn';
import { AdminFetchAllPlansResponse, ChangePlanBlockStatusRequest } from '@/shared/interface/api/plan';

const AdminPlansPage = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const { changePlanStatus } = useAdminPlan();

  const handleAdminChangePlanStatus = async (data: ChangePlanBlockStatusRequest) => {
    const res = await changePlanStatus(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const column = AdminPlansTableColumns(handleAdminChangePlanStatus);

  useEffect(() => {
    if (showForm && formRef.current) {
      slideIn(formRef.current);
    }
  }, [showForm]);

  return (
    <div className="p-3">
      <CommonTable<AdminFetchAllPlansResponse>
        fetchApiFunction={adminFetchAllPlans}
        queryKey="plans"
        column={column}
        columnsCount={4}
        actionButtons={[
          {
            actionLabel: 'Create New Plan',
            onActionClick: () => setShowForm(true),
          }
        ]}
      />
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-scroll">
          <CreatePlanForm onClose={() => setShowForm(false)} formRef={formRef} />
        </div>
      )}
    </div>
  );
};

export default AdminPlansPage;
