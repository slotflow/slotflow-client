import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const AdminUserDetails = lazy(() => import("../../containers/admin/AdminUserDetails"));

const UserDetailsPage = () => {
    const { isAdmin } = useAuth();

    const renderRoleDashboard = () => {
        if (isAdmin) {
            return <AdminUserDetails />;
        } else {
            return <Error404Page />
        }
    }

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
};

export default UserDetailsPage;