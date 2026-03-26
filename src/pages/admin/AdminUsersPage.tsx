import CommonTable from "@/components/common/CommonTable";
import { useAdminUser } from "@/hooks/adminHooks/useAdminUser";
import { AdminUsersTableColumns } from "@/components/table/tableColumns/AdminUsersTableColumn";
import { fetchUsers } from "@/utils/apis/user";
import { AdminfetchAllUsersResponse } from "@/utils/interface/api/user";

const AdminUsersPage = () => {

  const {
    handleAdminChangeUserBlockStatus,
    handleGetUserDetailPage
  } = useAdminUser();

  const column = AdminUsersTableColumns(
    handleAdminChangeUserBlockStatus,
    handleGetUserDetailPage
  );

  return (
    <CommonTable<AdminfetchAllUsersResponse>
      fetchApiFunction={fetchUsers}
      queryKey="users"
      column={column}
      columnsCount={6}
    />
  );
};

export default AdminUsersPage
