import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import AdminRevenueReport from '@/components/admin/AdminRevenueReport';

const AdminReportPage: React.FC = () => {

  return (
    <div className="p-4">
      <PageHeader
        title="Report"
        description="Detailed revenue report"
      />
      <AdminRevenueReport />
    </div>
  )
}

export default AdminReportPage