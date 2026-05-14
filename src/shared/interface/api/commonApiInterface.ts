import { ProviderProfile } from "../entityInterface/providerProfileInterface";

// request interface of update file
export interface UpdateFileDataRequest {
  s3FileKey: string;
  field: string;
}

// response type admin or provider fetching providers proofs
export type FetchProvidersProofsResponse = Pick<ProviderProfile, "identityProof" | "serviceProof">;

// Chart DTOS
export interface MiniChartData {
  date: string;
  value: number;
}

export interface MiniCardData {
  count: number;
  percentage: number;
  days: number;
  chartData: MiniChartData[];
}