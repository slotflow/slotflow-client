import { Provider } from "../entityInterface/providerInterface";
import { ApiBaseResponse, ApiPaginatedResponse, FetchFunctionBaseQueryParams } from "../commonInterface";

export type ApiFetchFunction<
  T,
  Q extends object = {}
> = (
  queryParams?: FetchFunctionBaseQueryParams & Q
) => Promise<ApiPaginatedResponse<T>>;



// **** Used as the request interface of update file
export interface UpdateFileDataRequest {
  s3FileKey: string;
  field: string;
}
export interface UpdateFileDataResponse extends ApiBaseResponse {
  data: string;
}


// **** Used as the response type admin or provider fetching providers proofs
export type FetchProvidersProofsResponse = Pick<Provider, "identityProof" | "serviceProof">;