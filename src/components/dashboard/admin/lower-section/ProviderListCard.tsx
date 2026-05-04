import React from 'react';
import { Briefcase } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import DashboardDataCard from '../../DashboardDataCard';
import { fetchServiceProvidersForAdmin } from '@/shared/apis/providerProfile';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProviderListCard: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-latest-providers'],
    queryFn: () => fetchServiceProvidersForAdmin({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' }),
  });

  const providers = data?.items || [];

  return (
    <DashboardDataCard
      title="Latest Providers"
      icon={Briefcase}
      isLoading={isLoading}
      isError={isError}
      onReload={refetch}
      empty={providers.length === 0}
      emptyMessage="No providers found"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
            <TableRow>
              <TableHead className="w-[60px] text-[10px] uppercase font-bold tracking-wider py-3 px-4">#</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">Provider</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider, index) => (
              <TableRow key={provider._id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/30 border-slate-100 dark:border-slate-800 transition-colors">
                <TableCell className="text-xs font-medium text-slate-400 py-3 px-4">{index + 1}</TableCell>
                <TableCell className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <Briefcase size={14} className="text-slate-600 dark:text-slate-400" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
                      {provider.username}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-slate-500 dark:text-slate-400 py-3 px-4 truncate max-w-[150px]">
                  {provider.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardDataCard>
  );
};

export default ProviderListCard;
