import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const ProviderUpgradePlan = lazy(() => import("../../containers/provider/ProviderUpgradePlan"));

const UpgradePage = () => {
    const { isProvider } = useAuth();

    const renderRoleDashboard = () => {
        if (isProvider) return <ProviderUpgradePlan />
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default UpgradePage;