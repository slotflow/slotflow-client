import CommonTable from "@/components/common/CommonTable";
import { FetchPaymentsResponse } from "@/utils/interface/api/commonApiInterface";
import { PaymentsTableColumn } from "@/components/table/tableColumns/PaymentsTableColumn";
import { useCommonHook } from "@/hooks/commonHooks/useCommonActions";
import { fetchPayments } from "@/utils/apis/payment.api";

const UserPaymentsPage = () => {

  const { handleGetPaymentDetailsPage } = useCommonHook();
  const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

  return (
    <CommonTable<FetchPaymentsResponse>
      fetchApiFunction={fetchPayments}
      queryKey='payments'
      column={column}
      columnsCount={7}
    />
  )
}

export default UserPaymentsPage