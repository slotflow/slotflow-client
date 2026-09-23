import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const LoadingFallbackPage = lazy(() => import("../fallbacks/LoadingFallbackPage"));
const AdminListPlans = lazy(() => import("../../containers/admin/AdminListPlans"));

const PlansPage = () => {

    const { isAdmin, isProvider } = useAuth();

    const renderRoleDashboard = () => {
        if (isAdmin) return <AdminListPlans />
        if (isProvider) return <Navigate to='/setting/upgrade' />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default PlansPage;