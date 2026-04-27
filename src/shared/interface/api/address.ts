import { Address } from "../entityInterface/addressInterface";

// response type of user fetch own address apis
export type FetchMyAddressResponse = Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location">;

// response type of user fetch other's address apis
export type FetchAddressResponse = Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "landMark" | "location">;

// request type of user creating address api
export type CreateAddressRequest = Pick<Address, "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location">;

// response type of user creating address api
export type UserCreateAddressResponse = Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location" | "updatedAt">;

// request type of user updating address api
export type UpdateAddressRequest = Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location">;

// response type of user updating address api
export type UpdateAddressResponse = Pick<Address, "_id" | "addressLine" | "landMark" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "location" | "updatedAt">;
