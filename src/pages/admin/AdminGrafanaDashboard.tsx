import { useSelector } from 'react-redux';
import { grafanaConfig } from '@/shared/config/env';
import { RootState } from '@/shared/redux/appStore';

const AdminGrafanaDashboard = () => {

    const { lightTheme } = useSelector((state: RootState) => state.app);
    const { grafanaUrl, grafanaDashboardId, grafanaDashboardName, grafanaUrlQuery } = grafanaConfig;
    const url = grafanaUrl + grafanaDashboardId + grafanaDashboardName + grafanaUrlQuery;

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <iframe
                src={url + `theme=${lightTheme ? "light" : "dark"}`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Grafana Dashboard"
            />
        </div>

    );
};

export default AdminGrafanaDashboard;