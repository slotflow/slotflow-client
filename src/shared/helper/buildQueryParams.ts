// Build query params function for api calls
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