import CommonTable from "@/components/common/CommonTable";
import { adminFetchAllUsers } from "@/utils/apis/adminUser.api";
import { useAdminUserActions } from "@/hooks/adminHooks/useAdminUserActions";
import { AdminfetchAllUsersResponse } from "@/utils/interface/api/adminUserApiInterface";
import { AdminUsersTableColumns } from "@/components/table/tableColumns/AdminUsersTableColumn";

const AdminUsersPage = () => {

  const {
    handleAdminChangeUserBlockStatus,
    handleGetUserDetailPage
  } = useAdminUserActions();
  
  const column = AdminUsersTableColumns(
    handleAdminChangeUserBlockStatus,
    handleGetUserDetailPage
  );

  return (
    <CommonTable<AdminfetchAllUsersResponse>
      fetchApiFunction={adminFetchAllUsers}
      queryKey="users"
      column={column}
      columnsCount={6}
    />
  );
};

export default AdminUsersPage
