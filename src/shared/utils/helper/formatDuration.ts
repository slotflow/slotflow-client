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
