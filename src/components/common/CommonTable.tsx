import { useState } from "react";
import { DataTable } from "../table/data-table";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "./DataFetchingError";
import TableShimmer from "../shimmers/TableShimmer";
import { OnChangeFn, PaginationState } from "@tanstack/react-table";
import { CommonTableComponentProps, FetchFunctionBaseQueryParams } from "@/utils/interface/commonInterface";

const CommonTable = <
  T,
  Q extends object = {}
>({
  parentDivCalssName,
  fetchApiFunction,
  queryKey,
  column,
  columnsCount,
  pageSize = 10,
  queryParams,
}: CommonTableComponentProps<T, Q>) => {

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue
  ) => {
    setPagination(updaterOrValue);
  };

  const finalQueryParams = {
    ...queryParams,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  } as FetchFunctionBaseQueryParams & Q;

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchApiFunction(finalQueryParams),
    queryKey: [
      queryKey,
      pagination.pageIndex,
      pagination.pageSize,
      queryParams,
    ],
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={`${parentDivCalssName || "p-4"}`}>
      {isLoading ? (
        <div className="mt-2">
          <TableShimmer columnsCount={columnsCount} />
        </div>
      ) : data?.data ? (
        <DataTable
          columns={column}
          data={data.data}
          pageCount={data.totalPages}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      ) : isError && error ? (
        <DataFetchingError
          message={(error as Error).message}
          className="min-h-full"
        />
      ) : (
        <DataFetchingError
          message={`No ${queryKey} found in database`}
          className="min-h-full"
        />
      )}
    </div>
  );
};

export default CommonTable;