import React from "react";
import { TableShimmerProps } from "@/shared/interface/shimmerInterface";

const TableShimmer: React.FC<TableShimmerProps> = ({
    columnsCount
}) => {

    return (
        <React.Fragment>
            <div className="flex flex-col rounded-md overflow-hidden">
                <div className="h-15 flex items-center justify-between">
                    <div className="h-8 w-4/12 shimmer rounded-md"></div>
                    <div className="h-8 w-1/12 shimmer rounded-md"></div>
                </div>
            </div>
            <div className="flex flex-col rounded-md overflow-hidden border-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className={`h-10 flex items-center justify-around ${index < 4 && "border-b-1"} mb-1`}>
                        {Array.from({ length: columnsCount || 5 }).map((_, index) => (
                            <div key={index} className="h-5 w-1/5 shimmer mx-2 rounded-md"></div>
                        ))}
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default TableShimmer;