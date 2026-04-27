import { ProviderProfile } from "../entityInterface/providerProfileInterface";
import { ApiPaginatedResponse, FetchFunctionBaseQueryParams } from "../commonInterface";

// response type of fetch functions
export type ApiFetchFunction<
  T,
  Q extends object = {}
> = (
  queryParams?: FetchFunctionBaseQueryParams & Q
) => Promise<ApiPaginatedResponse<T>>;

// request interface of update file
export interface UpdateFileDataRequest {
  s3FileKey: string;
  field: string;
}

// response type admin or provider fetching providers proofs
export type FetchProvidersProofsResponse = Pick<ProviderProfile, "identityProof" | "serviceProof">;