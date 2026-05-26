import React from "react";
import AdminDashboardStats from "@/components/dashboard/admin/AdminDashboardStats";
import AdminDashboardLowerSection from "@/components/dashboard/admin/AdminDashboardLowerSection";

const AdminDashboardPage: React.FC = () => {

    return (
        <div className="p-4">
            <AdminDashboardStats />
            <AdminDashboardLowerSection />
        </div>
    )
}

export default AdminDashboardPage;
