import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { QUERY_KEYS } from '@/shared/utils/constants';
import PlanForm from '@/components/form/Admin/PlanForm';
import { useAdminPlan } from '@/hooks/adminHooks/usePlan';
import { adminFetchAllPlans } from '@/services/apis/plan';
import { slideIn } from '@/shared/utils/helper/gsapAnimationSlide';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import AdminPlansTableColumns from '@/components/table/tableColumns/AdminPlansTableColumn';
import {
  ResyncPlanStripeRequest,
  AdminFetchAllPlansResponse,
  ChangePlanBlockStatusRequest,
} from '@/shared/types/api/plan';

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

  const handleAdminChangePlanStatus = async (data: ChangePlanBlockStatusRequest) => {
    const res = await changePlanBlockStatus(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleResyncStripe = async (data: ResyncPlanStripeRequest) => {
    const res = await resyncPlanWithStripe(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const column = AdminPlansTableColumns(
    handleAdminChangePlanStatus,
    handleResyncStripe,
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
