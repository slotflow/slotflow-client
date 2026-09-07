import { memo } from 'react';
import { QUERY_KEYS } from '@/shared/utils/constants';
import PaginatedDataTable from '../table/PaginatedDataTable';
import { fetchSubscriptions } from '@/services/apis/subscription';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import { AdminFetchProviderSubscriptionsProps } from '@/shared/types/component';
import ProvidersSubscriptionsTableColumns from '../table/tableColumns/ProviderSubscriptionsTableColumn';
import {
  FetchSubscriptionsQueryParams,
  FetchProviderSubscriptionsResponse,
} from '@/shared/types/api/subscription';

const AdminProviderSubscriptions = memo(({ providerId }: AdminFetchProviderSubscriptionsProps) => {
  const { handleAdminGetProviderDetailPage } = useRoleBasedNavigation();

  const column = ProvidersSubscriptionsTableColumns(handleAdminGetProviderDetailPage);

  return (
    <PaginatedDataTable<FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams>
      fetchApiFunction={fetchSubscriptions}
      queryKey={[QUERY_KEYS.PROVIDER_SUBSCRIPTION]}
      column={column}
      columnsCount={7}
      queryParams={{ providerId }}
      parentDivCalssName="p-0"
    />
  );
});

export default AdminProviderSubscriptions;
