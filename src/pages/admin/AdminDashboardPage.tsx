import React from "react";
import AdminDashboardStats from "@/components/dashboard/admin/AdminDashboardStats";
import AdminDashboardLowerSection from "@/components/dashboard/admin/AdminDashboardLowerSection";

const AdminDashboardPage: React.FC = () => {

    return (
        <React.Fragment>
            <AdminDashboardStats />
            <AdminDashboardLowerSection />
        </React.Fragment>
    )
}

export default AdminDashboardPage;
