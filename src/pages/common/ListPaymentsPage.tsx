import { fetchPayments } from "@/utils/apis/payment";
import CommonTable from "@/components/common/CommonTable";
import { FetchPaymentsResponse } from "@/utils/interface/api/payment";
import { useRoleBasedNavigation } from "@/hooks/commonHooks/useRoleBasedNavigation";
import { PaymentsTableColumn } from "@/components/table/tableColumns/PaymentsTableColumn";

const ListPaymentsPage = () => {

  const { handleGetPaymentDetailsPage } = useRoleBasedNavigation();
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

export default ListPaymentsPage;