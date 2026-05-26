import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import CommonTable from '@/components/table/CommonTable';
import { fetchSubscriptions } from '@/shared/apis/subscription';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import { FetchProviderSubscriptionsResponse } from '@/shared/interface/api/subscription';
import ProvidersSubscriptionsTableColumns from '@/components/table/tableColumns/ProviderSubscriptionsTableColumn';

const AdminSubscriptionsPage: React.FC = () => {

    const {
        handleAdminGetProviderDetailPage
    } = useRoleBasedNavigation();

    const column = ProvidersSubscriptionsTableColumns(
        handleAdminGetProviderDetailPage
    );

    return (
        <div className="p-4">
            <PageHeader
                title="Subscriptions"
                description="Subscriptions subscribed by service providers"
            />
            <CommonTable<FetchProviderSubscriptionsResponse>
                fetchApiFunction={fetchSubscriptions}
                queryKey="subscriptions"
                column={column}
                columnsCount={6}
            />
        </div>
    )
}

export default AdminSubscriptionsPage