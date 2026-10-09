import { TabItem } from '@/shared/types/common';

// Tabs for provider profile showing in admin side and provider side
export const providerTabs: TabItem[] = [
  { tabName: 'Address', value: 'address', admin: true, user: true },
  { tabName: 'Service', value: 'service', admin: true, user: true },
  { tabName: 'Availability', value: 'availability', admin: true, user: true },
  { tabName: 'Reviews', value: 'reviews', admin: true, user: true },
  { tabName: 'Subscriptions', value: 'subscriptions', admin: true, user: false },
  { tabName: 'Payments', value: 'payments', admin: true, user: false },
  { tabName: 'Proofs', value: 'proofs', admin: true, user: false },
];

// Tabs for user profile showing in admin side and user side
export const userTabs: TabItem[] = [
  { tabName: 'Address', value: 'address', admin: true, user: true },
  { tabName: 'Reviews', value: 'reviews', admin: true, user: true },
];

// Admin dashboard overview tabs
export const adminDashboardTabs: TabItem[] = [
  { tabName: 'Users', value: 'users', admin: true, user: false },
  { tabName: 'Providers', value: 'providers', admin: true, user: false },
  { tabName: 'Subscriptions', value: 'subscriptions', admin: true, user: false },
  { tabName: 'Revenue', value: 'revenue', admin: true, user: false },
  { tabName: 'Appointments', value: 'appointments', admin: true, user: false },
];
