import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar';
import { queryKeys } from '@/shared/utils/constants';
import { DataTable } from '@/components/ui/data-table';
import DashboardDataCard from '../common/DashboardDataCard';
import { formatDate } from '@/shared/utils/helper/formatter';
import TableShimmer from '@/components/shimmers/TableShimmer';
import { OnChangeFn, PaginationState } from '@tanstack/react-table';
import { fetchRevenueReportForAdmin } from '@/services/apis/payment';
import { handleExportPDF } from '@/shared/utils/helper/pdfGenerator';
import DataFetchingError from '@/components/error/DataFetchingError';
import { handleExportExcel } from '@/shared/utils/helper/excelGenerator.ts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AdminRevenueTableColumn from '@/components/table/tableColumns/AdminRevenueTableColumn';
import { Calendar as CalendarIcon, FileSpreadsheet, NotebookText, RotateCcw, TrendingUp, Tag, Wallet } from 'lucide-react';

const AdminRevenueReport = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    setPagination(updaterOrValue);
  };

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryFn: () =>
      fetchRevenueReportForAdmin({
        startDate: dateRange?.from ?? new Date(new Date().setDate(new Date().getDate() - 30)),
        endDate: dateRange?.to ?? new Date(),
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      }),
    queryKey: [
      queryKeys.REVENUE,
      dateRange?.from,
      dateRange?.to,
      pagination.pageIndex,
      pagination.pageSize,
    ],
  });

  const column = AdminRevenueTableColumn();

  return (
    <div className="space-y-6 p-6 bg-slate-50/50 dark:bg-background/50 rounded-2xl min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Revenue Analytics
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track, filter, and export overall system financial performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                title="Select Date Range"
                variant="outline"
                className="h-9 px-3.5 text-xs font-medium rounded-xl border-border/60 bg-background hover:bg-muted/50 transition-all shadow-sm gap-2"
              >
                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                {dateRange?.from && dateRange?.to ? (
                  <span className="font-semibold">
                    {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                  </span>
                ) : (
                  <span>Select Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl shadow-xl border-border/60" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <div className="h-4 w-px bg-border/60 hidden sm:block" />

          <Button
            title="Reset"
            variant="outline"
            className="h-9 px-3 text-xs font-medium rounded-xl border-border/60 bg-background hover:bg-muted/50 transition-all shadow-sm gap-1.5"
            onClick={() => refetch()}
          >
            <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
            Reset
          </Button>

          <Button
            title="Generate PDF"
            variant="outline"
            className="h-9 px-3.5 text-xs font-medium rounded-xl border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all shadow-sm gap-2"
            onClick={(e) => handleExportPDF(e, data?.items.rows || [], 'Revenue')}
          >
            <NotebookText className="h-3.5 w-3.5 text-red-500" />
            PDF
          </Button>

          <Button
            title="Generate Excel"
            variant="outline"
            className="h-9 px-3.5 text-xs font-medium rounded-xl border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-all shadow-sm gap-2"
            onClick={(e) => handleExportExcel(e, data?.items.rows || [], 'Revenue')}
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
            Excel
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-border/50 bg-background p-4 shadow-sm">
          <TableShimmer columnsCount={8} />
        </div>
      ) : data ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/50 bg-background shadow-sm overflow-hidden p-1">
            <DataTable
              columns={column}
              data={data.items.rows}
              pageCount={data.totalPages}
              pagination={pagination}
              onPaginationChange={handlePaginationChange}
              isFetching={isFetching}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <DashboardDataCard
              icon={Wallet}
              label="Total Initial Amount"
              isLoading={isLoading}
              price
              value={data.items.grandInitalAmount.toFixed(2)}
            />

            <DashboardDataCard
              icon={Tag}
              label="Grand Discount"
              isLoading={isLoading}
              price
              value={data.items.grandDiscount.toFixed(2)}
            />

            <DashboardDataCard
              icon={TrendingUp}
              label='Grand Total Revenue'
              isLoading={isLoading}
              price
              value={data.items.grandTotal.toFixed(2)}
            />
          </div>
        </div>
      ) : isError && error ? (
        <div className="rounded-2xl border border-border/50 bg-background p-8 shadow-sm">
          <DataFetchingError message={(error as Error).message} className="min-h-full" />
        </div>
      ) : (
        <div className="rounded-2xl border border-border/50 bg-background p-8 shadow-sm">
          <DataFetchingError message={'No revenue found in database'} className="min-h-full" />
        </div>
      )}
    </div>
  );
};

export default AdminRevenueReport;