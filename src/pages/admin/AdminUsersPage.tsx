import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "@/shared/apis/user";
import CommonTable from "@/components/table/CommonTable";
import { useAdminUser } from "@/hooks/adminHooks/useUser";
import { User } from "@/shared/interface/entityInterface/userInterface";
import { AdminfetchAllUsersResponse } from "@/shared/interface/api/user";
import { AdminChangeUserStatusRequest } from "@/shared/interface/api/user";
import { AdminUsersTableColumns } from "@/components/table/tableColumns/AdminUsersTableColumn";

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
  }

  const handleGetUserDetailPage = (e: React.MouseEvent<HTMLDivElement>, userId: User["_id"]) => {
    e.preventDefault();
    navigate(`/admin/users/${userId}`)
  }

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
