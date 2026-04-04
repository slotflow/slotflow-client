import { ApiPaginatedResponse } from "../interface/commonInterface";

// Function for returing data from pagination included apis
export const parseResponse = <T>(res: ApiPaginatedResponse<T>): ApiPaginatedResponse<T> => {
  return {
    data: res.data,
    totalCount: res.totalCount,
    currentPage: res.currentPage,
    totalPages: res.totalPages,
  };
};