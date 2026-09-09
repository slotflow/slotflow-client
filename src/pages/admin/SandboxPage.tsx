import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export const SandboxPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.split('/').pop() || 'dashboard-data-card';

  const handleSelectComponent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/test-sandbox/${e.target.value}`);
  };

  return (
    <div className="p-4 mx-auto space-y-6 bg-slate-50 dark:bg-zinc-950 min-h-screen text-slate-900 dark:text-slate-50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-slate-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold">Component Test Sandbox</h1>
          <p className="text-xs text-slate-500 mt-1">
            Select a component from the dropdown to preview sample usage and interactive states.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="component-select" className="text-xs font-semibold text-slate-500">
            Select Component:
          </label>
          <select
            id="component-select"
            value={currentTab}
            onChange={handleSelectComponent}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="dashboard-data-card">DashboardDataCard</option>
            <option value="charts-demo">Charts</option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default SandboxPage;
