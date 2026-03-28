import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, CheckCircle2, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import DashboardDataCard from '../../DashboardDataCard';

const SERVICES = [
  "API Gateway",
  "Main Backend",
  "Payment Service",
  "Notification Service",
  "Socket Service",
];

const fetchHealthData = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return SERVICES.map((name, index) => ({
        id: index + 1,
        name,
        status: Math.random() > 0.1 ? 'LIVE' : 'DOWN',
        uptime: '99.9%'
    }));
};

const ServiceHealthCard: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-services-health'],
    queryFn: fetchHealthData,
    refetchInterval: 30000,
  });

  const services = data || [];

  return (
    <DashboardDataCard
      title="System Health"
      icon={Activity}
      isLoading={isLoading}
      isError={isError}
      onReload={refetch}
      empty={services.length === 0}
      emptyMessage="No service data"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
            <TableRow>
              <TableHead className="w-[60px] text-[10px] uppercase font-bold tracking-wider py-3 px-4">#</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4">Microservice</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4 text-center">Status</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider py-3 px-4 text-right">Uptime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/30 border-slate-100 dark:border-slate-800 transition-colors">
                <TableCell className="text-xs font-medium text-slate-400 py-3 px-4">{service.id}</TableCell>
                <TableCell className="py-3 px-4">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {service.name}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4 text-center">
                  <div className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
                    service.status === 'LIVE' 
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" 
                      : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  )}>
                    {service.status === 'LIVE' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                    {service.status}
                  </div>
                </TableCell>
                <TableCell className="text-[10px] text-slate-400 py-3 px-4 text-right">
                  {service.uptime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardDataCard>
  );
};

export default ServiceHealthCard;
