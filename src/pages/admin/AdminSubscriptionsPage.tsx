import CommonTable from '@/components/common/CommonTable';
import { fetchSubscriptions } from '@/utils/apis/subscription.api';
import { useCommonHook } from '@/hooks/commonHooks/useCommonActions';
import { ProvidersSubscriptionsTableColumns } from '@/components/table/tableColumns/ProviderSubscriptionsTableColumn';
import { FetchProviderSubscriptionsResponse } from '@/utils/interface/api/subscriptionApiInterface';

const AdminSubscriptionsPage = () => {

    const {
        handleAdminGetProviderDetailPage
    } = useCommonHook();

    const column = ProvidersSubscriptionsTableColumns(
        handleAdminGetProviderDetailPage
    );

    return (
        <CommonTable<FetchProviderSubscriptionsResponse>
            fetchApiFunction={fetchSubscriptions}
            queryKey="subscriptions"
            column={column}
            columnsCount={6}
        />
    )
}

export default AdminSubscriptionsPage