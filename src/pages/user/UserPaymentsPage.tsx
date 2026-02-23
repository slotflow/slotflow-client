import CommonTable from "@/components/common/CommonTable";
import { userFetchPayments } from "@/utils/apis/user.api";
import { FetchPaymentsResponse } from "@/utils/interface/api/commonApiInterface";
import { PaymentsTableColumn } from "@/components/table/tableColumns/PaymentsTableColumn";
import { useCommonHook } from "@/hooks/commonHooks/useCommonActions";

const UserPaymentsPage = () => {

  const { handleGetPaymentDetailsPage } = useCommonHook();
  const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

  return (
    <CommonTable<FetchPaymentsResponse>
      fetchApiFunction={userFetchPayments}
      queryKey='payments'
      column={column}
      columnsCount={7}
    />
  )
}

export default UserPaymentsPage