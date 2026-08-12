import { Address } from '../entityInterface/addressInterface';

// response type of user fetch own address apis
export type FetchMyAddressResponse = Pick<
  Address,
  | '_id'
  | 'addressLine'
  | 'landmark'
  | 'phone'
  | 'place'
  | 'city'
  | 'district'
  | 'pincode'
  | 'state'
  | 'country'
  | 'location'
>;

// response type of user fetch other's address apis
export type FetchAddressResponse = Pick<
  Address,
  | 'addressLine'
  | 'phone'
  | 'place'
  | 'city'
  | 'district'
  | 'pincode'
  | 'state'
  | 'country'
  | 'landmark'
  | 'location'
>;

// request type of user creating address api
export type CreateAddressRequest = Pick<
  Address,
  | 'addressLine'
  | 'landmark'
  | 'phone'
  | 'place'
  | 'city'
  | 'district'
  | 'pincode'
  | 'state'
  | 'country'
  | 'location'
>;

// response type of user creating address api
export type UserCreateAddressResponse = Pick<
  Address,
  | '_id'
  | 'addressLine'
  | 'landmark'
  | 'phone'
  | 'place'
  | 'city'
  | 'district'
  | 'pincode'
  | 'state'
  | 'country'
  | 'location'
  | 'updatedAt'
>;

// request type of user updating address api
export type UpdateAddressRequest = Pick<
  Address,
  | '_id'
  | 'addressLine'
  | 'landmark'
  | 'phone'
  | 'place'
  | 'city'
  | 'district'
  | 'pincode'
  | 'state'
  | 'country'
  | 'location'
>;

// response type of user updating address api
export type UpdateAddressResponse = Pick<
  Address,
  | '_id'
  | 'addressLine'
  | 'landmark'
  | 'phone'
  | 'place'
  | 'city'
  | 'district'
  | 'pincode'
  | 'state'
  | 'country'
  | 'location'
  | 'updatedAt'
>;
