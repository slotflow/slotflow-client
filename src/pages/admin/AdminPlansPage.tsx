import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { adminFetchAllPlans } from '@/shared/apis/plan';
import TableHeader from '@/components/table/TableHeader';
import CommonTable from '@/components/table/CommonTable';
import { slideIn } from '@/shared/helper/gsapAnimationSlide';
import { useAdminPlanActions } from '@/hooks/adminHooks/usePlan';
import CreatePlanForm from '@/components/form/AdminForms/CreatePlanForm';
import { AdminPlansTableColumns } from '@/components/table/tableColumns/AdminPlansTableColumn';
import { AdminFetchAllPlansResponse, ChangePlanBlockStatusRequest } from '@/shared/interface/api/plan';

const AdminPlansPage = () => {

    const [showForm, setShowForm] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    const { changePlanStatus } = useAdminPlanActions();

    const handleAdminChangePlanStatus = async (data: ChangePlanBlockStatusRequest) => {
        const res = await changePlanStatus(data);
        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }

    const column = AdminPlansTableColumns(
        handleAdminChangePlanStatus
    );

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