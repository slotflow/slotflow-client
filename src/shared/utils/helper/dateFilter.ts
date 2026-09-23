import { subDays } from 'date-fns';
import { formatDate } from './formatDate';
import { dateFormats } from '../constants';
import { TimeRange } from '../../types/common';

export function filterChartDataHelper<T extends { date: string }>(
  data: T[],
  timeRange: TimeRange,
): T[] {
  if (!Array.isArray(data)) return [];

  const today = new Date();
  const formattedToday = formatDate(today, dateFormats.ISO_DATE);
  const referenceDate = new Date(formattedToday);

  let daysToSubtract = 7;
  if (timeRange === '14d') {
    daysToSubtract = 14;
  } else if (timeRange === '30d') {
    daysToSubtract = 30;
  } else if (timeRange === '45d') {
    daysToSubtract = 45;
  } else if (timeRange === '60d') {
    daysToSubtract = 60;
  } else if (timeRange === '90d') {
    daysToSubtract = 90;
  } else if (timeRange === '180d') {
    daysToSubtract = 180;
  } else if (timeRange === '365d') {
    daysToSubtract = 365;
  }

  const startDate = subDays(referenceDate, daysToSubtract);

  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate;
  });
}
