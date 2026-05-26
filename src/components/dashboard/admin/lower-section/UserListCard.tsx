import React from 'react';
import { fetchUsers } from '@/shared/apis/user';
import { User as UserIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import DashboardDataCard from '../../DashboardDataCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UserListCard: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-latest-users'],
    queryFn: () => fetchUsers({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' }),
  });

  const users = data?.items || [];

  return (
    <DashboardDataCard
      title="Latest Users"
      icon={UserIcon}
      isLoading={isLoading}
      isError={isError}
      onReload={refetch}
      empty={users.length === 0}
      emptyMessage="No users found"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-[10px] uppercase font-bold tracking-wider py-3 px-4">#</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">User</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/30 border-slate-100 dark:border-slate-800 transition-colors">
                <TableCell className="text-xs font-medium text-slate-400 py-3 px-4">{index + 1}</TableCell>
                <TableCell className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <UserIcon size={14} className="text-slate-600 dark:text-slate-400" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
                      {user.username}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-slate-500 dark:text-slate-400 py-3 px-4 truncate max-w-[150px]">
                  {user.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardDataCard>
  );
};

export default UserListCard;
