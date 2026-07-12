import {
  Control,
  type Path,
  FieldError,
  type FieldValues,
  type UseFormRegister,
  type RegisterOptions,
} from "react-hook-form";
import { LucideIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { RouteNames } from "../utils/constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { ChartConfig } from "@/components/ui/chart";
import * as RPNInput from "react-phone-number-input";
import { SetProofDataProps } from "./sliceInterface";
import { PlanName, Role, ServiceMode } from "./enums";
import { User } from "./entityInterface/userInterface";
import { Plan } from "./entityInterface/planInterface";
import { FetchProviderServiceResponse } from "./api/providerService";
import { ProviderServiceAvailabilityFormType } from "../zod/providerZod";
import { FetchAddressResponse, FetchMyAddressResponse } from "./api/address";
import { Availability } from "./entityInterface/serviceAvailabilityInterface";
import { Location } from "@/shared/interface/entityInterface/addressInterface";
import { FetchPaymentsQueryParams, FetchPaymentsResponse } from "./api/payment";
import { FetchReviewsResponse, ToggleReviewBlockStatusRequest } from "./api/review";
import { Column, ColumnDef, OnChangeFn, PaginationState } from "@tanstack/react-table";
import { FetchProvidersProofsResponse, UpdateFileDataRequest } from "./api/commonApiInterface";
import { AdminFetchUserProfileDetailsResponse, UserFetchServiceProvidersResponse, UserFetchMyProfileDetailsResponse } from "./api/user";
import { AdminFetchProviderProfileDetailsResponse, ProviderFetchMyProfileDetailsResponse, UserFetchProviderProfileDetailsResponse } from "./api/providerProfile";
import { ApiBaseResponse, ApiPaginatedResponse, BaseChartData, BlogArticle, BlogAuthorFields, ChatComponentProps, FaqFields, FetchFunctionBaseQueryParams, OptionType, Route, statsMapIntrface, TabItem, TimeRange } from "./commonInterface";

// Provider service availability component props interface
export interface ProviderServiceAvailabilityProps {
  role: Role;
  providerId?: string
  canUpdate?: boolean;
}

// Provider Service list and details showing component props interface
export interface ProviderServiceListProps {
  providerId?: User["_id"];
  fetchApiFunction: (providerId?: User["_id"]) => Promise<ApiBaseResponse<FetchProviderServiceResponse>>;
  queryKey: string;
  canUpdate?: boolean;
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
  showDatePicker?: boolean;
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

// ChartLineLinear compoenent props type
export type ChartLineLinearProps = Pick<ChatComponentProps<BaseChartData>, "chartData" | "dataKeyOne" | "chartConfig"> & Partial<Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "footerTextOne" | "footerTextTwo" | "chartContainerClassName" | "dataKeyTwo" | "dataKeyThree" | "dataKeyFour">>;

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
export interface ConfirmDeleteProps {
  message: string;
  entityId: string;
  deleteHandler: (entityId: string) => Promise<any>;
  closeToast: () => void;
  errorMessage: string;
  successMessage: string;
  btnTitle: string;
  btnText: string;
}

// Feature locked component props interface
export interface FeatureLockedProps {
  icon?: LucideIcon;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

// Time slot legend component props interface
export interface TimeSlotLegendProps {
  role?: Role;
  showAdvanceNotice?: boolean;
  date?: Date;
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
export interface UpdateUserInfoFormProps {
  onClose: () => void;
}

// integration card props interface
export interface IntegrationCardProps {
  image: string;
  heading: string;
  description: string;
  action: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  text: string;
  show: boolean;
  connectionStatus: boolean;
  connectionText: string;
  isLoading: boolean;
}

// Heading component props interface
export interface SectionHeadingProps {
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

// ProviderPlanCard component props interface
export interface ProviderPlanCardProps {
  plan: Pick<Plan, "_id" | "planName" | "description" | "features"> & {
    monthlyPrice: number;
    yearlyPrice: number;
  };
  isTrial?: boolean;
  dummy?: boolean;
  popular?: boolean;
  billingCycle: "monthly" | "yearly";
}

// UserOrProviderAddressDetails component props interface
export interface UserOrProviderAddressDetailsComponentProps {
  userOrProviderId?: string;
  fetchApiFunction: (userOrProviderId?: string) => Promise<
    ApiBaseResponse<FetchMyAddressResponse> | ApiBaseResponse<FetchAddressResponse>
  >;
  queryKey: string;
  isUserLookingProvider?: boolean;
  canUpdate?: boolean;
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
    UserFetchMyProfileDetailsResponse |
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
  providerId?: User["_id"];
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
  isAvailable: boolean;
}

// CreateServiceAvailabilityFooter component props interface
export interface CreateServiceAvailabilityFooterProps {
  selectedTimeSlots?: string[];
  isSubmitting: boolean;
  onAddAvailability: (e: React.MouseEvent<HTMLButtonElement>) => void;
  availabilities: Availability[] | null;
  isValid: boolean;
  isUpdating: boolean;
  isLoading: boolean;
  isAvailable: boolean;
}

// GenerateTimeSlots component props interface
export interface GenerateTimeSlotsProps {
  timeSlots?: string[];
  selectedTimeSlots?: string[];
  allSlotsSelected?: boolean;
  handleAllSlots: (push: boolean) => void;
  toggleSlot: (timeSlot: string) => void;
  control: Control<ProviderServiceAvailabilityFormType>;
  isAvailable: boolean;
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

// ReviewsPage props
export interface ReviewsPageProps {
  isPage?: boolean;
  providerId?: string;
  userId?: string;
}

// PlanGuard props
export interface PlanGuardProps {
  routeName: RouteNames;
  children: React.ReactNode;
}

// Protected Routes props
export interface ProtectedRouteProps {
  allowedRoles: (Role)[];
  children: React.ReactNode;
}

// Onboarding Guard props
export interface OnbooardingGuardProps {
  children:
  React.ReactNode
}

// TOC heading props
export interface TOCHeadingProps {
  title: string;
  id: string;
  depth: number;
  children?: TOCHeadingProps[];
}

// DataFields component props interface
export interface DataFieldProps {
  defaultValue?: string;
  label: string;
  value: string | boolean | number | string[] | Date | React.ReactElement | undefined | null;
  Icon?: LucideIcon;
  canCopy?: boolean;
  link?: boolean;
  isBoolean?: boolean;
  isPrice?: boolean;
  isRadioGroup?: boolean;
  isTime?: boolean;
  isDate?: boolean;
  selectedRadioValue?: string | null;
  onRadioChange?: (value: string) => void;
  tags?: boolean;
  isImage?: boolean;
}

// Animated counter props
export interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    separator?: boolean;
    className?: string;
    text: string;
}

// Floating ( animating wrapper compoenent ) props
export interface FloatingProps {
    children: React.ReactNode;
    className: string;
}

// MoveUpward ( animating wrapper compoenent ) props
export interface MoveUpwardProps {
    children: React.ReactNode;
}

// SplitTextReveal component props
export interface SplitTextRevealProps {
    children: React.ReactNode;
    as?: React.ElementType;
    className?: string;
    split?: "lines" | "words" | "chars" | "chars,words,lines";
    duration?: number;
    stagger?: number;
    delay?: number;
    rotationX?: number;
    y?: number;
    once?: boolean;
}

// Icon text props
export interface IconTextProps {
  text: string;
  className?: string;
};

// Blog detail article props
export interface BlogDetailArticleProps {
    article: BlogArticle;
}

// Blog details hero props
export interface BlogDetailHeroProps {
    heroBackground: string;
    category: string | null;
    title: string;
    description: string;
    author: BlogAuthorFields | null;
    createdAt: string;
    readTime: string;
}

// Blog detail prev or next article props
export interface BlogDetailPrevOrNextArticleProps {
    prevArticle: BlogArticle | null;
    nextArticle: BlogArticle | null;
}

// Blog detail related article props
export interface BlogDetailRelatedArticlesProps {
    relatedArticles: BlogArticle[];
}

// Blog editors pic props
export interface BlogEditorsPicksProps {
    handPickedArticles: BlogArticle[];
}

// Blog featured articles props
export interface BlogFeaturedArticlesProps {
    featuredArticles: BlogArticle[];
}

// Blog hero props
export interface BlogHeroProps {
    categories: string[];
    articlesCount: number;
    categoriesCount: number;
    featuredArticle?: BlogArticle | null;
}

// Blog latest insights props
export interface BlogLatestInsightsProps {
    articles: BlogArticle[];
}

// Page header props
export interface PageHeaderProps {
    title: string;
    description?: string;
    actionLabel?: string;
    onActionClick?: () => void;
}

// Stats card props
export interface StatCardProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  error?: any;
  data: number | boolean;
  Icon: LucideIcon;
  percentage?: number;
  days?: number;
  chartData?: {
  date: string;
  value: number;
}[];
  bgColour?: string;
  main?: boolean;
}

// Credit card props
export interface CreditCardPorps {
    title: string;
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: number | boolean | React.ReactNode;
    Icon: LucideIcon
    bgColour?: string;
    main?: boolean;
}

// Update password form props
export interface UpdatePasswordFormProps {
    onClose: () => void;
}

// Availability fetching error props
export interface AvailablityFetchingErrorProps {
    isAvailable: boolean;
}

// No data props
export interface NoDataProps {
    message: string
 }

 // Feature Card props ( feature section in landing page )
 export interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

// Provider Card props ( hero section in landing page )
export interface ProviderCardProps {
  name: string;
  category: string;
  rating: string;
  location: string;
  time: string;
}

// Integration Card props ( integrations section in landing page )
export interface IntegrationSectionCardProps {
  title: string;
  description: string;
  logo: string;
}

// WorkflowStep props
export interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  active?: boolean;
}

// WorkflowTimeline props
export interface WorkflowTimelineProps {
    activeStep: number;
}

// Attachment Card props
export interface AttachmentCardProps {
    isLoading?: boolean;
    isError?: boolean;
    data?: {
        demoVideoUrl?: string;
        portfolioUrl?: string;
    }
}

// Book Appointment Card props
export interface BookAppointmentCardProps {
    isLoading?: boolean;
    isError?: boolean;
    data?: number;
}

// Experience Card props
export interface ExperienceCardProps {
    isLoading?: boolean;
    isError?: boolean;
    data?: {
        experienceYears?: number;
        description?: string;
    };
}

// Provider Profile Top Card props
export interface ProviderProfileTopCardProps {
    isLoading?: boolean;
    isError?: boolean;
    name: string;
    image: string;
    categoryName: string;
    trusted: boolean;
    role: Role;
}

// Requirements Card props
export interface RequirementsCardProps {
    isLoading?: boolean;
    isError?: boolean;
    data?: string[];
}

// Service Card props
export interface ServiceCardProps {
    isLoading?: boolean;
    isError?: boolean;
    data?: FetchProviderServiceResponse;
    isUserLookingProvider?: boolean;
}

// Provider Profile props
export interface ProviderProfileProps {
    username: string;
    profileImage: string;
    role: Role;
    availability: React.ReactNode;
    reviews?: React.ReactNode;
    address?: React.ReactNode;
    proofs?: React.ReactNode;
    service: {
        isLoading?: boolean;
        isError?: boolean;
        data?: FetchProviderServiceResponse;
        isUserLookingProvider?: boolean;
    },
    profile: {
        isLoading?: boolean;
        isError?: boolean;
        data?: ProviderFetchMyProfileDetailsResponse | UserFetchProviderProfileDetailsResponse
    },
}

// TOC props
export interface TOCProps {
    headings: TOCHeadingProps[];
}

// Service Availabilities props
export interface SavedAvailabilitiesProps {
    availabilities: Availability[] | null;
    removeAvailability: (day: string) => void;
}

// FAQ Shimmer props
export interface FAQSectionProps {
    rows: number;
}

// User Profile Top Card props
export interface UserProfileTopCardProps {
    name: string;
    image: string;
}

// User Profile props
export interface UserProfileProps {
    username: string;
    profileImage: string;
    role: Role;
    address?: React.ReactNode;
    profile?: React.ReactNode;
}

// Boarding Layout props
export interface BoardingLayoutProps {
    children: React.ReactNode;
    pageNumber: number;
    heading: string;
    description: string;
}

// Main Layout props
export interface MainLayoutProps {
    routes: Route[];
    filteredRoutes?: Route[];
    profileImage?: string;
    username?: string;
    children: React.ReactNode;
    rightSidebar?: React.ReactNode;
}

// FAQ Accordion props
export interface FAQAccordionProps {
    faqs: FaqFields[];
    loading?: boolean;
}

// FAQPage Search props
export interface FAQPageSearchProps {
    value: string;
    onChange: (value: string) => void;
}