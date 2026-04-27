import { AdminRejectProviderModalState, ApiBaseResponse } from "./commonInterface";
import { ChangePlanBlockStatusRequest } from "./api/plan";
import { User } from "./entityInterface/userInterface";
import { AdminChangeProviderBlockStatusRequest, AdminChangeProviderTrustTagRequest } from "./api/providerProfile";
import { ChangeServiceBlockStatusRequest } from "./api/service";
import { AdminChangeUserStatusRequest } from "./api/user";
import { Review } from "./entityInterface/reviewInterface";
import { ToggleReviewBlockStatusRequest } from "./api/review";
import { Payment } from "./entityInterface/paymentInterface";
import { changeAppointmentStatusRequest, ValidateRoomId } from "./api/booking";
import { Booking } from "./entityInterface/bookingInterface";
import { Subscription } from "./entityInterface/subscriptionInterface";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Availability } from "./entityInterface/serviceAvailabilityInterface";
import { ServiceMode } from "./enums";

// Admin plan hook return type interface
export interface UseAdminPlanReturn {
    changePlanStatus: (data: ChangePlanBlockStatusRequest) => Promise<ApiBaseResponse>;
}

// Admin provider hook return type interface
export interface UseAdminProviderReturn {
  approveProviderHandler: (providerId: User["_id"]) => Promise<ApiBaseResponse>;
  changeProviderBlockStatusHandler: (data: AdminChangeProviderBlockStatusRequest) => Promise<ApiBaseResponse>;
  changeProviderSlotflowTrustTag: (data: AdminChangeProviderTrustTagRequest) => Promise<ApiBaseResponse>;
  handleProviderRejectModal: (data: AdminRejectProviderModalState) => void;
}

// Admin service hook return type interface
export interface UseAdminServiceReturn {
  changeServiceStatus: (data: ChangeServiceBlockStatusRequest) => Promise<ApiBaseResponse>;
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
export interface useModalAnimationParams {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void
}

// Modal animation hook return type interface
export interface useModalAnimationReturn {
  modalRef: React.RefObject<HTMLDivElement | null>
  closeModal: () => void
}

// Notification permission gate hook return type interface
export interface useNotificationPermissionGateReturn {
  askPermission: () => Promise<void>
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
    reportReviewHandler: (reviewId: Review["_id"]) => Promise<ApiBaseResponse>;
    toggleBlockStatusHandler: (data: ToggleReviewBlockStatusRequest) => Promise<ApiBaseResponse>;
    deleteReviewHandler: (reviewId: Review["_id"]) => Promise<ApiBaseResponse>;
}

// Role based navigation hook return type interface
export interface useRoleBasedNavigationReturn {
    handleAdminGetProviderDetailPage: (subscriptionId: Subscription["_id"]) => void;
    handleGetPaymentDetailsPage: (paymentId: Payment["_id"]) => void;
    JoinCallHandler: (data: ValidateRoomId) => Promise<{ success: boolean; message: string }>;
    handleNavigateToBookingsDetailPage: (appointmentId: Booking["_id"]) => void;
}

// Add availability hook parameter type interface
export interface UseAddAvailabilityParams {
    getValues: UseFormGetValues<{
        day: string;
        duration: number;
        startTime: Date;
        endTime: Date;
        modes: string[];
        selectedTimeSlots: string[];
        timeSlots: string[];
    }>,
    setValue: UseFormSetValue<{
        selectedTimeSlots: string[];
        day: string;
        duration: number;
        startTime: Date;
        endTime: Date;
        modes: string[];
        timeSlots: string[];
    }>,
}

// Add availability hook return type interface
export interface UseAddAvailabilityReturn {
    handleAddAvailability: () => { success: boolean; message: string, data?: Availability };
    generateTimeSlots: (start: Date, end: Date, intervalMinutes: number) => { success: boolean; message: string };
    toggleSlot: (slot: string) => void;
    isModeSelected: (mode: string) => boolean;
    toggleMode: (mode: ServiceMode) => void;
}

// User booking hook return type interface
export interface UseBookingCustomHookReturn {
    handleReviewAddFormToggle: (e: React.MouseEvent<HTMLDivElement>, bookingId: string, providerId: string) => void;
    changeAppointmentStatusHandler: (data: changeAppointmentStatusRequest) => Promise<ApiBaseResponse>;
    cancelBookingHandler: (bookingId: Booking["_id"]) => Promise<ApiBaseResponse>;
}