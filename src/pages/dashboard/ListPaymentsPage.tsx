import { fetchPayments } from '@/services/apis/payment';
import { FetchPaymentsResponse } from '@/shared/types/api/payment';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import PaymentsTableColumn from '@/components/table/tableColumns/PaymentsTableColumn';

const ListPaymentsPage = () => {
  const { handleGetPaymentDetailsPage } = useRoleBasedNavigation();
  const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

  return (
    <div className="p-4">
      <PaginatedDataTable<FetchPaymentsResponse>
        fetchApiFunction={fetchPayments}
        queryKey="payments"
        column={column}
        columnsCount={7}
      />
    </div>
  );
};

export default ListPaymentsPage;
