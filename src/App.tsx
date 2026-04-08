import "leaflet/dist/leaflet.css";
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import { Suspense, useEffect } from 'react';
import { appRouter } from './router/AppRouter';
import { queryClient } from './lib/queryClient';
import { RouterProvider } from 'react-router-dom';
import ThemeSync from './components/app/ThemeSync';
import AosAnimation from './components/animation/AosAnimation';
import { QueryClientProvider } from '@tanstack/react-query';
import LoadingFallback from './pages/common/LoadingFallback';
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistAppStore } from './shared/redux/appStore';
import { onMessageListener } from './shared/helper/onMessageListener';

function App() {
  useEffect(() => {
    onMessageListener().then((payload: any) => {
      if (!payload?.notification) return;
      toast.info(`${payload.notification.title}\n${payload.notification.body}`);
    });
  }, []);

  return (
    <AosAnimation>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistAppStore}>
          <ThemeSync />
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingFallback />}>
              <RouterProvider router={appRouter} />
            </Suspense>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </AosAnimation>
  )
}

export default App;
