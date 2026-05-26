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
        const stringValue = value instanceof Date ? value.toISOString() : String(value);
        query.append(String(key), stringValue);
      }
    });

  return query.toString();
};