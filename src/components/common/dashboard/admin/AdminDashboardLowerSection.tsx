import React from 'react';
import UserListCard from './lower-section/UserListCard';
import ProviderListCard from './lower-section/ProviderListCard';
import ServiceHealthCard from './lower-section/ServiceHealthCard';
import PaymentListCard from './lower-section/PaymentListCard';

const AdminDashboardLowerSection: React.FC = () => {
  return (
    <div className="w-full space-y-8 mt-12 mb-16">
      <div className="flex flex-col gap-1 px-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight transition-colors">
          System Overview & Activity
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Detailed real-time monitoring of users, providers, transactions and system health
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-4">
        <UserListCard />
        <ProviderListCard />
        <PaymentListCard />
        <div className="md:col-span-2 lg:col-span-1">
          <ServiceHealthCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLowerSection;
