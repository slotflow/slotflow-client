import { useEffect, useRef, useState } from 'react';
import TableHeader from '@/components/table/TableHeader';
import CommonTable from '@/components/common/CommonTable';
import { slideIn } from '@/utils/helper/gsapAnimationSlide';
import { adminFetchAllPlans } from '@/utils/apis/plan.api';
import CreatePlanForm from '@/components/form/AdminForms/CreatePlanForm';
import { useAdminPlan } from '@/hooks/adminHooks/useAdminPlan';
import { AdminFetchAllPlansResponse } from '@/utils/interface/api/plan';
import { AdminPlansTableColumns } from '@/components/table/tableColumns/AdminPlansTableColumn';

const AdminPlansPage = () => {

    const { handleAdminChangePlanStatus } = useAdminPlan();

    const column = AdminPlansTableColumns(handleAdminChangePlanStatus);

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
                title="Plans"
                actionLabel="Create New Plan"
                onActionClick={() => setShowForm(true)}
            />
            <CommonTable<AdminFetchAllPlansResponse>
                fetchApiFunction={adminFetchAllPlans}
                queryKey='plans'
                column={column}
                columnsCount={4}
            />
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-scroll">
                    <CreatePlanForm
                        onClose={() => setShowForm(false)}
                        formRef={formRef}
                    />
                </div>
            )}
        </div>
    )
}

export default AdminPlansPage