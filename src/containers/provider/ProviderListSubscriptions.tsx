import {
  FetchSubscriptionsQueryParams,
  FetchProviderSubscriptionsResponse,
} from '@/shared/types/api/subscription';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { fetchSubscriptions } from '@/services/apis/subscription';
import PaginatedDataTable from '../../components/table/PaginatedDataTable';
import ProvidersSubscriptionsTableColumns from '../../components/table/tableColumns/ProviderSubscriptionsTableColumn';

const ProviderListSubscriptions = () => {
  const { toSubscriptionDetailsPage } = useAppNavigation();

  const column = ProvidersSubscriptionsTableColumns(toSubscriptionDetailsPage);

  return (
    <PaginatedDataTable<FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams>
      fetchApiFunction={fetchSubscriptions}
      queryKey={[queryKeys.SUBSCRIPTIONS]}
      column={column}
      columnsCount={5}
    />
  );
};

export default ProviderListSubscriptions;
