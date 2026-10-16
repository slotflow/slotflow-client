import { useState } from 'react';
import { DataTable } from '../ui/data-table';
import { useQuery } from '@tanstack/react-query';
import TableShimmer from '../shimmers/TableShimmer';
import DataFetchingError from '../error/DataFetchingError';
import { OnChangeFn, PaginationState } from '@tanstack/react-table';
import { PaginatedDataTableProps, FetchFunctionBaseQueryParams } from '@/shared/types/common';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const PaginatedDataTable = <T, Q extends object = {}>({
  parentDivCalssName,
  fetchApiFunction,
  queryKey,
  column,
  columnsCount,
  pageSize = 14,
  queryParams,
  actionButtons,
}: PaginatedDataTableProps<T, Q>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    setPagination(updaterOrValue);
  };

  const finalQueryParams = {
    ...queryParams,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  } as FetchFunctionBaseQueryParams & Q;

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryFn: () => fetchApiFunction(finalQueryParams),
    queryKey: [...queryKey, pagination.pageIndex, pagination.pageSize, queryParams],
  });

  return (
    <div className={`${parentDivCalssName || ''}`}>
      {isLoading || isFetching ? (
        <div className="mt-2">
          <TableShimmer columnsCount={columnsCount} />
        </div>
      ) : data?.items ? (
        <DataTable
          columns={column}
          data={data.items}
          pageCount={data.totalPages}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          actionButtons={actionButtons}
          isFetching={isFetching}
          refetch={refetch}
        />
      ) : isError && error ? (
        <DataFetchingError message={(error as Error).message} className="min-h-full" />
      ) : (
        <DataFetchingError message={`No ${queryKey} found in database`} className="min-h-full" />
      )}
    </div>
  );
};

export default PaginatedDataTable;
