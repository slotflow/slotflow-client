import { memo } from 'react';
import PaginatedDataTable from '../table/PaginatedDataTable';
import { fetchSubscriptions } from '@/services/apis/subscription';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import { AdminFetchProviderSubscriptionsProps } from '@/shared/types/component';
import ProvidersSubscriptionsTableColumns from '../table/tableColumns/ProviderSubscriptionsTableColumn';
import {
  FetchProviderSubscriptionsResponse,
  FetchSubscriptionsQueryParams,
} from '@/shared/types/api/subscription';

const AdminProviderSubscriptions = memo(({ providerId }: AdminFetchProviderSubscriptionsProps) => {
  const { handleAdminGetProviderDetailPage } = useRoleBasedNavigation();

  const column = ProvidersSubscriptionsTableColumns(handleAdminGetProviderDetailPage);

  return (
    <PaginatedDataTable<FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams>
      fetchApiFunction={fetchSubscriptions}
      queryKey="providerSubscription"
      column={column}
      columnsCount={7}
      queryParams={{ providerId }}
      parentDivCalssName="p-0"
    />
  );
});

export default AdminProviderSubscriptions;
