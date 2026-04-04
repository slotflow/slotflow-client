import CommonTable from '../common/CommonTable';
import { fetchSubscriptions } from '@/shared/apis/subscription';
import { useRoleBasedNavigation } from '@/hooks/commonHooks/useRoleBasedNavigation';
import { ProvidersSubscriptionsTableColumns } from '../table/tableColumns/ProviderSubscriptionsTableColumn';
import { FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams } from '@/shared/interface/api/subscription';

const ProviderSubscriptionHistory = () => {

    const {
        handleAdminGetProviderDetailPage
    } = useRoleBasedNavigation();

    const column = ProvidersSubscriptionsTableColumns(
        handleAdminGetProviderDetailPage
    );

    return (
        <CommonTable<FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams>
            fetchApiFunction={fetchSubscriptions}
            queryKey='subscriptions'
            column={column}
            columnsCount={5}
        />
    );
}

export default ProviderSubscriptionHistory