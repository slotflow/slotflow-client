import CommonTable from '@/components/common/CommonTable';
import { useRoleBasedNavigation } from '@/hooks/commonHooks/useRoleBasedNavigation';
import { PaymentsTableColumn } from '@/components/table/tableColumns/PaymentsTableColumn';
import { fetchPayments } from '@/utils/apis/payment.api';
import { FetchPaymentsResponse } from '@/utils/interface/api/paymentApiInterface';

const ProviderPaymentsPage = () => {

  const { handleGetPaymentDetailsPage } = useRoleBasedNavigation();
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