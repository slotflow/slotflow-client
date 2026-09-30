import { format, isValid } from 'date-fns';
import { dateFormats } from '../constants/appConstants';
import { DateFormatPattern, DateInput } from '@/shared/types/common';

// Formats dates safely with fallback to 'N/A' on null or invalid values.
export const formatDate = (
  date: DateInput,
  pattern: DateFormatPattern = dateFormats.SHORT
): string => {
  if (!date) return 'Not Available';

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (!isValid(parsedDate)) {
    return 'Not Available';
  }

  return format(parsedDate, pattern);
};