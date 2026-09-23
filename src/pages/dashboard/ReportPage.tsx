import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const AdminRevenueReport = lazy(() => import("@/components/admin/AdminRevenueReport"));

const ReportPage = () => {
    const { isAdmin } = useAuth();

    const renderRoleDashboard = () => {
        if (isAdmin) return <AdminRevenueReport />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default ReportPage;
