import { fetchPayments } from '@/services/apis/payment';
import { FetchPaymentsResponse } from '@/shared/types/api/payment';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import PaymentsTableColumn from '@/components/table/tableColumns/PaymentsTableColumn';
import { queryKeys } from '@/shared/utils/constants';

const ListPayments = () => {
  const { handleGetPaymentDetailsPage } = useAppNavigation();
  const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

  return (
    <PaginatedDataTable<FetchPaymentsResponse>
      fetchApiFunction={fetchPayments}
      queryKey={[queryKeys.PAYMENTS]}
      column={column}
      columnsCount={7}
    />
  );
};

export default ListPayments;
