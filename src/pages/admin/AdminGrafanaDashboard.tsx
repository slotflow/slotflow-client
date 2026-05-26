import React from 'react';
import { useSelector } from 'react-redux';
import { grafanaConfig } from '@/shared/config/env';
import { RootState } from '@/shared/redux/appStore';
import PageHeader from '@/components/common/PageHeader';

const AdminGrafanaDashboard: React.FC = () => {

    const { lightTheme } = useSelector((state: RootState) => state.app);
    const { grafanaUrl, grafanaDashboardId, grafanaDashboardName, grafanaUrlQuery } = grafanaConfig;
    const url = grafanaUrl + grafanaDashboardId + grafanaDashboardName + grafanaUrlQuery;

    return (
        <div style={{ height: "100vh", width: "100%" }} className="p-4">
            <PageHeader 
                title="Grafana Dashboard"
                description="Detailed view of metrics, logs and traces of all services"
            />
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