import { fetchPayments } from '@/services/apis/payment';
import { FetchPaymentsResponse } from '@/shared/types/api/payment';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import PaymentsTableColumn from '@/components/table/tableColumns/PaymentsTableColumn';
import { queryKeys } from '@/shared/utils/constants';

const ListPaymentsPage = () => {
  const { handleGetPaymentDetailsPage } = useRoleBasedNavigation();
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

export default ListPaymentsPage;
