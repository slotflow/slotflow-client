import CommonTable from '@/components/table/CommonTable';
import { fetchSubscriptions } from '@/shared/apis/subscription';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import { FetchProviderSubscriptionsResponse } from '@/shared/interface/api/subscription';
import ProvidersSubscriptionsTableColumns from '@/components/table/tableColumns/ProviderSubscriptionsTableColumn';

const AdminSubscriptionsPage = () => {

    const {
        handleAdminGetProviderDetailPage
    } = useRoleBasedNavigation();

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