import { ComponentSandboxSpec } from "@/shared/types/component";
import DashboardDataCard from "@/components/common/DashboardDataCard";

export const sandboxRegistry: ComponentSandboxSpec[] = [
  {
    id: 'dashboard-card',
    name: 'Dashboard Data Card',
    component: DashboardDataCard,
    defaultProps: {
      title: 'Total Revenue',
      value: '$45,231.89',
      trend: '+20.1% from last month',
      isPositive: true,
    },
    controls: {
      title: { type: 'text', label: 'Card Title' },
      value: { type: 'text', label: 'Displayed Value' },
      isPositive: { type: 'boolean', label: 'Positive Trend' },
    },
  },
];