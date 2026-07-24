import { Button } from "../ui/button";
import { PageHeaderProps } from "@/shared/interface/componentInterface";

const PageHeader = ({
    title,
    description,
    actionLabel,
    onActionClick
}: PageHeaderProps) => {

    return (
        <div className="flex justify-between mb-4 items-center">
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
            <div>
                {actionLabel && onActionClick && (
                    <Button
                        title={actionLabel}
                        variant="default"
                        className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                        onClick={onActionClick}
                    >
                        {actionLabel}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default PageHeader;