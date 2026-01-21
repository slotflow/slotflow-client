import { Provider } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { appRouter } from './router/AppRouter';
import { queryClient } from './lib/queryClient';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import AosAnimation from './components/common/AosAnimation';
import LoadingFallback from './pages/common/LoadingFallback';
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistAppStore } from './utils/redux/appStore';

import "leaflet/dist/leaflet.css";
import { toast } from 'react-toastify';
import ThemeSync from './components/common/ThemeSync';
import { onMessageListener } from './utils/helper/onMessageListener';

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
