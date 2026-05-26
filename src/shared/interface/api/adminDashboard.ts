// response type of admin fetch dashboard user stats data
export interface AdminFetchDashboardUserStatsDataResponse extends Record<string, number> {
    totalUsers: number;
    emailVerifiedUsers: number;
    blockedUsers: number;
}

// response type of the admin fetch dashboard provider stats data
export interface AdminFetchDashboardProviderStatsDataResponse extends Record<string, number> {
    totalProviders: number;
    emailVerifiedProviders: number;
    adminVerifiedProviders: number;
    blockedProviders: number;
    addressAddedProviders: number;
    serviceAddedProviders: number;
    availabilityAddedProviders: number;
    slotflowTrustedProviders: number;
}

// response type of the admin fetch dashboard subscription stats data
export interface AdminFetchDashboardSubscriptionStatsDataResponse extends Record<string, number> {
    activeSubscriptions: number;
    expiredSubscriptions: number;
    subscriptionsByFreePlan: number;
    subscriptionsByStarterPlan: number;
    subscriptionsByProfessionalPlan: number;
    subscriptionsByEnterprisePlan: number;
}

// response type of the admin fetch dashboard revenue stats data
export interface AdminStatsDataRequest extends Record<string, Date | undefined> {
    startDate?: Date;
    endDate?: Date;
}

// response type of the admin fetch dashboard revenue stats data
export interface AdminFetchDashboardRevenueAndPaymentsStatsDataResponse extends Record<string, number> {
    totalRevenue: number;
    totalRevenueViaSubscriptions: number;
    revenueByStripe: number;
    revenueByRazorpay: number;
    revenueByPaypal: number;
    totalRevenueViaAppointments: number;
    totalRefundsIssued: number;
    totalFailedPayments: number;
    totalPayoutsToProviders: number;
}

// response type of the admin fetch dashboard appointments stats data
export interface AdminFetchDashboardAppointmentStatsDataResponse extends Record<string, number> {
    totalAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    missedAppointments: number;
    rejectedAppointments: number;
}

// response type for the admin fetch dashboard graph data
export interface AdminDashboardGraphResponse {
    appointmentsOvertimeChartData: Array<{
        date: string;
        completed: number;
        missed: number;
        cancelled: number;
    }>;

    peakBookingHoursChartData: Array<{
        date: string;
        hour: string;
        bookings: number;
    }>;

    appointmentModeChartData: Array<{
        date: string;
        online: number;
        offline: number;
    }>;

    completionBreakdownChartData: Array<{
        status: 'completed' | 'missed' | 'cancelled' | 'rejected' | "confirmed" | "booked" | "pending";
        value: number;
    }>;

    newVsReturningUsersChartData: Array<{
        date: string;
        newUsers: number;
        returningUsers: number;
    }>;

    topBookingDaysChartData: Array<{
        day: string;
        count: number;
    }>;
}