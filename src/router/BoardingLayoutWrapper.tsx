import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import BoardingLayout from '@/layouts/BoardingLayout';
import { useOnboardingMetadata } from '@/hooks/useOnboardingMetadata';
import LoadingFallbackPage from '@/pages/fallbacks/LoadingFallbackPage';

const BoardingLayoutWrapper = () => {
  const metadata = useOnboardingMetadata();

  if (!metadata) {
    return (
      <Suspense fallback={<LoadingFallbackPage />}>
        <Outlet />
      </Suspense>
    );
  }

  return (
    <BoardingLayout
      pageNumber={metadata.pageNumber}
      heading={metadata.heading}
      description={metadata.description}
    >
      <Suspense fallback={<LoadingFallbackPage />}>
        <Outlet />
      </Suspense>
    </BoardingLayout>
  );
};

export default BoardingLayoutWrapper;
