import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { appRouter } from './router/AppRouter';
import { queryClient } from './lib/queryClient';
import { RootState } from '@/app/store/appStore';
import { RouterProvider } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import ThemeSync from './components/app/ThemeSync';
import { ToastContainer, Bounce } from 'react-toastify';
import { QueryClientProvider } from '@tanstack/react-query';
import LoadingFallback from './pages/common/LoadingFallback';
import { onMessageListener } from './shared/utils/helper/onMessageListener';

const AppContent: React.FC = () => {
  const themeMode = useSelector((store: RootState) => store.app?.lightTheme);

  useEffect(() => {
    onMessageListener().then((payload) => {
      if (!payload?.notification) return;
      toast.info(`${payload.notification.title}\n${payload.notification.body}`);
    });
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme={themeMode ? 'light' : 'dark'}
        transition={Bounce}
      />

      <ThemeSync />

      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={appRouter} />
        </Suspense>
      </QueryClientProvider>
    </>
  );
};

export default AppContent;
