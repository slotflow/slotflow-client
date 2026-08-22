import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '@/services/apis/user';
import { User } from '@/shared/types/entity/user';
import { useAdminUser } from '@/hooks/adminHooks/useUser';
import { AdminfetchAllUsersResponse } from '@/shared/types/api/user';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { AdminChangeUserStatusRequest } from '@/shared/types/api/user';
import AdminUsersTableColumns from '@/components/table/tableColumns/AdminUsersTableColumn';

const AdminUsersPage = () => {
  const navigate = useNavigate();

  const { changeUserStatus } = useAdminUser();

  const handleAdminChangeUserBlockStatus = async (data: AdminChangeUserStatusRequest) => {
    const res = await changeUserStatus(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleGetUserDetailPage = (e: React.MouseEvent<HTMLDivElement>, userId: User['_id']) => {
    e.preventDefault();
    navigate(`/admin/users/${userId}`);
  };

  const column = AdminUsersTableColumns(handleAdminChangeUserBlockStatus, handleGetUserDetailPage);

  return (
    <div className="p-4">
      <PaginatedDataTable<AdminfetchAllUsersResponse>
        fetchApiFunction={fetchUsers}
        queryKey="users"
        column={column}
        columnsCount={6}
      />
    </div>
  );
};

export default AdminUsersPage;
