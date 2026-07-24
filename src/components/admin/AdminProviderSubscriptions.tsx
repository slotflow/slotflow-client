import { memo } from "react";
import CommonTable from "../table/CommonTable";
import { fetchSubscriptions } from "@/shared/apis/subscription";
import { useRoleBasedNavigation } from "@/hooks/useRoleBasedNavigation";
import { AdminFetchProviderSubscriptionsProps } from "@/shared/interface/componentInterface";
import ProvidersSubscriptionsTableColumns from "../table/tableColumns/ProviderSubscriptionsTableColumn";
import { FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams } from "@/shared/interface/api/subscription";

const AdminProviderSubscriptions = memo(({
    providerId
}: AdminFetchProviderSubscriptionsProps) => {

    const {
        handleAdminGetProviderDetailPage
    } = useRoleBasedNavigation();

    const column = ProvidersSubscriptionsTableColumns(
        handleAdminGetProviderDetailPage
    );

    return (
        <CommonTable<FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams>
            fetchApiFunction={fetchSubscriptions}
            queryKey="providerSubscription"
            column={column}
            columnsCount={7}
            queryParams={{ providerId }}
            parentDivCalssName="p-0"
        />
    )
})

export default AdminProviderSubscriptions;