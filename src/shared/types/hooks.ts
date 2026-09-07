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
  CreateServiceRequest,
  UpdateServiceRequest,
  UpdateServiceResponse,
  ChangeServiceBlockStatusRequest,
  ChangeServiceBlockStatusResponse,
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
import { AuthUser } from './slice';
import { User } from './entity/user';
import { Review } from './entity/review';
import { Payment } from './entity/payment';
import { Booking } from './entity/booking';
import { Plan } from './entity/planInterface';
import { ApiBaseResponse, ApiError } from './common';
import { Subscription } from './entity/subscription';
import { Availability } from './entity/serviceAvailability';
import { ToggleReviewBlockStatusRequest } from './api/review';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { HearAboutUsOptionValue, Role, ServiceMode } from './enums';
import { changeAppointmentStatusRequest, ValidateRoomId } from './api/booking';
import { AdminChangeUserStatusRequest, PreBoardingResponse } from './api/user';
import { UseMutateAsyncFunction, UseMutateFunction } from '@tanstack/react-query';

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
    ApiBaseResponse<ChangeServiceBlockStatusResponse>,
    ApiError,
    ChangeServiceBlockStatusRequest
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
  changeUserStatus: (data: AdminChangeUserStatusRequest) => Promise<ApiBaseResponse>;
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
  askPermission: () => Promise<void>;
}

// Signout hook return type interface
export interface useSignoutReturn {
  signoutHandler: () => Promise<ApiBaseResponse>;
}

// Video call lobby hook parameter type interface
export interface useVideoCallLobbyParams {
  roomId: string;
  isCameraOn: boolean;
  isMicOn: boolean;
}

// Video call lobby hook return type interface
export interface useVideoCallLobbyReturn {
  videoCallJoinHandler: () => Promise<{ success: boolean; message: string }>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  toggleCamera: () => void;
  toggleMic: () => void;
}

// Review hook return type interface
export interface useReviewReturn {
  reportReviewHandler: (reviewId: Review['_id']) => Promise<ApiBaseResponse>;
  toggleBlockStatusHandler: (data: ToggleReviewBlockStatusRequest) => Promise<ApiBaseResponse>;
  deleteReviewHandler: (reviewId: Review['_id']) => Promise<ApiBaseResponse>;
}

// Role based navigation hook return type interface
export interface useRoleBasedNavigationReturn {
  handleAdminGetProviderDetailPage: (subscriptionId: Subscription['_id']) => void;
  handleGetPaymentDetailsPage: (paymentId: Payment['_id']) => void;
  JoinCallHandler: (data: ValidateRoomId) => Promise<{ success: boolean; message: string }>;
  handleNavigateToBookingsDetailPage: (appointmentId: Booking['_id']) => void;
  handleNavigateToPlanDetailPage: (planId: Plan['_id']) => void;
  handleGetProviderDetailPage: (providerId: User['_id']) => void;
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
  changeAppointmentStatusHandler: (
    data: changeAppointmentStatusRequest,
  ) => Promise<ApiBaseResponse>;
  cancelBookingHandler: (bookingId: Booking['_id']) => Promise<ApiBaseResponse>;
}

// preboarding hook return interface
export interface UsePreBoardingReturn {
  submitPreBoardingHandler: (
    data: SubmitPreBoardingHandlerProps,
  ) => Promise<ApiBaseResponse<PreBoardingResponse>>;
}

// preboarding hook props
export interface SubmitPreBoardingHandlerProps {
  authUser: AuthUser | null;
  selectedRole: Role;
  selectedOption: HearAboutUsOptionValue;
  referralCode: string | null;
}
