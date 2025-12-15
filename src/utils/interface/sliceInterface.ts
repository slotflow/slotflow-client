import { RoleType } from "./commonInterface";
import { Plan } from "./entityInterface/planInterface";
import { Provider } from "./entityInterface/providerInterface";
import { ProviderService } from "./entityInterface/providerServiceInterface";
import { Availability } from "./entityInterface/serviceAvailabilityInterface";

// **** Auth slice state
export interface UserData {
  uid?: string;
  username?: string;
  profileImage?: string;
  phone?: string;
  email?: string;
  verificationToken?: string;
  role: RoleType;
  isBlocked?: boolean;
  isLoggedIn?: boolean;
  isAddressAdded?: boolean;
  isServiceDetailsAdded?: boolean;
  isServiceAvailabilityAdded?: boolean;
  isProofSubmitted?: boolean;
  isAdminApproved?: boolean;
  providerSubscription?: Plan["planName"];
  serviceDescription?: ProviderService["serviceDescription"];
  googleId?: string;
  googleConnected?: boolean;
  updatedAt?: string
}

export interface AuthState {
  authUser: UserData | null;
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
}



// **** User slice interface
export interface UserStateVariables {
  selectedServices: string[] | null;
  isReviewCreateFormOpen: boolean;
  selectedBookingId: string | null;
  selectedBookingProviderId: string | null;
}
