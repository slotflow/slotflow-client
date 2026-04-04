import CommonTable from "@/components/table/CommonTable";
import { useAdminUser } from "@/hooks/adminHooks/useAdminUser";
import { AdminUsersTableColumns } from "@/components/table/tableColumns/AdminUsersTableColumn";
import { fetchUsers } from "@/shared/apis/user";
import { AdminfetchAllUsersResponse } from "@/shared/interface/api/user";

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
