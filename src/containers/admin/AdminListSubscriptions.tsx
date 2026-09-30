import { queryKeys } from '@/shared/utils/constants/appConstants';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { fetchSubscriptions } from '@/services/apis/subscription';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { FetchProviderSubscriptionsResponse } from '@/shared/types/api/subscription';
import ProvidersSubscriptionsTableColumns from '@/components/table/tableColumns/ProviderSubscriptionsTableColumn';

const AdminListSubscriptions = () => {

  const { toSubscriptionDetailsPage } = useAppNavigation();

  const column = ProvidersSubscriptionsTableColumns(toSubscriptionDetailsPage);

  return (
    <PaginatedDataTable<FetchProviderSubscriptionsResponse>
      fetchApiFunction={fetchSubscriptions}
      queryKey={[queryKeys.SUBSCRIPTIONS]}
      column={column}
      columnsCount={6}
    />
  );
};

export default AdminListSubscriptions;
