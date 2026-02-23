import { useCommonHook } from "@/hooks/commonHooks/useCommonActions";
import CommonTable from "../common/CommonTable";
import { PaymentsTableColumn } from "../table/tableColumns/PaymentsTableColumn";
import { FetchPaymentsResponse } from "@/utils/interface/api/commonApiInterface";
import { AdminFetchProviderPaymentsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";

const AdminUserOrProviderPayments: React.FC<AdminFetchProviderPaymentsComponentProps> = ({
    id,
    role,
    fethFunction
}) => {

    const { handleGetPaymentDetailsPage } = useCommonHook();
    const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

    return (
        <CommonTable<FetchPaymentsResponse>
            fetchApiFunction={() => fethFunction({ id, role })}
            queryKey={`payments-${id}`}
            column={column}
            columnsCount={7}
            id={id}
            parentDivCalssName="p-0"
        />
    )
}

export default AdminUserOrProviderPayments;