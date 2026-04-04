import CommonTable from "../common/CommonTable";
import { useRoleBasedNavigation } from "@/hooks/commonHooks/useRoleBasedNavigation";
import { PaymentsTableColumn } from "../table/tableColumns/PaymentsTableColumn";
import { AdminFetchProviderPaymentsComponentProps } from "@/shared/interface/componentInterface/adminComponentInterface";
import { FetchPaymentsQueryParams, FetchPaymentsResponse } from "@/shared/interface/api/payment";

const AdminUserOrProviderPayments: React.FC<AdminFetchProviderPaymentsComponentProps> = ({
    providerId,
    fetchFunction
}) => {

    const { handleGetPaymentDetailsPage } = useRoleBasedNavigation();
    const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

    return (
        <CommonTable<FetchPaymentsResponse, FetchPaymentsQueryParams>
            fetchApiFunction={(queryParams) => fetchFunction({ providerId, ...queryParams })}
            queryKey={`payments-${providerId}`}
            column={column}
            columnsCount={7}
            queryParams={{ providerId }}
            parentDivCalssName="p-0"
        />
    )
}

export default AdminUserOrProviderPayments;