import {
  Role,
  PlanName,
  BillingCycle,
  ServiceCategory,
  SubscriptionStatus,
  PaymentProcessType,
  PaymentProcessStatus,
  HearAboutUsOptionValue,
} from './enums';
import {
  FaqFields,
  BlogArticle,
  ReviewFields,
  NotificationType,
  NotificationChannel,
  ProviderCardsFilters,
  PlanFields,
} from './common';
import { User } from './entity/user';
import { Message } from './entity/message';
import { UserViewProviderCardProps } from './component';
import { ProviderProfile } from './entity/providerProfile';
import { Availability } from './entity/serviceAvailability';

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
  | 'googleConnected'
  | 'stripeAccountStatus'
  | 'stripeCustomerId'
  | 'allowPushNotification'
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
  > & {
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
  };

export interface AuthState {
  authUser: AuthUser | null;
  isAuthLoading: boolean;
  eventSocketId: string | null;
  eventSocketIsConnected: boolean;
  subscriptionUpdating: boolean;
  preboardingData: {
    selectedRole: Role | null;
    hearAboutUsOption: HearAboutUsOptionValue | null;
    referralCode: string | null;
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

// admin slice
export interface AdminState {
  rejectProviderId: string | null;
  isProviderRejectModalOpen: boolean;
}

export interface SetProviderRejectModalType {
  modalState: boolean;
  providerId: User['_id'] | null;
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
  isShowPreview: boolean;
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
export type SelectedUser = Pick<User, '_id' | 'username' | 'profileImage'>;

// chat slice initial state
export interface chatSliceInitalState {
  onlineUsers: string[] | null;
  lastMessages: LastMessages;
  selectedUser: SelectedUser | null;
  socketId: string | null;
  isConnected: boolean;
  messages: Message[] | null;
  isMessagesLoading: boolean;
}

// payment slice initial state
export interface PaymentSlice {
  type: PaymentProcessType;
  isOpen: boolean;
  bookingData: {
    providerId: string;
    slotId: string;
    slot: string;
    date: Date;
    selectedServiceMode: string;
  } | null;
  subscriptionData: {
    planId: string;
    billingCycle: BillingCycle;
    isTrialPlan: boolean;
  } | null;
  status: PaymentProcessStatus;
}

//
export interface NotificationPreference {
  channel: NotificationChannel;
  preferences: Partial<Record<NotificationType, boolean>>;
}

//
export interface NotificationSlice {
  preferences: NotificationPreference[];
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
