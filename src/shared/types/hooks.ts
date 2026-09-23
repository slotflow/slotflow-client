import {
  CreatePlanRequest,
  UpdatePlanRequest,
  UpdatePlanResponse,
  CreatePlanResponse,
  ResyncPlanStripeRequest,
  ResyncPlanStripeResponse,
  ChangePlanBlockStatusRequest,
  ChangePlanBlockStatusResponse,
} from './api/plan';
import {
  PreBoardingResponse,
  AdminChangeUserBlockStatusRequest,
  AdminChangeUserBlockStatusResponse,
} from './api/user';
import {
  CreateServiceRequest,
  UpdateServiceRequest,
  UpdateServiceResponse,
  AdminChangeServiceBlockStatusRequest,
  AdminChangeServiceBlockStatusResponse,
} from './api/service';
import {
  AdminRejectProviderRequest,
  AdminRejectProviderResponse,
  AdminApproveProviderRequest,
  AdminApproveProviderResponse,
  AdminChangeProviderTrustTagRequest,
  AdminChangeProviderTrustTagResponse,
  AdminChangeProviderBlockStatusRequest,
  AdminChangeProviderBlockStatusResponse,
} from './api/providerProfile';
import { User } from './entity/user';
import { Payment } from './entity/payment';
import { Booking } from './entity/booking';
import { Plan } from './entity/planInterface';
import { ApiBaseResponse, ApiError } from './common';
import { Subscription } from './entity/subscription';
import { Availability } from './entity/serviceAvailability';
import { HearAboutUsOptionValue, Role, ServiceMode } from './enums';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { UseMutateAsyncFunction, UseMutateFunction } from '@tanstack/react-query';
import { SubscribePlanCheckoutResponse, SubscribePlanCheckoutRequest } from './api/subscription';
import { ReportReviewRequest, ReportReviewResponse, ChangeReviewBlockStatusRequest, ChangeReviewBlockStatusResponse, DeleteReviewRequest } from './api/review';
import { BookAppointmentRequest, BookAppointmentResponse, CancelBookingRequest, CancelBookingResponse, ChangeAppointmentStatusRequest, ChangeAppointmentStatusResponse, JoinRoomCallbackRequest, JoinRoomCallbackResponse, ValidateRoomIdRequest } from './api/booking';
import { AuthUser } from './slice';
import { ConnectStripeAccountRequest } from './api/paymentAccount';

// Admin plan hook return type interface
export interface UseAdminPlanReturn {
  createPlan: UseMutateAsyncFunction<
    ApiBaseResponse<CreatePlanResponse>,
    ApiError,
    CreatePlanRequest
  >;

  updatePlan: UseMutateAsyncFunction<
    ApiBaseResponse<UpdatePlanResponse>,
    ApiError,
    UpdatePlanRequest
  >;

  changePlanBlockStatus: UseMutateFunction<
    ApiBaseResponse<ChangePlanBlockStatusResponse>,
    ApiError,
    ChangePlanBlockStatusRequest
  >;
  changeBlockStatusPlanId: string | null | undefined;

  resyncPlanWithStripe: UseMutateFunction<
    ApiBaseResponse<ResyncPlanStripeResponse>,
    ApiError,
    ResyncPlanStripeRequest
  >;
  resyncingPlanId: string | null | undefined;
}

// Admin provider hook return type interface
export interface UseAdminProviderReturn {
  approveProvider: UseMutateFunction<
    ApiBaseResponse<AdminApproveProviderResponse>,
    ApiError,
    AdminApproveProviderRequest
  >;
  approvingProviderId: string | null | undefined;

  changeProviderSlotflowTrustTag: UseMutateFunction<
    ApiBaseResponse<AdminChangeProviderTrustTagResponse>,
    ApiError,
    AdminChangeProviderTrustTagRequest
  >;
  changeTrustTagProviderId: string | null | undefined;

  changeProviderBlockStatus: UseMutateFunction<
    ApiBaseResponse<AdminChangeProviderBlockStatusResponse>,
    ApiError,
    AdminChangeProviderBlockStatusRequest
  >;
  changeBlockStatusProviderId: string | null | undefined;

  rejectProvider: UseMutateAsyncFunction<
    ApiBaseResponse<AdminRejectProviderResponse>,
    ApiError,
    AdminRejectProviderRequest
  >;
  rejectingProviderId: string | null | undefined;
}

// Admin service hook return type interface
export interface UseAdminServiceReturn {
  changeServiceBlockStatus: UseMutateFunction<
    ApiBaseResponse<AdminChangeServiceBlockStatusResponse>,
    ApiError,
    AdminChangeServiceBlockStatusRequest
  >;
  changeBlockStatusServiceId: string | null;

  updateService: UseMutateAsyncFunction<
    ApiBaseResponse<UpdateServiceResponse>,
    ApiError,
    UpdateServiceRequest
  >;
  createService: UseMutateAsyncFunction<ApiBaseResponse, ApiError, CreateServiceRequest>;
}

// Admin user hook return type interface
export interface UseAdminUserReturn {
  changeUserBlockStatus: UseMutateFunction<
    ApiBaseResponse<AdminChangeUserBlockStatusResponse>,
    ApiError,
    AdminChangeUserBlockStatusRequest
  >;
  changeBlockStatusUserId: string | null | undefined;
}

// Is mobile hook return type interface
export interface useIsMobileReturn {
  isMobile: boolean;
}

// Modal animation hook parameter type interface
export interface useModalAnimationProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Modal animation hook return type interface
export interface useModalAnimationReturn {
  modalRef: React.RefObject<HTMLDivElement | null>;
  closeModal: () => void;
}

// Notification permission gate hook return type interface
export interface useNotificationPermissionGateReturn {
  askPermission: () => void;
}

// Signout hook return type interface
export interface useSignoutReturn {
  userSignout: UseMutateFunction<
    ApiBaseResponse,
    ApiError,
    void
  >;
  isSigningOut: boolean;
}

// Video call lobby hook props return type interface
export interface useVideoCallProps {
  initializeMedia: boolean;
}
export interface useVideoCallReturn {
  videoCallJoin: UseMutateFunction<
    ApiBaseResponse<JoinRoomCallbackResponse>,
    ApiError,
    JoinRoomCallbackRequest
  >;
  isJoiningVideoCall: boolean;

  JoinCallLobby: UseMutateFunction<
    ApiBaseResponse,
    ApiError,
    ValidateRoomIdRequest
  >;

  videoRef: React.RefObject<HTMLVideoElement | null>;
  toggleCamera: () => void;
  toggleMic: () => void;
}

// Review hook return type interface
export interface useReviewReturn {
  reportReview: UseMutateFunction<
    ApiBaseResponse<ReportReviewResponse>,
    ApiError,
    ReportReviewRequest
  >;
  isChangingReportStatus: boolean;

  changeReviewBlockStatus: UseMutateFunction<
    ApiBaseResponse<ChangeReviewBlockStatusResponse>,
    ApiError,
    ChangeReviewBlockStatusRequest
  >;
  isChangingBlockStatus: boolean;

  deleteReview: UseMutateFunction<
    ApiBaseResponse,
    ApiError,
    DeleteReviewRequest
  >;
  isDeleting: boolean;
}

// application navigation hook return
export interface useAppNavigationReturn {
  handleAdminGetProviderDetailPage: (subscriptionId: Subscription['_id']) => void;
  handleGetPaymentDetailsPage: (paymentId: Payment['_id']) => void;
  handleNavigateToBookingsDetailPage: (appointmentId: Booking['_id']) => void;
  handleNavigateToPlanDetailPage: (planId: Plan['_id']) => void;
  handleGetProviderDetailPage: (providerId: User['_id']) => void;
  handleGetUserDetailPage: (userId: User['_id']) => void;
  toLogin: () => void;
  toSettings: () => void;
  toDashboard: (replace: boolean) => void;
  toBookings: (replace: boolean) => void;
  toIntegrations: (replace: boolean) => void;
  toUpgrade: (replace: boolean) => void;
  handleAuthLoginNavigation: (user: AuthUser) => void;
}

// useAuth hook return
export interface UseAuthReturn {
    user: AuthUser | null;
    role: Role | null;
    isLoggedIn: boolean;
    isUser: boolean;
    isProvider: boolean;
    isAdmin: boolean;
}

// integrations page hook return
export interface UseIntegrationReturn {
    connectStripe: (data: ConnectStripeAccountRequest) => Promise<void>;
    connectGoogleCalendar: () => void;
}

// subscription callback hook return
export interface useSubscriptionCallback {
  status: boolean;
  subscriptionUpdating: boolean;
}

// booking callback hook return
export interface UseBookingCallbackReturn {
    status: boolean;
}

// Auth Callback page custom hook
export interface UseAuthCallbackReturn {
    stepIndex: number;
    error: string | null;
}

// Add availability hook parameter type interface
export interface UseAddAvailabilityProps {
  getValues: UseFormGetValues<{
    day: string;
    isAvailable: boolean;
    duration?: number;
    startTime?: Date;
    endTime?: Date;
    modes?: string[];
    selectedTimeSlots?: string[];
    timeSlots?: string[];
  }>;
  setValue: UseFormSetValue<{
    selectedTimeSlots?: string[];
    day: string;
    isAvailable: boolean;
    duration?: number;
    startTime?: Date;
    endTime?: Date;
    modes?: string[];
    timeSlots?: string[];
  }>;
}

// Add availability hook return type interface
export interface UseAddAvailabilityReturn {
  handleAddAvailability: () => { success: boolean; message: string; data?: Availability };
  generateTimeSlots: (
    start: Date,
    end: Date,
    intervalMinutes: number,
  ) => { success: boolean; message: string };
  toggleSlot: (slot: string) => void;
  isModeSelected: (mode: string) => boolean;
  toggleMode: (mode: ServiceMode) => void;
}

// User booking hook return type interface
export interface UseBookingCustomHookReturn {
  handleReviewAddFormToggle: (
    e: React.MouseEvent<HTMLDivElement>,
    bookingId: string,
    providerId: string,
  ) => void;

  changeAppointmentStatus: UseMutateFunction<
    ApiBaseResponse<ChangeAppointmentStatusResponse>,
    ApiError,
    ChangeAppointmentStatusRequest
  >;
  statusChangingAppointmentId: string | null;

  cancelBooking: UseMutateFunction<
    ApiBaseResponse<CancelBookingResponse>,
    ApiError,
    CancelBookingRequest
  >;
  isCancelling: boolean;
}

// preboarding hook return interface
export interface UsePreBoardingReturn {
  submitPreBoarding: UseMutateFunction<
    ApiBaseResponse<PreBoardingResponse>,
    ApiError,
    SubmitPreBoardingHandlerProps
  >;
  isPreboardingSubmitting: boolean;
  hearAboutUsHandler: () => void;
}

// preboarding hook props
export interface SubmitPreBoardingHandlerProps {
  selectedOption: HearAboutUsOptionValue | null;
  referralCode: string | null;
}

// subscription hook props
export interface UseSubscriptionHookReturn {
  subscribePlan: UseMutateFunction<
    ApiBaseResponse<SubscribePlanCheckoutResponse>,
    ApiError,
    SubscribePlanCheckoutRequest
  >;
}

// booking payment hook
export interface UseBookingPaymentReturn {
  bookAppointment: UseMutateFunction<
    ApiBaseResponse<BookAppointmentResponse>,
    ApiError,
    BookAppointmentRequest
  >;
}