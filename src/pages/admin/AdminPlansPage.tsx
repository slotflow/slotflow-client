import { toast } from 'react-toastify';
import PageHeader from '@/components/common/PageHeader';
import { adminFetchAllPlans } from '@/shared/apis/plan';
import CommonTable from '@/components/table/CommonTable';
import { useAdminPlan } from '@/hooks/adminHooks/usePlan';
import React, { useEffect, useRef, useState } from 'react';
import { slideIn } from '@/shared/helper/gsapAnimationSlide';
import CreatePlanForm from '@/components/form/AdminForms/CreatePlanForm';
import AdminPlansTableColumns from '@/components/table/tableColumns/AdminPlansTableColumn';
import { AdminFetchAllPlansResponse, ChangePlanBlockStatusRequest } from '@/shared/interface/api/plan';

const AdminPlansPage: React.FC = () => {

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
        <div className="p-4">
            <PageHeader 
                title="Plans"
                description="Plans for services providers"
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