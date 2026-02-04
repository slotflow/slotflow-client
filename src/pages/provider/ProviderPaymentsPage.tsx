import CommonTable from '@/components/common/CommonTable';
import { providerFetchPayments } from '@/utils/apis/provider.api';
import { FetchPaymentsResponse } from '@/utils/interface/api/commonApiInterface';
import { PaymentsTableColumn } from '@/components/table/tableColumns/PaymentsTableColumn';

const ProviderPaymentsPage = () => {

  const column = PaymentsTableColumn();

  return (
    <CommonTable<FetchPaymentsResponse>
      fetchApiFunction={providerFetchPayments}
      queryKey='payments'
      column={column}
      columnsCount={7}
    />
  )
}

export default ProviderPaymentsPage