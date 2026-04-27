import CommonTable from "../table/CommonTable";
import { useRoleBasedNavigation } from "@/hooks/useRoleBasedNavigation";
import { PaymentsTableColumn } from "../table/tableColumns/PaymentsTableColumn";
import { AdminUserOrProviderPaymentsProps } from "@/shared/interface/componentInterface";
import { FetchPaymentsQueryParams, FetchPaymentsResponse } from "@/shared/interface/api/payment";

const AdminUserOrProviderPayments: React.FC<AdminUserOrProviderPaymentsProps> = ({
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