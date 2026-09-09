import { TableShimmerProps } from '@/shared/types/shimmer';

const TableShimmer = ({ columnsCount }: TableShimmerProps) => {
  return (
    <>
      <div className="flex flex-col rounded-md overflow-hidden">
        <div className="h-15 flex items-center justify-between">
          <div className="h-8 w-4/12 shimmer rounded-md"></div>
          <div className="flex flex-row items-center justify-end space-x-2">
            <div className="h-8 w-24 shimmer rounded-md"></div>
            <div className="h-8 w-24 shimmer rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-md overflow-hidden border-1">
        {Array.from({ length: 17 }).map((_, index) => (
          <div
            key={index}
            className={`h-10 flex items-center justify-around ${index < 16 && 'border-b-1'} ${index === 0 && 'h-8'} mb-1`}
          >
            {Array.from({ length: columnsCount || 5 }).map((_, colIndex) => (
              <div key={colIndex} className="h-5 w-1/5 shimmer mx-2 rounded-md"></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableShimmer;
