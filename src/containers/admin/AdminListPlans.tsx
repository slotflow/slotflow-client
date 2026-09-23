import { useEffect, useRef, useState } from 'react';
import { queryKeys } from '@/shared/utils/constants';
import PlanForm from '@/components/form/Admin/PlanForm';
import { useAdminPlan } from '@/hooks/adminHooks/usePlan';
import { adminFetchAllPlans } from '@/services/apis/plan';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { slideIn } from '@/shared/utils/helper/gsapAnimationSlide';
import { AdminFetchAllPlansResponse } from '@/shared/types/api/plan';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import AdminPlansTableColumns from '@/components/table/tableColumns/AdminPlansTableColumn';

const AdminListPlans = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlanIdToEdit, setSelectedPlanIdToEdit] = useState<string | null>(null);

  const { handleNavigateToPlanDetailPage } = useAppNavigation();
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
    <>
      <PaginatedDataTable<AdminFetchAllPlansResponse>
        fetchApiFunction={adminFetchAllPlans}
        queryKey={[queryKeys.PLANS]}
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
    </>
  );
};

export default AdminListPlans;
