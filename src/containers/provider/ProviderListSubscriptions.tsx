import PaginatedDataTable from '../../components/table/PaginatedDataTable';
import { fetchSubscriptions } from '@/services/apis/subscription';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import ProvidersSubscriptionsTableColumns from '../../components/table/tableColumns/ProviderSubscriptionsTableColumn';
import {
  FetchProviderSubscriptionsResponse,
  FetchSubscriptionsQueryParams,
} from '@/shared/types/api/subscription';
import { queryKeys } from '@/shared/utils/constants';

const ProviderListSubscriptions = () => {
  const { handleAdminGetProviderDetailPage } = useAppNavigation();

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

export default ProviderListSubscriptions;
