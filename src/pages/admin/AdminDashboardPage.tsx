import React from "react";
import AdminDashboardStats from "@/components/common/dashboard/admin/AdminDashboardStats";
import AdminDashboardLowerSection from "@/components/common/dashboard/admin/AdminDashboardLowerSection";

const AdminDashboardPage: React.FC = () => {

    return (
        <>
            <AdminDashboardStats />
            <AdminDashboardLowerSection />
        </>
    )
}

export default AdminDashboardPage;
