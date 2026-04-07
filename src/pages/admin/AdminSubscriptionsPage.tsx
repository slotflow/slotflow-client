import CommonTable from '@/components/table/CommonTable';
import { fetchSubscriptions } from '@/shared/apis/subscription';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import { ProvidersSubscriptionsTableColumns } from '@/components/table/tableColumns/ProviderSubscriptionsTableColumn';
import { FetchProviderSubscriptionsResponse } from '@/shared/interface/api/subscription';

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