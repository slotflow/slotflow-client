import CommonTable from '@/components/common/CommonTable';
import { useCommonHook } from '@/hooks/commonHooks/useCommonActions';
import { FetchPaymentsResponse } from '@/utils/interface/api/commonApiInterface';
import { PaymentsTableColumn } from '@/components/table/tableColumns/PaymentsTableColumn';
import { fetchPayments } from '@/utils/apis/payment.api';

const ProviderPaymentsPage = () => {

   const { handleGetPaymentDetailsPage } = useCommonHook();
   const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

  return (
    <CommonTable<FetchPaymentsResponse>
      fetchApiFunction={fetchPayments}
      queryKey='payments'
      column={column}
      columnsCount={7}
    />
  )
}

export default ProviderPaymentsPage