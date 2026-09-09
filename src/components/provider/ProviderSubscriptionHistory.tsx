import PaginatedDataTable from '../table/PaginatedDataTable';
import { fetchSubscriptions } from '@/services/apis/subscription';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import ProvidersSubscriptionsTableColumns from '../table/tableColumns/ProviderSubscriptionsTableColumn';
import {
  FetchProviderSubscriptionsResponse,
  FetchSubscriptionsQueryParams,
} from '@/shared/types/api/subscription';
import { queryKeys } from '@/shared/utils/constants';

const ProviderSubscriptionHistory = () => {
  const { handleAdminGetProviderDetailPage } = useRoleBasedNavigation();

  const column = ProvidersSubscriptionsTableColumns(handleAdminGetProviderDetailPage);

  return (
    <PaginatedDataTable<FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams>
      fetchApiFunction={fetchSubscriptions}
      queryKey={[queryKeys.SUBSCRIPTIONS]}
      column={column}
      columnsCount={5}
    />
  );
};

export default ProviderSubscriptionHistory;
