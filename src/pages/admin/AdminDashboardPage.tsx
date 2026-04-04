import React from "react";
import AdminDashboardStats from "@/components/dashboard/admin/AdminDashboardStats";
import AdminDashboardLowerSection from "@/components/dashboard/admin/AdminDashboardLowerSection";

const AdminDashboardPage: React.FC = () => {

    return (
        <>
            <AdminDashboardStats />
            <AdminDashboardLowerSection />
        </>
    )
}

export default AdminDashboardPage;
