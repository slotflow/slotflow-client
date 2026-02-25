import { memo } from "react";
import CommonTable from "../common/CommonTable";
import { fetchSubscriptions } from "@/utils/apis/subscription.api";
import { useCommonHook } from "@/hooks/commonHooks/useCommonActions";
import { ProvidersSubscriptionsTableColumns } from "../table/tableColumns/ProviderSubscriptionsTableColumn";
import { AdminFetchProviderSubscriptionsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";
import { FetchProviderSubscriptionsResponse, FetchSubscriptionsQueryParams } from "@/utils/interface/api/subscriptionApiInterface";

const AdminProviderSubscriptions: React.FC<AdminFetchProviderSubscriptionsComponentProps> = memo(({
    providerId
}) => {

    const {
        handleAdminGetProviderDetailPage
    } = useCommonHook();

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