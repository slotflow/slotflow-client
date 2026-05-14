import React from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
}) => {

    return (
        <div className="flex justify-between">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {title}
                </h1>
                {description && (
                    <p className="text-slate-500 mt-1 text-sm md:text-base">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}

export default PageHeader;