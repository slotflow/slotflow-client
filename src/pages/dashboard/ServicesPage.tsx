import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const AdminListServices = lazy(() => import("../../containers/admin/AdminListServices"));
const UserServiceSelectPage = lazy(() => import("../user/UserServiceSelectPage"));

const ServicesPage = () => {
    const { isUser, isAdmin } = useAuth();

    const renderRoleDashboard = () => {
        if (isUser) return <UserServiceSelectPage />;
        if (isAdmin) return <AdminListServices />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default ServicesPage;
