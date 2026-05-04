import { ProviderProfile } from "../entityInterface/providerProfileInterface";

// request interface of update file
export interface UpdateFileDataRequest {
  s3FileKey: string;
  field: string;
}

// response type admin or provider fetching providers proofs
export type FetchProvidersProofsResponse = Pick<ProviderProfile, "identityProof" | "serviceProof">;