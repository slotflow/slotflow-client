import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import PlanGuard from "@/router/PlanGuard";
import { RouteNames } from "@/shared/utils/constants/routeConstants";

const CalendarView = lazy(() => import("../../containers/dashboard/CalendarView"));
const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const LoadingFallbackPage = lazy(() => import("../fallbacks/LoadingFallbackPage"));

const CalendarPage = () => {

    const { isProvider, isUser } = useAuth();

    const renderRoleDashboard = () => {
        if (isProvider) {
            return (
                <PlanGuard routeName={RouteNames.CALENDAR}>
                    <CalendarView />
                </PlanGuard>
            )
        };
        if (isUser) return <CalendarView />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default CalendarPage;