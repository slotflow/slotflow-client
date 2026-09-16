import { format, isValid } from 'date-fns';
import { dateFormats } from '../constants';
import { DateFormatPattern, DateInput } from '@/shared/types/common';

// Formats a numeric value into an INR currency string (e.g., ₹1,250.00).
export const formatNumberToPrice = (amount: number, decimal = 2): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimal,
  }).format(amount);
};

// Formats dates safely with fallback to 'N/A' on null or invalid values.
export const formatDate = (
  date: DateInput,
  pattern: DateFormatPattern = dateFormats.SHORT
): string => {
  if (!date) return 'N/A';

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (!isValid(parsedDate)) {
    return 'N/A';
  }

  return format(parsedDate, pattern);
};

// Formats total seconds into a MM:SS digital countdown string (e.g., 01:30).
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

// Formats a total minute duration into a human-readable string (e.g., 1 hour 30 minutes).
export const formatDuration = (minutes?: number) => {
  if (!minutes) return '';

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  }

  const hours = minutes / 60;

  if (Number.isInteger(hours)) {
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }

  return `${Math.floor(hours)} hours ${minutes % 60} minutes`;
};
