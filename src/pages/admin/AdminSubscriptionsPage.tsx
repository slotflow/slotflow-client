import { fetchSubscriptions } from '@/services/apis/subscription';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import { FetchProviderSubscriptionsResponse } from '@/shared/types/api/subscription';
import ProvidersSubscriptionsTableColumns from '@/components/table/tableColumns/ProviderSubscriptionsTableColumn';
import { QUERY_KEYS } from '@/shared/utils/constants';

const AdminSubscriptionsPage = () => {
  const { handleAdminGetProviderDetailPage } = useRoleBasedNavigation();

  const column = ProvidersSubscriptionsTableColumns(handleAdminGetProviderDetailPage);

  return (
    <div className="p-4">
      <PaginatedDataTable<FetchProviderSubscriptionsResponse>
        fetchApiFunction={fetchSubscriptions}
        queryKey={[QUERY_KEYS.SUBSCRIPTIONS]}
        column={column}
        columnsCount={6}
      />
    </div>
  );
};

export default AdminSubscriptionsPage;
