import { fetchPayments } from "@/shared/apis/payment";
import PageHeader from "@/components/common/PageHeader";
import CommonTable from "@/components/table/CommonTable";
import { FetchPaymentsResponse } from "@/shared/interface/api/payment";
import { useRoleBasedNavigation } from "@/hooks/useRoleBasedNavigation";
import PaymentsTableColumn from "@/components/table/tableColumns/PaymentsTableColumn";

const ListPaymentsPage = () => {

  const { handleGetPaymentDetailsPage } = useRoleBasedNavigation();
  const column = PaymentsTableColumn(handleGetPaymentDetailsPage);

  return (
    <div className="container p-4 space-y-6">
      <PageHeader
        title="Payments Management"
        description="Manage your payments and view history."
      />
      <CommonTable<FetchPaymentsResponse>
        fetchApiFunction={fetchPayments}
        queryKey='payments'
        column={column}
        columnsCount={7}
      />
    </div>
  )
}

export default ListPaymentsPage;