import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const NotificationCardShimmer = () => {
    return (
        <div className="space-y-3">
            {[...Array(10)].map((_, index) => (
                <Alert key={index} className="transition-colors shadow-sm bg-black/5 dark:bg-white/5 border-transparent animate-pulse">
                    <AlertTitle className="flex justify-between items-start leading-tight">
                        <div className="h-4 w-3/4 shimmer rounded"></div>
                        <div className="h-2 w-2 rounded-full shimmer shrink-0 mt-1"></div>
                    </AlertTitle>
                    <AlertDescription className="mt-2.5 space-y-2">
                        <div className="h-3 w-full shimmer rounded"></div>
                        <div className="h-3 w-5/6 shimmer rounded"></div>
                    </AlertDescription>
                    <div className="mt-3 flex justify-end">
                        <div className="h-2.5 w-16 shimmer rounded"></div>
                    </div>
                </Alert>
            ))}
        </div>
    );
};

export default NotificationCardShimmer;