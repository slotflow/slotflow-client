import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from './dropdown-menu';
import {
  OnChangeFn,
  flexRender,
  SortingState,
  useReactTable,
  PaginationState,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import * as React from 'react';
import { Input } from './input';
import { Button } from './button';
import { DataTableProps } from '@/shared/types/component';
import { ChevronLeft, ChevronRight, Columns, RotateCw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  onPaginationChange,
  pagination: controlledPagination,
  actionButtons,
  isFetching,
  refetch,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 14,
  });

  const paginationState = controlledPagination || internalPagination;

  const handlePaginationChange: OnChangeFn<PaginationState> = React.useCallback(
    (updaterOrValue) => {
      if (onPaginationChange) {
        onPaginationChange(updaterOrValue);
      } else {
        setInternalPagination(updaterOrValue);
      }
    },
    [onPaginationChange],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: handlePaginationChange,
    manualPagination: !!pageCount,
    pageCount: pageCount ?? -1,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      pagination: paginationState,
    },
  });

  return (
    <>
      <div className="flex items-center py-2">
        <Input
          placeholder="Filter values"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <div className="ml-auto space-x-2 flex">
            {actionButtons?.map((btn) => (
              <Button
                key={btn.actionLabel}
                title={btn?.actionLabel}
                variant="secondary"
                size="sm"
                onClick={btn?.onActionClick}
              >
                {btn?.actionLabel}
              </Button>
            ))}
            {refetch && (
              <Button
                key="refetch"
                disabled={isFetching}
                title="refetch"
                variant="secondary"
                size="sm"
                onClick={() => refetch()}
              >
                <RotateCw
                  className={`w-3.5 h-3.5 text-slate-500 ${isFetching && 'animate-spin'}`}
                />
                Refetch
              </Button>
            )}
            <DropdownMenuTrigger asChild>
              <Button title="Columns" variant="secondary" size="sm">
                <Columns className={`w-3.5 h-3.5 text-slate-500 ${isFetching && 'animate-spin'}`} />
                Columns
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border mt-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Use built-in pagination controls */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {pageCount ? (
            <>
              Page {paginationState.pageIndex + 1} of {pageCount}(
              {table.getFilteredRowModel().rows.length} items)
            </>
          ) : (
            <>
              Showing{' '}
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}{' '}
              of {table.getFilteredRowModel().rows.length} entries
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            title="Previous"
            variant="secondary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className={`w-3.5 h-3.5 text-slate-500 ${isFetching && 'animate-spin'}`} />
            Previous
          </Button>
          <Button
            title="Next"
            variant="secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight
              className={`w-3.5 h-3.5 text-slate-500 ${isFetching && 'animate-spin'}`}
            />
          </Button>
        </div>
      </div>
    </>
  );
}
