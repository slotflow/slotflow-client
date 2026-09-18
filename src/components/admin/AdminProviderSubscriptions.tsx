import { memo } from 'react';
import { queryKeys } from '@/shared/utils/constants';
import PaginatedDataTable from '../table/PaginatedDataTable';
import { fetchSubscriptions } from '@/services/apis/subscription';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { AdminFetchProviderSubscriptionsProps } from '@/shared/types/component';
import ProvidersSubscriptionsTableColumns from '../table/tableColumns/ProviderSubscriptionsTableColumn';
import {
  FetchSubscriptionsQueryParams,
  FetchProviderSubscriptionsResponse,
} from '@/shared/types/api/subscription';

const AdminProviderSubscriptions = memo(({ providerId }: AdminFetchProviderSubscriptionsProps) => {
  const { handleAdminGetProviderDetailPage } = useAppNavigation();

  const column = ProvidersSubscriptionsTableColumns(handleAdminGetProviderDetailPage);

  return (
    <PaginatedDataTable<FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams>
      fetchApiFunction={fetchSubscriptions}
      queryKey={[queryKeys.SUBSCRIPTION]}
      column={column}
      columnsCount={7}
      queryParams={{ providerId }}
      parentDivCalssName="p-0"
    />
  );
});

export default AdminProviderSubscriptions;
