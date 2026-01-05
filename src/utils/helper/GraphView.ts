import { PlanName } from "../interface/enums";
import { planChartAccess } from "../constants";

  export const GraphView = (plan: string, chartKey: string) => {
    if (!plan || plan === "" || plan === PlanName.NoSubscription) return false;
    const allowedCharts = planChartAccess[plan as keyof typeof planChartAccess];
    return allowedCharts?.includes(chartKey) ?? false;
  }