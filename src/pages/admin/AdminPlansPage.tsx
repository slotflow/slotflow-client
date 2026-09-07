import { useEffect, useRef, useState } from 'react';
import { QUERY_KEYS } from '@/shared/utils/constants';
import PlanForm from '@/components/form/Admin/PlanForm';
import { useAdminPlan } from '@/hooks/adminHooks/usePlan';
import { adminFetchAllPlans } from '@/services/apis/plan';
import { slideIn } from '@/shared/utils/helper/gsapAnimationSlide';
import { AdminFetchAllPlansResponse } from '@/shared/types/api/plan';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import AdminPlansTableColumns from '@/components/table/tableColumns/AdminPlansTableColumn';

const AdminPlansPage = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlanIdToEdit, setSelectedPlanIdToEdit] = useState<string | null>(null);

  const { handleNavigateToPlanDetailPage } = useRoleBasedNavigation();
  const { changePlanBlockStatus, resyncPlanWithStripe, changeBlockStatusPlanId, resyncingPlanId } =
    useAdminPlan();

  const handleOpenPlanEditForm = (planId: string) => {
    setSelectedPlanIdToEdit(planId);
    setShowForm(true);
  };

  const handleClosePlanForm = () => {
    setSelectedPlanIdToEdit(null);
    setShowForm(false);
  };

  const column = AdminPlansTableColumns(
    changePlanBlockStatus,
    resyncPlanWithStripe,
    handleNavigateToPlanDetailPage,
    handleOpenPlanEditForm,
    changeBlockStatusPlanId,
    resyncingPlanId,
  );

  useEffect(() => {
    if (showForm && formRef.current) {
      slideIn(formRef.current);
    }
  }, [showForm]);

  return (
    <div className="p-3">
      <PaginatedDataTable<AdminFetchAllPlansResponse>
        fetchApiFunction={adminFetchAllPlans}
        queryKey={[QUERY_KEYS.PLANS]}
        column={column}
        columnsCount={9}
        actionButtons={[
          {
            actionLabel: 'Create New Plan',
            onActionClick: () => setShowForm(true),
          },
        ]}
      />
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-scroll">
          <PlanForm
            onClose={handleClosePlanForm}
            formRef={formRef}
            planIdToEdit={selectedPlanIdToEdit}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPlansPage;
