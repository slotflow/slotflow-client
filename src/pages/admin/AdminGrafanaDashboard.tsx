import { useSelector } from 'react-redux';
import { grafanaConfig } from '@/shared/config/env';
import { RootState } from '@/shared/redux/appStore';

const AdminGrafanaDashboard = () => {

  const { lightTheme } = useSelector((state: RootState) => state.app);
  const { grafanaUrl } = grafanaConfig;

  const url = new URL(grafanaUrl);

  url.searchParams.set('orgId', '1');
  url.searchParams.set('from', 'now-24h');
  url.searchParams.set('to', 'now');
  url.searchParams.set('timezone', 'browser');
  url.searchParams.set('var-node', 'slotflow-api-gateway');
  url.searchParams.set('theme', lightTheme ? 'light' : 'dark');
  url.searchParams.set('kiosk', 'true');

  return (
    <div style={{ height: '100vh', width: '100%' }} className="p-4">
      <iframe
        src={url.toString()}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Grafana Dashboard"
        className="rounded-md"
      />
    </div>
  );
};

export default AdminGrafanaDashboard;
