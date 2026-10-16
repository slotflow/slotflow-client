import { PlanName } from '@/shared/types/enums';

export const formatString = (str?: string | null): string => {
  if (!str) return '';

  if (str === PlanName.NO_SUBSCRIPTION) return 'No Active Plan';

  const spacedFromCamel = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  const cleaned = spacedFromCamel.replace(/_/g, ' ').toLowerCase().trim();
  if (!cleaned) return '';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};
