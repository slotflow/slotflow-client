import { format } from 'date-fns';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar';
import { DataTable } from '@/components/table/data-table';
import TableShimmer from '@/components/shimmers/TableShimmer';
import { handleExportPDF } from '@/shared/helper/pdfGenerator';
import { fetchRevenueReportForAdmin } from '@/shared/apis/payment';
import { OnChangeFn, PaginationState } from '@tanstack/react-table';
import DataFetchingError from '@/components/error/DataFetchingError';
import { handleExportExcel } from '@/shared/helper/excelGenerator.ts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, FileSpreadsheet, NotebookText, RotateCcw } from 'lucide-react';
import AdminRevenueTableColumn from '@/components/table/tableColumns/AdminRevenueTableColumn';

const AdminRevenueReport: React.FC = () => {

    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
        setPagination(updaterOrValue);
    };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryFn: () => fetchRevenueReportForAdmin({
            startDate: dateRange?.from ?? new Date(new Date().setDate(new Date().getDate() - 30)),
            endDate: dateRange?.to ?? new Date(),
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        }),
        queryKey: [
            "revenue",
            dateRange?.from,
            dateRange?.to,
            pagination.pageIndex,
            pagination.pageSize
        ],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const column = AdminRevenueTableColumn();

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            title="Select Date Range"
                            variant="default"
                            className="w-full md:w-auto justify-start text-left font-normal cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from && dateRange?.to ? (
                                <>
                                    {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                                </>
                            ) : (
                                <span>Select Date Range</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>

                <div className="flex gap-2">
                    <Button title="Reset" className='cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]' onClick={() => refetch()}>
                        <RotateCcw />
                        Reset
                    </Button>
                    <Button
                        title="Generate PDF"
                        variant="default"
                        className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                        onClick={(e) => handleExportPDF(e, data?.items.rows || [], "Revenue")}
                    >
                        <NotebookText />
                        Generate PDF
                    </Button>

                    <Button
                        title="Generate Excel"
                        variant="default"
                        className="cursor-pointerhover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                        onClick={(e) => handleExportExcel(e, data?.items.rows || [], "Revenue")}
                    >
                        <FileSpreadsheet />
                        Generate Excel
                    </Button>
                </div>
            </div >

            {
                isLoading ? (
                    <TableShimmer columnsCount={8} />
                ) : data ? (
                    <>
                        <DataTable
                            columns={column}
                            data={data.items.rows}
                            pageCount={data.totalPages}
                            pagination={pagination}
                            onPaginationChange={handlePaginationChange}
                        />

                        <div className="flex flex-col items-end mt-4 w-full gap-2">
                            <p className="text-lg font-bold flex justify-between w-full md:w-1/2 border-t border-b px-4 py-2 rounded-md">
                                <span className="text-gray-500">Grand Total:</span>
                                <span className="text-green-700">₹ {data.items.grandTotal.toFixed(2)}</span>
                            </p>

                            <p className="text-lg font-bold flex justify-between w-full md:w-1/2 border-t border-b px-4 py-2 rounded-md">
                                <span className="text-gray-500">Grand Discount:</span>
                                <span className="text-yellow-700">₹ {data.items.grandDiscount.toFixed(2)}</span>
                            </p>

                            <p className="text-lg font-bold flex justify-between w-full md:w-1/2 border-t border-b px-4 py-2 rounded-md">
                                <span className="text-gray-500">Total Initial Amount:</span>
                                <span className="text-blue-700">₹ {data.items.grandInitalAmount.toFixed(2)}</span>
                            </p>
                        </div>
                    </>
                ) : isError && error ? (
                    <DataFetchingError message={(error as Error).message} className="min-h-full" />
                ) : (
                    <DataFetchingError message={"No revenue found in database"} className="min-h-full" />
                )
            }
        </div >
    );
};

export default AdminRevenueReport;
