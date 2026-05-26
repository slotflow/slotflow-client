import React from 'react';
import UserListCard from './lower-section/UserListCard';
import PaymentListCard from './lower-section/PaymentListCard';
import ProviderListCard from './lower-section/ProviderListCard';

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
      </div>
    </div>
  );
};

export default AdminDashboardLowerSection;
