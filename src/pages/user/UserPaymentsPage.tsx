import CommonTable from "@/components/common/CommonTable";
import { userFetchPayments } from "@/utils/apis/user.api";
import { FetchPaymentsResponse } from "@/utils/interface/api/commonApiInterface";
import { PaymentsTableColumn } from "@/components/table/tableColumns/PaymentsTableColumn";

const UserPaymentsPage = () => {

  const column = PaymentsTableColumn();

  return (
    <CommonTable<FetchPaymentsResponse>
      fetchApiFunction={userFetchPayments}
      queryKey='payments'
      column={column}
      columnsCount={6}
    />
  )
}

export default UserPaymentsPage