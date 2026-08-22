import { User } from '../entity/user';
import { Availability, AvailabilityForResponse } from '../entity/serviceAvailability';

// request type of admin fetch provider service availability api
export type FetchServiceAvailabilityRequest = {
  providerId: string;
  date: Date;
};

// response type of the admin fetch provider service availability api
export type FetchServiceAvailabilityResponse = AvailabilityForResponse;

// request type of the create service availability api
export interface CreateServiceAvailabilitiesRequest {
  data: Availability[];
}

// request type of the fetch engaged slots api
export interface FetchEngagedSlotsRequest {
  providerId: User['_id'];
  date: Date;
}

// response type of the fetch engaged slots api
export type FetchEngagedSlotsResponse = string[];
