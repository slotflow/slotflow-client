import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const AdminDashboard = lazy(() => import("@/components/dashboard/admin/AdminDashboard"));
const ProviderDashboard = lazy(() => import("@/components/dashboard/provider/ProviderDashboard"));

const DashboardPage = () => {
    const { isAdmin, isProvider, isUser } = useAuth();

    const renderRoleDashboard = () => {
        if (isAdmin) return <AdminDashboard />;
        if (isProvider) return <ProviderDashboard />;
        if (isUser) return <Navigate to="/services" replace />;
        return <Navigate to="/login" replace />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default DashboardPage;