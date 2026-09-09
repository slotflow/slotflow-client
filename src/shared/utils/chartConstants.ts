import { ChartConfig } from '@/components/ui/chart';

// admin dashboard user chart config
export const adminDashboardUsersChartConfig = {
  newUsers: {
    label: 'New Users',
    color: 'hsl(var(--chart-1))',
  },
  returningUsers: {
    label: 'Returning Users',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

// admin dashboard provider chart config
export const newVsReturningProvidersChartConfig = {
  newUsers: {
    label: 'New Providers',
    color: 'hsl(var(--chart-1',
  },
  returningUsers: {
    label: 'Returning Providers',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

// admin dadhboard appointments overtime chrt config
export const appointmentsOvertimeChartDataConfig: ChartConfig = {
  completed: {
    label: 'Completed',
    color: '#10b981',
  },
  missed: {
    label: 'Missed',
    color: '#f59e0b',
  },
  cancelled: {
    label: 'Cancelled',
    color: '#f43f5e',
  },
};

// admin dashboard peak booking hours chart config
export const peakBookingHoursChartDataConfig: ChartConfig = {
  hour: {
    label: 'Hours',
    color: '#6366f1',
  },
  bookings: {
    label: 'Bookings',
    color: '#10b981',
  },
};

// admin dashboard appointments mode chart config
export const appointmentModeChartDataConfig: ChartConfig = {
  newUsers: {
    label: 'New Users',
    color: '#6366f1',
  },
  activeUsers: {
    label: 'Active Users',
    color: '#10b981',
  },
};

// admin dashboard appointments completion chart config
export const completionChartConfig = {
  completed: {
    label: 'Completed',
    color: '#10b981',
  },
  confirmed: {
    label: 'Confirmed',
    color: '#06b6d4',
  },
  booked: {
    label: 'Booked',
    color: '#6366f1',
  },
  pending: {
    label: 'Pending',
    color: '#f59e0b',
  },
  missed: {
    label: 'Missed',
    color: '#f97316',
  },
  cancelled: {
    label: 'Cancelled',
    color: '#ef4444',
  },
  rejected: {
    label: 'Rejected',
    color: '#be123c',
  },
} satisfies ChartConfig;

// admin dashboard Top bookings day chart config
export const topBookingDaysChartConfig = {
  Monday: {
    label: 'Monday',
    color: '#6366F1',
  },
  Tuesday: {
    label: 'Tuesday',
    color: '#10B981',
  },
  Wednesday: {
    label: 'Wednesday',
    color: '#F59E0B',
  },
  Thursday: {
    label: 'Thursday',
    color: '#EF4444',
  },
  Friday: {
    label: 'Friday',
    color: '#3B82F6',
  },
  Saturday: {
    label: 'Saturday',
    color: '#8B5CF6',
  },
  Sunday: {
    label: 'Sunday',
    color: '#EC4899',
  },
};

// admin dashboard revenue chart config
export const revenueChartConfig: ChartConfig = {
  totalRevenue: {
    label: 'Net Revenue ($)',
    color: '#10b981',
  },
  totalRefunds: {
    label: 'Discounts Given ($)',
    color: '#6366f1',
  },
  netRevenue: {
    label: 'Gateway Fees ($)',
    color: '#f43f5e',
  },
};

// admin dahsboard subscription chart config
export const subscriptionChartConfig: ChartConfig = {
  active: {
    label: 'Active',
    color: '#10b981',
  },
  expired: {
    label: 'Expired',
    color: '#f59e0b',
  },
  cancelled: {
    label: 'Cancelled',
    color: '#ef4444',
  },
  pending: {
    label: 'Pending',
    color: '#3b82f6',
  },
  past_due: {
    label: 'Past Due',
    color: '#8b5cf6',
  },
  failed: {
    label: 'Failed',
    color: '#6b7280',
  },
};
