import { queryKeys } from '@/shared/utils/constants';
import PaginatedDataTable from '../table/PaginatedDataTable';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import PaymentsTableColumn from '../table/tableColumns/PaymentsTableColumn';
import { AdminUserOrProviderPaymentsProps } from '@/shared/types/component';
import { FetchPaymentsQueryParams, FetchPaymentsResponse } from '@/shared/types/api/payment';

const AdminUserOrProviderPayments = ({
  providerId,
  fetchFunction,
}: AdminUserOrProviderPaymentsProps) => {
  const { handleGetPaymentDetailsPage } = useRoleBasedNavigation();
  const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

  return (
    <PaginatedDataTable<FetchPaymentsResponse, FetchPaymentsQueryParams>
      fetchApiFunction={(queryParams) => fetchFunction({ providerId, ...queryParams })}
      queryKey={[queryKeys.PAYMENTS, providerId]}
      column={column}
      columnsCount={7}
      queryParams={{ providerId }}
      parentDivCalssName="p-0"
    />
  );
};

export default AdminUserOrProviderPayments;
