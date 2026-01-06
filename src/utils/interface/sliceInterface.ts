import { Provider } from "./entityInterface/providerInterface";
import { AdminVerificationStatus, PlanName, Role, ServiceCategory } from "./enums";
import { Availability } from "./entityInterface/serviceAvailabilityInterface";
import { UserViewProviderCardComponentProps } from "./componentInterface/commonComponentInterface";

// **** Auth slice state
export interface AuthUser {
  uid?: string;
  username?: string;
  profileImage?: string;
  phone?: string;
  email?: string;
  verificationToken?: string;
  role: Role;
  isBlocked?: boolean;
  isLoggedIn?: boolean;
  isAddressAdded?: boolean;
  isServiceDetailsAdded?: boolean;
  isServiceAvailabilityAdded?: boolean;
  isProofSubmitted?: boolean;
  isAdminVerified?: boolean;
  verificationRejectionReason?: string;

  adminVerificationStatus?: AdminVerificationStatus,
  isAddressVerified?: boolean,
  isServiceDetailsVerified?: boolean,
  isAvailabilityVerified?: boolean,
  isProofsVerified?: boolean,

  providerSubscription?: PlanName;
  serviceDescription?: string;
  googleId?: string;
  googleConnected?: boolean;
}

export interface AuthState {
  authUser: AuthUser | null;
  profileImageUpdating: boolean;
  dataUpdating: boolean; // used for the data update loading state in provider add address, provider add service availability, provider add service details, profile info updating
}


// **** App state slice
export interface appState {
  lightTheme: boolean;
  sidebarOpen: boolean;
  filterSideBarOpen: boolean;
  authModal: boolean;
  forgotPassword: boolean;
  otpRemainingTime: number;
  otpTimerIsRunning: boolean;
}


// **** Admin slice
export interface AdminState {
  rejectProviderId: string | null;
  isProviderRejectModalOpen: boolean;
}

export interface SetProviderRejectModalType {
  modalState: boolean,
  providerId: Provider["_id"] | null,
}



// **** Provider slice interfaces
export interface ProviderState {
  availabilities: Availability[] | null;
  planId: string | null;
  planDuration: string | null;
  paymentSelectionOpen: boolean;
  isTrialPlan: boolean;
  paymentPageOpen: boolean;
  identityProof: string | null;
  serviceProof: string | null;
  identityProofLoading: boolean;
  serviceProofLoading: boolean;
}



// **** User slice interface
export interface UserStateVariables {
  isReviewCreateFormOpen: boolean;
  selectedBookingId: string | null;
  selectedBookingProviderId: string | null;
  providers: Array<UserViewProviderCardComponentProps> | null;
  selectedCategories: ServiceCategory[];
}
