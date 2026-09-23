import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import PlanGuard from "@/router/PlanGuard";
import { RouteNames } from "@/shared/utils/constants/routeConstants";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const ChatWindow = lazy(() => import("../../containers/dashboard/ChatWindow"));
const LoadingFallbackPage = lazy(() => import("../fallbacks/LoadingFallbackPage"));

const ChatPage = () => {

    const { isProvider, isUser } = useAuth();

    const renderRoleDashboard = () => {
        if (isProvider) {
            return (
                <PlanGuard routeName={RouteNames.CHAT}>
                    <ChatWindow />
                </PlanGuard>
            )
        };
        if (isUser) return <ChatWindow />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default ChatPage;