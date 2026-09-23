import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingFallbackPage from "../fallbacks/LoadingFallbackPage";

const Error404Page = lazy(() => import("../fallbacks/Error404Page"));
const VideoCallLobby = lazy(() => import("../../containers/dashboard/VideoCallLobby"));

const VideoCallLobbyPage = () => {
    const { isUser, isProvider } = useAuth();

    const renderRoleDashboard = () => {
        if (isUser || isProvider) return <VideoCallLobby />;
        return <Error404Page />;
    };

    return (
        <Suspense fallback={<LoadingFallbackPage />}>
            {renderRoleDashboard()}
        </Suspense>
    );
}

export default VideoCallLobbyPage;