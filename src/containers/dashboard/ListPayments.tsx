import { queryKeys } from '@/shared/utils/constants/appConstants';
import { fetchPayments } from '@/services/apis/payment';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { FetchPaymentsResponse } from '@/shared/types/api/payment';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import PaymentsTableColumn from '@/components/table/tableColumns/PaymentsTableColumn';

const ListPayments = () => {
  const { toPaymentDetailsPage } = useAppNavigation();
  const column = PaymentsTableColumn(toPaymentDetailsPage);

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
