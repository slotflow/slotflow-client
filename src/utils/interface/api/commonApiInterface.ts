import { Booking } from "../entityInterface/bookingInterface";
import { Address } from "../entityInterface/addressInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Availability } from "../entityInterface/serviceAvailabilityInterface";
import { ApiBaseResponse, ApiPaginatedResponse, FetchFunctionBaseQueryParams } from "../commonInterface";

export type ApiFetchFunction<
  T,
  Q extends object = {}
> = (
  queryParams?: FetchFunctionBaseQueryParams & Q
) => Promise<ApiPaginatedResponse<T>>;


// **** AddressUpdating request type and response interface used by user and provider
export type UpdateAddressRequest = Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location">;
export interface UpdateAddressResponse extends ApiBaseResponse {
  data: Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location" | "updatedAt">;
}






// **** Used as the request interface for the join room callback api


// **** Used as the response type of the admin fetch provider or user address api
export type AdminFetchddressResponse = Pick<Address, "userId" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "landMark" | "location">;




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