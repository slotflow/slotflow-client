import { User } from "./entityInterface/userInterface";
import { ProviderCardsFilters } from "./commonInterface";
import { Message } from "./entityInterface/message.interface";
import { UserViewProviderCardProps } from "./componentInterface";
import { ProviderProfile } from "./entityInterface/providerProfileInterface";
import { Availability } from "./entityInterface/serviceAvailabilityInterface";
import { HearAboutUsOptionValue, PlanName, Role, ServiceCategory, SubscriptionStatus } from "./enums";

// Auth slice state
export type AuthUser = Pick<User, 
"username" | 
"profileImage" | 
"phone" | 
"email" | 
"role" | 
"onboardingStatus" | 
"onboardingType" | 
"isBlocked" | 
"googleConnected" | 
"googleId" | 
"stripeAccountId" | 
"stripeConnected" | 
"stripeCustomerId" | 
"allowPushNotification"> & 
Pick<ProviderProfile, 
"isAddressVerified" | 
"isAdminVerified" | 
"isAvailabilityVerified" | 
"isProofsVerified" | 
"isServiceDetailsVerified" | 
"verificationRejectionReason" | 
"adminVerificationStatus"> & {
  uid: string;
  isLoggedIn?: boolean;
  isAddressAdded?: boolean;
  isServiceDetailsAdded?: boolean;
  isServiceAvailabilityAdded?: boolean;
  isProofSubmitted?: {
    identityProof: boolean;
    serviceProof: boolean;
  };
  isAdminVerified?: boolean; 
  providerSubscription?: PlanName;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  subscriptionStatus?: SubscriptionStatus;
  serviceDescription?: string;
  token?: string;
}

export interface AuthState {
  authUser: AuthUser | null;
  isAuthLoading: boolean;
  profileImageUpdating: boolean;
  eventSocketId: string | null;
  eventSocketIsConnected: boolean;
  subscriptionUpdating: boolean;
  boardingData: {
    selectedRole: Role | null;
    hearAboutUsOption: HearAboutUsOptionValue | null;
    referralCode: string | null;
  }
}

// app slice
export interface appState {
  lightTheme: boolean;
  sidebarOpen: boolean;
  filterSideBarOpen: boolean;
  forgotPassword: boolean;
  otpExpiresAt: number | null;
  otpTimerIsRunning: boolean;
  isNotificationsOpen: boolean;
}

// admin slice
export interface AdminState {
  rejectProviderId: string | null;
  isProviderRejectModalOpen: boolean;
}

export interface SetProviderRejectModalType {
  modalState: boolean,
  providerId: User["_id"] | null,
}

// Proof data type for provider slice
export interface SetProofDataProps {
  file: string | null;
  isLoading: boolean;
}

// provider slice
export interface ProviderState {
  availabilities: Availability[] | null;
  planId: string | null;
  planDuration: number | null;
  paymentSelectionOpen: boolean;
  isTrialPlan: boolean;
  paymentPageOpen: boolean;
  identityProof: SetProofDataProps;
  serviceProof: SetProofDataProps;
}

export interface SetProofDataProps {
  file: string | null;
  isLoading: boolean;
}

// user slice
export interface UserStateVariables {
  isReviewCreateFormOpen: boolean;
  selectedBookingId: string | null;
  selectedBookingProviderId: string | null;
  providers: Array<UserViewProviderCardProps> | null;
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

// selected user for chat
export type SelectedUser = Pick<User, "_id" | "username" | "profileImage">;

// chat slice initial state
export interface chatSliceInitalState {
  onlineUsers: string[] | null;
  lastMessages: LastMessages,
  selectedUser: SelectedUser | null,
  socketId: string | null;
  isConnected: boolean;
  messages: Message[] | null;
  isMessagesLoading: boolean;
}