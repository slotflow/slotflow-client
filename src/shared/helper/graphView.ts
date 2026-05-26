import { PlanName } from "../interface/enums";
import { planChartAccess } from "../utils/constants";

export const graphView = (plan: string, chartKey: string) => {
  if (!plan || plan === "" || plan === PlanName.NO_SUBSCRIPTION) return false;
  const allowedCharts = planChartAccess[plan as keyof typeof planChartAccess];
  return allowedCharts?.includes(chartKey) ?? false;
}