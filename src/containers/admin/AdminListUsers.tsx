import { fetchUsers } from '@/services/apis/user';
import { queryKeys } from '@/shared/utils/constants';
import { useAdminUser } from '@/hooks/adminHooks/useUser';
import { AdminfetchAllUsersResponse } from '@/shared/types/api/user';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import AdminUsersTableColumns from '@/components/table/tableColumns/AdminUsersTableColumn';

const AdminListUsers = () => {
  const { changeUserBlockStatus, changeBlockStatusUserId } = useAdminUser();
  const { handleGetUserDetailPage } = useAppNavigation();

  const column = AdminUsersTableColumns(
    changeUserBlockStatus,
    changeBlockStatusUserId,
    handleGetUserDetailPage,
  );

  return (
    <PaginatedDataTable<AdminfetchAllUsersResponse>
      fetchApiFunction={fetchUsers}
      queryKey={[queryKeys.USERS]}
      column={column}
      columnsCount={6}
    />
  );
};

export default AdminListUsers;
