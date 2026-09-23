import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const LoadingFallbackPage = lazy(() => import("../fallbacks/LoadingFallbackPage"));
const ReferralDashboard = lazy(() => import("../../containers/dashboard/ReferralDashboard"));

const ReferralsPage = () => {

    const { isProvider, isUser } = useAuth();

    const renderRoleDashboard = () => {
        if (isUser || isProvider) return <ReferralDashboard />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default ReferralsPage;