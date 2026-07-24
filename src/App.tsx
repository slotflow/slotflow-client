import "leaflet/dist/leaflet.css";
import { useEffect } from 'react';
import AppContent from "./AppContent";
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
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
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistAppStore}>
        <AppContent />
      </PersistGate>
    </Provider>
  )
}

export default App;
