import { Provider } from "./entityInterface/providerInterface";
import { AdminVerificationStatus, PlanName, Role, ServiceCategory, SubscriptionStatus } from "./enums";
import { Availability } from "./entityInterface/serviceAvailabilityInterface";
import { UserViewProviderCardComponentProps } from "./componentInterface/commonComponentInterface";
import { ProviderCardsFilters } from "./commonInterface";
import { Message } from "./entityInterface/message.interface";

// Auth slice state
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
  verificationRejectionReason?: string | null;

  adminVerificationStatus?: AdminVerificationStatus,
  isAddressVerified?: boolean,
  isServiceDetailsVerified?: boolean,
  isAvailabilityVerified?: boolean,
  isProofsVerified?: boolean,

  providerSubscription?: PlanName;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  subscriptionStatus?: SubscriptionStatus;

  serviceDescription?: string;

  googleId?: string;
  googleConnected?: boolean;
  
  stripeAccountId?: string;
  stripeConnected?: boolean;

  allowPushNotification?: boolean | null;
  token?: string;
}

export interface AuthState {
  authUser: AuthUser | null;
  profileImageUpdating: boolean;
  dataUpdating: boolean; // used for the data update loading state in provider add address, provider add service availability, provider add service details, profile info updating
  eventSocketId: string | null,
  eventSocketIsConnected: boolean,
  subscriptionUpdating: boolean;
}


// app slice
export interface appState {
  lightTheme: boolean;
  sidebarOpen: boolean;
  filterSideBarOpen: boolean;
  authModal: boolean;
  forgotPassword: boolean;
  otpRemainingTime: number;
  otpTimerIsRunning: boolean;
}


// admin slice
export interface AdminState {
  rejectProviderId: string | null;
  isProviderRejectModalOpen: boolean;
}

export interface SetProviderRejectModalType {
  modalState: boolean,
  providerId: Provider["_id"] | null,
}



// provider slice
export interface ProviderState {
  availabilities: Availability[] | null;
  planId: string | null;
  planDuration: number | null;
  paymentSelectionOpen: boolean;
  isTrialPlan: boolean;
  paymentPageOpen: boolean;
  identityProof: string | null;
  serviceProof: string | null;
  identityProofLoading: boolean;
  serviceProofLoading: boolean;
}



// user slice
export interface UserStateVariables {
  isReviewCreateFormOpen: boolean;
  selectedBookingId: string | null;
  selectedBookingProviderId: string | null;
  providers: Array<UserViewProviderCardComponentProps> | null;
  selectedCategories: ServiceCategory[];
  providerCardsfFlter: ProviderCardsFilters;
}



// chat slice
type LastMessages = Record<
    string,
    {
        message: string;
        date: string;
    }
>;

export interface SelectedUser {
    _id: string;
    username: string;
    profileImage: string;
}


export interface chatSliceInitalState {
    onlineUsers: string[] | null;
    lastMessages: LastMessages,
    selectedUser: SelectedUser | null,
    socketId: string | null;
    isConnected: boolean;
    messages: Message[] | null;
    isMessagesLoading: boolean;
}