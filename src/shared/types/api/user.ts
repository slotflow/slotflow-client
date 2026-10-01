import { User } from '../entity/user';
import { ProviderCardsFilters } from '../common';
import { ProviderProfile } from '../entity/providerProfile';
import { HearAboutUsOptionValue, Role, PaymentAccountStatus } from '../enums';

// request type for the user profile setup api
export type ProfileSetupRequest = {
  role: Role;
  username: string;
  whereDidHearAboutUs: HearAboutUsOptionValue;
  referralCode?: string;
};

// response type of the setRole api
export type PreBoardingResponse = Pick<User, 'onboardingStatus' | 'onboardingType'> & {
  adminVerificationStatus: ProviderProfile['adminVerificationStatus'] | null;
};

// response type of the user profile details fetching api
export type UserFetchMyProfileDetailsResponse = Pick<
  User,
  'username' | 'email' | 'isBlocked' | 'phone' | 'createdAt' | 'updatedAt' | 'referralCode'
>;

// request type of the user profile image updating api
export interface UserUpdateProfileImageRequest {
  s3FileKey: string;
}
// response type of the user profile image updating api
export type UserUpdateProfileImageResponse = User['profileImage'];

// request type of the user update userInfo api
export type UserUpdateUserInfoRequest = Pick<User, 'username' | 'phone'>;
// response type of the user update userInfo api
export type UserUpdateUserInfoResponse = UserUpdateUserInfoRequest;

// request type of the user fetching service providers for the dashboard fetching api
export type UserFetchServiceProvidersRequest = Partial<ProviderCardsFilters> & {
  skip: number;
  limit: number;
};
// response type of the user fetching service providers for the dashboard fetching api
export interface UserFetchServiceProvidersResponse {
  _id: string;
  provider: {
    _id: string;
    username: string;
    profileImage: string | null;
    trustedBySlotflow: boolean;
  };
  serviceDetails: {
    serviceId: string;
    service: string;
    serviceCategory: string;
    serviceName: string;
    servicePrice: number;
  };
}

// response type of the fetchUsers api
export type AdminfetchAllUsersResponse = Pick<User, '_id' | 'username' | 'email' | 'isBlocked'>;

// request type of the changeUserBlockStatus api
export type AdminChangeUserBlockStatusRequest = {
  userId: User['_id'];
} & Pick<User, 'isBlocked'>;
export type AdminChangeUserBlockStatusResponse = Pick<User, '_id' | 'isBlocked'>;

// response type of admin fetch user profile details
export type AdminFetchUserProfileDetailsResponse = Pick<
  User,
  'username' | 'phone' | 'profileImage' | 'isBlocked' | 'email' | 'createdAt'
>;

// return type for the provider fetch users for the chat side bar
export type FetchUsersForChatSidebarResponse = Array<
  Pick<User, '_id' | 'username' | 'profileImage'>
>;

// request type of user update password
export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// stripe account status updated
export interface StripeAccountStatusUpdatedPayload {
  userId: string;
  stripeAccountStatus: PaymentAccountStatus;
}