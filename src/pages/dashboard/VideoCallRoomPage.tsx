import { lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingFallbackPage from '../fallbacks/LoadingFallbackPage';

const Error404Page = lazy(() => import('../fallbacks/Error404Page'));
const VideoCallRoom = lazy(() => import('../../containers/dashboard/VideoCallRoom'));

const VideoCallRoomPage = () => {
  const { isUser, isProvider } = useAuth();

  const renderRoleDashboard = () => {
    if (isUser || isProvider) return <VideoCallRoom />;
    return <Error404Page />;
  };

  return <Suspense fallback={<LoadingFallbackPage />}>{renderRoleDashboard()}</Suspense>;
};

export default VideoCallRoomPage;
