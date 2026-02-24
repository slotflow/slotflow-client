import CommonTable from "../common/CommonTable";
import { useCommonHook } from "@/hooks/commonHooks/useCommonActions";
import { PaymentsTableColumn } from "../table/tableColumns/PaymentsTableColumn";
import { FetchPaymentsQueryParams, FetchPaymentsResponse } from "@/utils/interface/api/commonApiInterface";
import { AdminFetchProviderPaymentsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";

const AdminUserOrProviderPayments: React.FC<AdminFetchProviderPaymentsComponentProps> = ({
    providerId,
    fetchFunction
}) => {

    const { handleGetPaymentDetailsPage } = useCommonHook();
    const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

    return (
        <CommonTable<FetchPaymentsResponse, FetchPaymentsQueryParams>
            fetchApiFunction={(queryParams) => fetchFunction({providerId, ...queryParams})}
            queryKey={`payments-${providerId}`}
            column={column}
            columnsCount={7}
            queryParams={{providerId}}
            parentDivCalssName="p-0"
        />
    )
}

export default AdminUserOrProviderPayments;