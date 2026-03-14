import { format } from "date-fns";

// Format timestamp to 24 hour
export function formatTo24HourTime(date: string) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

// Format number to price
export const formatNumberToPrice = (amount: number, decimal = 2): string => {

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimal,
  }).format(amount);

};

// Format date for infoDisplayCompoenent
export const formateDate = (date: Date) : string => {
    return date ? format(new Date(date), "dd MMM yyyy") : "N/A";
}

// Time formating function for otp page
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

// Formate date for infoDisplayCompoenent
export const formatDateWithTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};