import CommonTable from '../common/CommonTable';
import { fetchSubscriptions } from '@/utils/apis/subscription.api';
import { useCommonHook } from '@/hooks/commonHooks/useCommonActions';
import { ProvidersSubscriptionsTableColumns } from '../table/tableColumns/ProviderSubscriptionsTableColumn';
import { FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams } from '@/utils/interface/api/subscriptionApiInterface';

const ProviderSubscriptionHistory = () => {

    const {
        handleAdminGetProviderDetailPage
    } = useCommonHook();

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