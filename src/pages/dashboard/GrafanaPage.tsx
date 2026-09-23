import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const AdminGrafana = lazy(() => import("../../containers/admin/AdminGrafana"));

const GrafanaPage = () => {
    const { isAdmin } = useAuth();

    const renderRoleDashboard = () => {
        if (isAdmin) return <AdminGrafana />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default GrafanaPage;