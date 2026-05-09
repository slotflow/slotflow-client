import React from 'react';

const CalendarShimmer: React.FC = () => {
    const rowCount: number = 5;
    const coumnCount: number = 7;
    return (
        <>
            <div className="flex rounded-md w-full justify-between">
                <div className='flex flex-row w-2/12'>
                    <div className="h-8 w-6/12 shimmer rounded-md"></div>
                    <div className="h-8 w-6/12 shimmer rounded-md"></div>
                </div>
                <div className="h-8 w-3/12 shimmer rounded-md"></div>
                <div className='flex w-3/12'>
                    <div className="h-8 w-4/12 shimmer rounded-md"></div>
                    <div className="h-8 w-4/12 shimmer rounded-md"></div>
                    <div className="h-8 w-4/12 shimmer rounded-md"></div>
                </div>
            </div>
            <div className="flex flex-col rounded-md overflow-hidden border-1 mt-2">
                {Array.from({ length: rowCount }).map((_, index) => (
                    <div key={index} className={`auto flex items-center ${index < 4 && "border-b-1"} mb-1`}>
                        {Array.from({ length: coumnCount }).map((_, index) => (
                            <div key={index} className="h-32 w-full shimmer m-1"></div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default CalendarShimmer