import { ApiPaginatedResponse } from "./interface/commonInterface";

// Time formating function for otp page
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

// Greeting generation function for header
export const greetings = (): string => {
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 12 && hour <= 12) {
    return "Good Morning"
  } else if (hour > 12 && hour < 4) {
    return "Good Afternoon"
  } else {
    return "Good Evening"
  }
}

// Provider slot availability generator
const format12HourTime = (time24: string): string => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
};

export const generateTimeSlots = (startTime: string, endTime: string, intervalMinutes: string): string[] => {
  const slots: string[] = [];
  let currentTime = startTime;
  let interval = 0;

  if (intervalMinutes === "15 minutes") {
    interval = 15;
  } else if (intervalMinutes === "30 minutes") {
    interval = 30;
  } else if (intervalMinutes === "1 hour") {
    interval = 60;
  }

  while (currentTime <= endTime) {
    slots.push(format12HourTime(currentTime));
    const [hours, minutes] = currentTime.split(':').map(Number);
    const nextMinutes = minutes + interval;
    const nextHours = hours + Math.floor(nextMinutes / 60);
    const nextMinutesAdjusted = nextMinutes % 60;
    currentTime = `${String(nextHours).padStart(2, '0')}:${String(nextMinutesAdjusted).padStart(2, '0')}`;
  }
  return slots
};

// Copy to clipboard function for infoDisplayCompoenent
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

// Formating function for boolean value formatBoolean
export const formatBoolean = (val: boolean) => (val ? "Yes" : "No");

export const buildQueryParams = <
T extends object
>(
  params?: T
): string => {
  if (!params) return "";
  const query = new URLSearchParams();

  (Object.entries(params) as [keyof T, T[keyof T]][])
    .forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        query.append(String(key), String(value));
      }
    });

  return query.toString();
};

// Function for returing data from pagination included apis
export const parseNewCommonResponse = <T>(res: ApiPaginatedResponse<T>): ApiPaginatedResponse<T> => {
  return {
    data: res.data,
    totalCount: res.totalCount,
    currentPage: res.currentPage,
    totalPages: res.totalPages,
  };
};

// format duration
export const formatDuration = (minutes?: number) => {
  if (!minutes) return "";

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }

  const hours = minutes / 60;

  if (Number.isInteger(hours)) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  }

  return `${Math.floor(hours)} hours ${minutes % 60} minutes`;
};

// check if the user can join the call
export const checkJoin = (date: Date | string) => {
  const appointmentDate = new Date(date);
  const now = new Date();
  const diff = appointmentDate.getTime() - now.getTime();
  const minutes = Math.floor(diff / 60000);
  return minutes <= 15;
}

