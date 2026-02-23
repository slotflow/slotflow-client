import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { FetchPaymentsResponse } from '@/utils/interface/api/commonApiInterface';
import { PaymentsTableColumn } from '@/components/table/tableColumns/PaymentsTableColumn';
import { useCommonHook } from '@/hooks/commonHooks/useCommonActions';


const AdminPaymentsPage = () => {

    const { handleGetPaymentDetailsPage } = useCommonHook();
    const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

    return (
        <CommonTable<FetchPaymentsResponse>
            fetchApiFunction={adminFetchAllPayments}
            queryKey='payments'
            column={column}
            columnsCount={6}
        />
    )
}

export default AdminPaymentsPage
