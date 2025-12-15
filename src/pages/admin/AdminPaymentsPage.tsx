import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { FetchPaymentsResponse } from '@/utils/interface/api/commonApiInterface';
import { PaymentsTableColumn } from '@/components/table/tableColumns/PaymentsTableColumn';


const AdminPaymentsPage = () => {

    const column = PaymentsTableColumn();

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
