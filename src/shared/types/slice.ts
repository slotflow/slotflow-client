import {
  Role,
  PlanName,
  SubscriptionStatus,
  PaymentProcessType,
  PaymentProcessStatus,
  PaymentAccountStatus,
} from './enums';
import { FaqFields, PlanFields, BlogArticle, ReviewFields } from './common';
import { User } from './entity/user';
import { Message } from './entity/message';
import { ProviderProfile } from './entity/providerProfile';
import { Availability } from './entity/serviceAvailability';
import { SubscribePlanCheckoutRequest } from './api/subscription';

// Auth slice state
export type AuthUser = Pick<
  User,
  | 'username'
  | 'profileImage'
  | 'phone'
  | 'email'
  | 'role'
  | 'onboardingStatus'
  | 'onboardingType'
  | 'isBlocked'
  | 'referralCode'
> &
  Pick<
    ProviderProfile,
    | 'isAddressVerified'
    | 'isAdminVerified'
    | 'isAvailabilityVerified'
    | 'isProofsVerified'
    | 'isServiceDetailsVerified'
    | 'verificationRejectionReason'
    | 'adminVerificationStatus'
    | 'hasUsedTrial'
  > & {
    role: Role;
    uid: string;
    timeZone: string;
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
  };

export interface AuthState {
  authUser: AuthUser | null;
  isAuthLoading: boolean;
  eventSocketId: string | null;
  eventSocketIsConnected: boolean;
  subscriptionUpdating: boolean;
  bookingUpdating: boolean;
  profileSetupData: {
    selectedRole: Role | null;
    username: string | null;
  };
}

// app slice
export interface appState {
  lightTheme: boolean;
  isSidebarOpen: boolean;
  isFilterSideBarOpen: boolean;
  forgotPassword: boolean;
  otpExpiresAt: number | null;
  otpTimerIsRunning: boolean;
  isNotificationsOpen: boolean;
  isLiveChatBubbleOpen: boolean;
  boardingSteps: number;
}

// Proof data type for provider slice
export interface SetProofDataProps {
  file: string | null;
  isLoading: boolean;
}

// provider slice
export interface ProviderState {
  availabilities: Availability[] | null;
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
export type SelectedUser = Pick<User, '_id' | 'username' | 'profileImage'>;

// chat slice initial state
export interface chatSliceInitalState {
  onlineUsers: string[] | null;
  lastMessages: LastMessages | null;
  selectedUser: SelectedUser | null;
  socketId: string | null;
  isConnected: boolean;
  messages: Message[] | null;
  isMessagesLoading: boolean;
}

// payment slice initial state
export interface PaymentSlice {
  type: PaymentProcessType | null;
  isPaymentModalOpen: boolean;
  subscriptionData: SubscribePlanCheckoutRequest | null;
  status: PaymentProcessStatus;
}

//
export interface CmsState {
  planData: {
    plans: PlanFields[];
    total: number;
    loading: boolean;
    error: string | null;
  } | null;
  blogData: {
    articles: BlogArticle[];
    articleCategories: string[];
    loadingArticles: boolean;
    loadingCategories: boolean;
    errorArticles: string | null;
    errorCategories: string | null;
  } | null;
  reviewsData: {
    reviews: ReviewFields[];
    total: number;
    loading: boolean;
    error: string | null;
  } | null;
  faqData: {
    faqs: FaqFields[];
    total: number;
    loading: boolean;
    error: string | null;
  } | null;
}

// integration slice data
export interface StripeIntegrationData {
  isConnecting: boolean;
  status: PaymentAccountStatus | null;
}
export interface CommonIntegrationData {
  isConnecting: boolean;
  isConnected: boolean;
}
export interface SetAllIntegrationsPayload {
  googleCalendar?: Partial<CommonIntegrationData>;
  stripe?: Partial<StripeIntegrationData>;
}
export interface IntegrationSliceState {
  googleCalendar: CommonIntegrationData;
  stripe: StripeIntegrationData;
}
