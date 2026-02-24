import { ApiPaginatedResponse } from "./interface/commonInterface";

// **** Time formating function for otp page **** \\
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

// **** Greeting generation function for header **** \\
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

// **** Provider slot availability generator **** \\
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

// **** Formate date for infoDisplayCompoenent **** \\
export const formatDate = (dateString: string) => {
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

// **** Copy to clipboard function for infoDisplayCompoenent **** \\
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

// **** Formating function for boolean value formatBoolean **** \\
export const formatBoolean = (val: boolean) => (val ? "Yes" : "No");

// **** Function for query builder **** \\
// export const buildQueryParams = <T extends FetchFunctionBaseQueryParams>(params?: T): string => {
//   const query = new URLSearchParams();

//   if (!params) return "";

//   // if ("pagination" in params && params.pagination) {
//   //   query.append("page", params.pagination.page.toString());
//   //   query.append("limit", params.pagination.limit.toString());
//   // }

//     if ("page" in params) {
//     query.append("page", params.page.toString());
//   }

//     if ("limit" in params) {
//     query.append("limit", params.limit.toString());
//   }

//   if ("online" in params && params.online !== undefined) {
//     query.append("online", params.online.toString());
//   }

//   if("role" in params && params.role) {
//     query.append("role", params.role.toString());
//   }

//   if(params.role === Role.USER && params.id) {
//     query.append("userId", params.id);
//   }

//   if(params.role === Role.PROVIDER && params.id) {
//     query.append("providerId", params.id);
//   }

//   if ("id" in params && params.id) {
//     query.append("id", String(params.id));
//   }

//   return query.toString();
// };

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

  console.log("query : ", query.toString());

  return query.toString();
};

export const buildPathParams = <T extends object = {}>(
  params?: T
): string => {
  if (!params) return "";

  const segments = Object.values(params)
    .filter((value) => value !== undefined && value !== null)
    .map((value) => {
      if (typeof value !== "string" && typeof value !== "number") {
        throw new Error("Path params must be string or number");
      }
      return encodeURIComponent(String(value));
    });

    console.log("path : ",segments.length ? `/${segments.join("/")}` : "");
  return segments.length ? `/${segments.join("/")}` : "";
};

// **** Function for returing data from pagination included apis **** \\
export const parseNewCommonResponse = <T>(res: ApiPaginatedResponse<T>): ApiPaginatedResponse<T> => {
  return {
    data: res.data,
    totalCount: res.totalCount,
    currentPage: res.currentPage,
    totalPages: res.totalPages,
  };
};

// **** format duration
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
