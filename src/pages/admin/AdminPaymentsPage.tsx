import { fetchPayments } from '@/utils/apis/payment.api';
import CommonTable from '@/components/common/CommonTable';
import { useCommonHook } from '@/hooks/commonHooks/useCommonActions';
import { PaymentsTableColumn } from '@/components/table/tableColumns/PaymentsTableColumn';
import { FetchPaymentsResponse } from '@/utils/interface/api/paymentApiInterface';


const AdminPaymentsPage = () => {

    const { handleGetPaymentDetailsPage } = useCommonHook();
    const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

    return (
        <CommonTable<FetchPaymentsResponse>
            fetchApiFunction={fetchPayments}
            queryKey='payments'
            column={column}
            columnsCount={6}
        />
    )
}

export default AdminPaymentsPage
