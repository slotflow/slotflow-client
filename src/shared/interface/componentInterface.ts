import {
  type Path,
  type FieldValues,
  type UseFormRegister,
  type RegisterOptions,
  FieldError,
  Control,
} from "react-hook-form";
import { PlanName, Role, ServiceMode } from "./enums";
import { LucideIcon } from "lucide-react";
import { PayloadAction } from "@reduxjs/toolkit";
import { ChartConfig } from "@/components/ui/chart";
import { User } from "./entityInterface/userInterface";
import { AdminFetchUserProfileDetailsResponse, UserFetchServiceProvidersResponse, UserFetchUserProfileDetailsResponse } from "./api/user";
import { FetchProvidersProofsResponse, UpdateFileDataRequest } from "./api/commonApiInterface";
import { FetchProviderServiceResponse } from "./api/providerService";
import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { FetchServiceAvailabilityResponse } from "./api/serviceAvailability";
import { FetchPaymentsQueryParams, FetchPaymentsResponse } from "./api/payment";
import { ApiBaseResponse, ApiPaginatedResponse, BaseChartData, CardProps, ChatComponentProps, FetchFunctionBaseQueryParams, OptionType, ProviderSubscriptionDataProps, Route, statsMapIntrface, TabItem, TimeRange, UserBookinAppointmentDataProps } from "./commonInterface";
import { DateRange } from "react-day-picker";
import * as RPNInput from "react-phone-number-input";
import { AppDispatch } from "../redux/appStore";
import { Location } from "@/shared/interface/entityInterface/addressInterface";
import { FetchAddressResponse, FetchMyAddressResponse } from "./api/address";
import { AdminFetchProviderProfileDetailsResponse, ProviderFetchMyProfileDetailsResponse, UserFetchProviderProfileDetailsResponse } from "./api/providerProfile";
import { FetchReviewsResponse, ToggleReviewBlockStatusRequest } from "./api/review";
import { ProviderServiceAvailabilityFormType } from "../zod/providerZod";
import { Availability } from "./entityInterface/serviceAvailabilityInterface";
import { Column, ColumnDef, OnChangeFn, PaginationState } from "@tanstack/react-table";
import { RouteNames } from "../utils/constants";
import { SetProofDataProps } from "./sliceInterface";

// profile head compoenent props interface
export interface ProfileHeaderProps {
  canUpdate: boolean;
  showDetails?: boolean;
  isMyProfile?: boolean;
  selectedUserData?: { selectedUserName: string, selectedUserProfileImage: string | null };
}

// Provider service availabilit component props interface
type FetchApiFunctionUserOrAdminRequestPayloadProps = {
  providerId: User["_id"]
  date: Date
}

// Provider service availability component function type
export type ProviderApiFunctionForPSAComponent = (date: Date) => Promise<ApiBaseResponse<FetchServiceAvailabilityResponse>>;

// User or admin service availability component function type
export type UserOrAdminApiFunctionForPSAcomponent = (payload: FetchApiFunctionUserOrAdminRequestPayloadProps) => Promise<ApiBaseResponse<FetchServiceAvailabilityResponse>>;

// Provider service availability component props interface
export interface ProviderServiceAvailabilityProps {
  providerId?: string
  fetchApiFuntion: ProviderApiFunctionForPSAComponent | UserOrAdminApiFunctionForPSAcomponent;
  queryKey: string;
  role?: Role;
}

// Provider Service details showing component props interface
export interface ProviderServiceDetailsProps {
  providerId?: User["_id"];
  fetchApiFunction: (providerId?: User["_id"]) => Promise<ApiBaseResponse<FetchProviderServiceResponse>>;
  queryKey: string;
  isUser?: boolean;
  shimmerRow?: number;
}

// DateSelect component interface
export interface DateSelectProps {
  onValueChange: (value: TimeRange) => void;
  value: string;
}

// Chart Header component interface
export interface ChartHeaderProps {
  title: string;
  description?: string;
  onValueChange?: (value: TimeRange) => void;
  value?: string;
}

// AreaGroupChart compoenent props type
export type AreaGroupChartProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "dataKeyThree" | "chartConfig" | "isLocked" | "minimumPlan">;


// BarChartHorizontal compoenent props type
export type BarChartHorizontalProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "dataKeyThree" | "chartConfig" | "isLocked" | "minimumPlan">;


// BarChartStacked compoenent props type
export type BarChartStackedProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "dataKeyThree" | "chartConfig" | "isLocked" | "minimumPlan">;


// BarChartVertical compoenent props type
export type BarChartVerticalProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "chartConfig" | "isLocked" | "minimumPlan">;


// ChartLineMultiple compoenent props type
export type ChartLineMultipleProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "chartConfig" | "isLocked" | "minimumPlan">;


// LineChartHorizontal compoenent props type
export type LineChartHorizontalProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "chartConfig" | "isLocked" | "minimumPlan">;

// PieChartCompletionBreakdown compoenent props type
interface CompletionBreakdownData {
  status: string;
  value: number;
}
export interface CompletionChartProps {
  title: string;
  description: string;
  chartData: CompletionBreakdownData[];
  dataKey: string;
  chartConfig: ChartConfig;
  nameKey: string;
  isLocked: boolean;
}

// RadialChart compoenent props type
export type ChartDataItem = Record<string, string | number>;

// RadialChart interface
export interface RadialChartInterface<T extends ChartDataItem> {
  title: string;
  description: string;
  chartData: T[];
  dataKeyOne: keyof T;
  dataKeyTwo: keyof T;
  chartConfig: ChartConfig;
  isLocked: boolean;
  minimumPlan: PlanName;
}

// Admin fetch provider payments compoenent props interface
export interface AdminUserOrProviderPaymentsProps {
  providerId: string;
  fetchFunction: (params: FetchFunctionBaseQueryParams & FetchPaymentsQueryParams) => Promise<ApiPaginatedResponse<FetchPaymentsResponse>>
}

// Admin fetch provider subscriptions component props interface
export interface AdminFetchProviderSubscriptionsProps {
  providerId: User["_id"];
}

// FormField Component Props Interface
export interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  showTogglePassword?: boolean;
  onFileSelect?: (url: string) => void;
  rows?: number;
  defaultValue?: string | number | boolean | string[] | FileList;
  readOnly?: boolean;
  required?: boolean;
  accept?: string;
  labelInfo?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// FileUploader Props Interface
export interface FileUploaderProps {
  folderName: string;
  uploadFunction: (data: UpdateFileDataRequest) => Promise<ApiBaseResponse<string>>;
  message?: string;
  setStateFunction: (data: Partial<SetProofDataProps>) => PayloadAction<Partial<SetProofDataProps>>;
  deleteFunction: () => Promise<ApiBaseResponse>;
  data: SetProofDataProps;
  title: string;
};

// provider cards listing
export type UserViewProviderCardProps = UserFetchServiceProvidersResponse;

// alert compoenent props
export interface AlertProps {
  icon?: LucideIcon;
  heading: string;
  message: string;
}

// confirm delete alert component props
export interface ConfirmDeleteAlertProps {
  message: string;
  reviewId: string;
  deleteReviewHandler: (reviewId: string) => Promise<any>;
  closeToast: () => void;
  errorMessage: string;
  successMessage: string;
}

// Animated heading section props interface
export interface AnimatedHeadingSectionProps {
  title: string;
  animatedWord: string;
  description: string;
}

// Aos animation props interface
export interface AosAnimationProps {
  children: ReactNode | ReactElement;
}

// Feature locked component props interface
export interface FeatureLockedProps {
  icon?: LucideIcon;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonVariant?: "default" | "outline" | "ghost" | "destructive";
}

// Time slot legend component props interface
export interface TimeSlotLegendProps {
  role?: Role;
  showAdvanceNotice?: boolean;
  heading?: string;
  legendItems: {
    label: string;
    description?: string;
    className: string;
  }[];
}

// RoleSelectCard component props interface
export interface RoleSelectCardProps {
  role: Role;
  icon: string;
  title: string;
  description: string;
  selectedRole: Role | null;
  onSelect: (role: Role) => void;
}

// Chart overlay component props interface
export interface ChartOverlayProps {
  stringOne: string;
  chartTitle: string;
}

// Horizontal chart for admin component props interface
export interface HorizontalChartForAdminReactProps {
  chartData: { name: string; value: number }[];
  isLOading: boolean;
}

// Completion chart component props interface
export interface CompletionChartProps {
  title: string;
  description: string;
  chartData: {
    status: string;
    value: number;
  }[];
  dataKey: string;
  chartConfig: ChartConfig;
  nameKey: string;
  isLocked: boolean;
  minimumPlan: PlanName;
}

// Chat bubble profile image component props interface
export interface ChatBubbleProfileImageProps {
  profileImage: User["profileImage"];
}

// Message input component props interface
export interface MessageInputProps {
  setIsTyping(data: boolean): void;
  isTyping: boolean;
  setMessageSenderId: Dispatch<SetStateAction<string | null>>;
}

// Provider dashboard graphs component props interface
export interface ProviderDashboardGraphsProps {
  dateRange: DateRange;
}

// Provider dashboard stats component props interface
export interface ProviderDashboardStatsProps {
  dateRange: DateRange;
}

// Dashboard data card component props interface
export interface DashboardDataCardProps {
  title: string;
  icon: LucideIcon;
  isLoading: boolean;
  isError: boolean;
  onReload: () => void;
  children: React.ReactNode;
  className?: string;
  empty?: boolean;
  emptyMessage?: string;
}

// Dashboard stats component props interface
export interface DashboardStatsProps<T extends Record<string, number>> {
  queryFunction(): Promise<ApiBaseResponse<T>>;
  queryKey: string;
  statsMap: Array<statsMapIntrface<T>>;
  plan?: string;
  shimmerCount: number;
  heading?: string;
  role: string;
  dependencies: DateRange;
}

// Dashboard card one component props interface
export interface DashboardCardOneProps {
  title: string;
  value: number;
  icon: LucideIcon;
  price?: boolean;
  isShow?: boolean;
  trend?: string;
}

// Data fetching error component props interface
export interface dataFetchingError {
  message: string;
  className?: string
}

// Data filter component props interface
export interface DataFilterProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange) => void;
  title?: string;
  description?: string;
}

// Filter comp header props interface
export interface FilterCompHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  Icon: LucideIcon;
}

// Create plan form component props interface
export interface CreatePlanFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

// Create service form component props interface
export interface CreateServiceFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

// Reject provider form component props interface
export interface RejectproviderFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

// Address form component props interface
export interface AddressFormProps {
  isUpdating?: boolean;
  heading?: string;
}

// Provider Service form component props interface
export interface ProviderServiceFormProps {
  isUpdating?: boolean;
  heading?: string;
}

// Provider service availability form component props interface
export interface ProviderServiceAvailabilityFormProps {
  isUpdating?: boolean;
  heading?: string;
}

// Authtication form heading component props interface
export interface AuthFormsHeadingProps {
  title: string;
  description?: string;
}

// Authtication form button component props interface
export interface AuthFormsButtonProps {
  text: string;
  loading: boolean;
  disabled?: boolean;
  title: string;
}

// google button props interface
export interface GoogleButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  className?: string;
}

// phone input props interface
export type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

// select field props interface
export interface SelectFieldProps<T extends FieldValues, K> {
  id: Path<T>;
  label: string;
  options: OptionType<K>[];
  placeholder?: string;
  error?: FieldError | string;
  register: UseFormRegister<T>;
  required?: boolean;
  defaultValue?: string | number | boolean;
}

// tag input props interface
export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

// user info crud props interface
export interface UserInfoCRUDProps {
    onClose: () => void;
    formRef: React.RefObject<HTMLDivElement | null>;
}

// integration card props interface
export interface IntegrationCardProps {
    image: string;
    heading: string;
    description: string;
    connectOnClick: (e: React.MouseEvent<HTMLButtonElement>, dispatch: AppDispatch) => void;
    isConnected: boolean;
    connectingLoading: boolean;
}

// Heading component props interface
export interface HeadingProps {
  heading: string;
  headingDescription: string;
}

// location picker props interface
export interface LocationPickerProps {
  onLocationSelect: (location: Location) => void;
}

// map preview props interface
export interface MapPreviewProps {
    lat: number;
    lon: number;
}

// Footer component props interface
export interface FooterProps {
  className?: string;
}

// InfoHeader component props interface
export interface InfoHeaderProps {
    profileImage?: string;
    username: string;
}

// Nav compoenents interfaces
export interface SideBarProps {
  routes: Route[];
  filteredRoutes?: Route[];
}

// SingleTab component props interface
export interface SingleTabProps {
    icon: React.ElementType;
    text: string;
    sidebarOpen: boolean;
    onClick?: () => void;
    className?: string;
    locked?: boolean;
    active?: boolean;
}

// NotificationCard component props interface
export interface NotificationCardProps {
    title: string;
    body: string;
    isRead: boolean;
    createdAt: Date;
}

// SideBox component props interface
export interface SideBoxProps {
    pageNumber: number;
}

// PaymentSelecion component props interface
export interface PaymentSelecionComponentProps {
    setOpenPayment?: (data: boolean) => void;
    data: UserBookinAppointmentDataProps | ProviderSubscriptionDataProps;
    isAppointmentBooking?: boolean;
    isProviderSubscription?: boolean;
}

// ProviderPlanCard component props interface
export interface ProviderPlanCardProps {
  plan: CardProps;
  isTrial?: boolean;
  dummy?: boolean;
  popular?: boolean;
}

// UserOrProviderAddressDetails component props interface
export interface UserOrProviderAddressDetailsComponentProps {
    userOrProviderId?: string;
    fetchApiFunction: (userOrProviderId?: string) => Promise<
        ApiBaseResponse<FetchMyAddressResponse> | ApiBaseResponse<FetchAddressResponse>
    >;
    queryKey: string;
}

// ProfileHorizontalTabs component props interface
export interface ProfileHorizontalTabsComponentProps {
    isAdmin: boolean;
    tab: number;
    setTab: (index: number) => void;
    tabArray: { tabName: string; admin: boolean; user: boolean }[];
}

// UserOrProviderProfileDetails component props interface
export interface UserOrProviderProfileDetailsComponentProps {
    userOrProviderId?: string;
    fetchApiFunction: (userOrProviderId?: string) => Promise<ApiBaseResponse<
        AdminFetchProviderProfileDetailsResponse |
        ProviderFetchMyProfileDetailsResponse |
        UserFetchProviderProfileDetailsResponse |
        UserFetchUserProfileDetailsResponse |
        AdminFetchUserProfileDetailsResponse>
    >;
    queryKey: string;
    adminLookingProvider?: boolean;
    adminLookingUser?: boolean;
    providerSelf?: boolean;
    userSelf?: boolean;
    userLookingProvider?: boolean;
    setProfileImage?: (image: string) => void;
    shimmerRow: number;
    setSelectedUserData?: (data: { selectedUserName: string; selectedUserProfileImage: string | null }) => void;
}

// ProviderProofs component props interface
export interface ProviderProofsProps {
    providerId: User["_id"];
    fetchApiFunction: (providerId?: string) => Promise<ApiBaseResponse<FetchProvidersProofsResponse>>;
}

// ReviewCard component props interface
export interface ReviewCardProps {
  review: FetchReviewsResponse;
  role: Role;
  handleDeleteReview: (e: React.MouseEvent<HTMLButtonElement>, reviewId: string) => void;
  handleReportReview: (e: React.MouseEvent<HTMLButtonElement>, reviewId: string) => void;
  handleChangeReviewBlockStatus: (e: React.MouseEvent<HTMLButtonElement>, data: ToggleReviewBlockStatusRequest) => void;
}

// ReviewStatus component props interface
export interface ReviewStatusProps {
    status: string;
    icon: LucideIcon;
    isNot?: boolean;
}

// ReviewUserProfile component props interface
export interface ReviewUserProfileProps {
    profileImage: string;
    username: string;
    text: string;
}

// AvailabilityDataSelectionFields component props interface
export interface AvailabilityDataSelectionFieldsProps {
    register: UseFormRegister<ProviderServiceAvailabilityFormType>;
    isModeSelected: (mode: ServiceMode) => boolean;
    toggleMode: (mode: ServiceMode) => void;
}

// CreateServiceAvailabilityFooter component props interface
export interface CreateServiceAvailabilityFooterProps {
    selectedTimeSlots: string[];
    isSubmitting: boolean;
    onAddAvailability: (e: React.MouseEvent<HTMLButtonElement>) => void;
    availabilities: Availability[] | null;
    isValid: boolean;
    isUpdating: boolean;
    isLoading: boolean;
}

// GenerateTimeSlots component props interface
export interface GenerateTimeSlotsProps {
    timeSlots: string[];
    selectedTimeSlots: string[];
    allSlotsSelected: boolean;
    handleAllSlots: (push: boolean) => void;
    toggleSlot: (timeSlot: string) => void;
    control: Control<ProviderServiceAvailabilityFormType>;
}

// TimeField component props interface
export interface TimeFieldProps {
    label: string;
    name: "startTime" | "endTime";
    control: any;
}

// TimeRangeSetter component props interface
export interface TimeRangeSetterProps {
    control: Control<ProviderServiceAvailabilityFormType>;
    isSubmitting: boolean;
    onGenerateSlots: () => void;
}

// Data table component props interface
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterAccessorKeys?: string[];
  pageCount?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pagination?: PaginationState;
}

// Data table column header props interface
export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

// Table header component props interface
export interface TableHeaderProps {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

// Option tabs component props interface
export interface OptionTabsProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  profileTabs: TabItem[];
  authUser: { role?: string };
}

//
export interface ReviewsPageProps {
  isPage?: boolean;
  providerId?: string;
  userId?: string;
}

//
export interface PlanGuardProps {
  routeName: RouteNames;
  children: React.ReactNode;
}

//
export interface ProtectedRouteProps {
  allowedRoles: (Role)[];
  children: React.ReactNode;
}

//
export interface OnbooardingGuardProps { 
  children: 
  React.ReactNode 
}