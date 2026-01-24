import { memo } from "react";
import CommonTable from "../common/CommonTable";
import { useCommonHook } from "@/hooks/commonHooks/useCommonActions";
import { adminFetchProviderSubscriptions } from "@/utils/apis/adminProvider.api";
import { FetchProviderSubscriptionsResponse } from "@/utils/interface/api/commonApiInterface";
import { ProvidersSubscriptionsTableColumns } from "../table/tableColumns/ProviderSubscriptionsTableColumn";
import { AdminFetchProviderSubscriptionsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";

const AdminProviderSubscriptions: React.FC<AdminFetchProviderSubscriptionsComponentProps> = memo(({ providerId }) => {

    const {
        handleAdminGetProviderDetailPage
    } = useCommonHook();

    const column = ProvidersSubscriptionsTableColumns(
        handleAdminGetProviderDetailPage
    );

    return (
        <CommonTable<FetchProviderSubscriptionsResponse>
            fetchApiFunction={() => adminFetchProviderSubscriptions({ id: providerId, pagination: { page: 1, limit: 10 } })}
            queryKey="providerSubscription"
            column={column}
            columnsCount={7}
            id={providerId}
            parentDivCalssName="p-0"
        />
    )
})

export default AdminProviderSubscriptions;