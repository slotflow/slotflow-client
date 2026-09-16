import {
  Route,
  FaqFields,
  TimeRange,
  OptionType,
  PlanFields,
  BlogArticle,
  BaseChartData,
  ApiBaseResponse,
  BlogAuthorFields,
  NotificationType,
  statsMapIntrface,
  NotificationChannel,
  ApiPaginatedResponse,
  FetchFunctionBaseQueryParams,
  StatMetric,
  DashboardItem,
} from './common';
import {
  UserFetchServiceProvidersResponse,
  UserFetchMyProfileDetailsResponse,
  AdminFetchUserProfileDetailsResponse,
} from './api/user';
import {
  Control,
  type Path,
  FieldError,
  UseFormSetValue,
  type FieldValues,
  type UseFormRegister,
  type RegisterOptions,
} from 'react-hook-form';
import {
  ProviderFetchMyProfileDetailsResponse,
  UserFetchProviderProfileDetailsResponse,
  AdminFetchProviderProfileDetailsResponse,
} from './api/providerProfile';
import { User } from './entity/user';
import { LucideIcon } from 'lucide-react';
import { SetProofDataProps } from './slice';
import { DateRange } from 'react-day-picker';
import { Plan } from './entity/planInterface';
import { PayloadAction } from '@reduxjs/toolkit';
import { ChartConfig } from '@/components/ui/chart';
import * as RPNInput from 'react-phone-number-input';
import { FetchServicesResponse } from './api/service';
import { Location } from '@/shared/types/entity/address';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Availability } from './entity/serviceAvailability';
import { RouteNames } from '../utils/constants/routeConstants';
import { BillingCycle, PlanName, Role, ServiceMode } from './enums';
import { FetchProviderServiceResponse } from './api/providerService';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { FetchAddressResponse, FetchMyAddressResponse } from './api/address';
import { FetchPaymentsQueryParams, FetchPaymentsResponse } from './api/payment';
import { ProviderServiceAvailabilityFormType } from '../validators/zod/providerZod';
import { FetchReviewsResponse, ChangeReviewBlockStatusRequest } from './api/review';
import { Column, ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { FetchProvidersProofsResponse, UpdateFileDataRequest } from './api/commonApiInterface';
import { AnalyticsAiResponse } from './api/adminDashboard';

// Provider service availability component props interface
export interface ProviderServiceAvailabilityProps {
  role: Role;
  providerId?: string;
  canUpdate?: boolean;
  showHeading?: boolean;
}

// Provider Service list and details showing component props interface
export interface ProviderServiceListProps {
  providerId?: User['_id'];
  fetchApiFunction: (
    providerId?: User['_id'],
  ) => Promise<ApiBaseResponse<FetchProviderServiceResponse>>;
  queryKey: string[];
  canUpdate?: boolean;
  showHeading?: boolean;
}

// DateSelect component interface
export interface DateSelectProps {
  onValueChange: (value: TimeRange) => void;
  value: string;
}

// Chart Header component interface
export interface ChartHeaderProps {
  title?: string;
  description?: string;
  onValueChange?: (value: TimeRange) => void;
  value?: string;
  showDatePicker?: boolean;
  isLoading?: boolean;
  onReload?: () => void;
}

//  Chart Common Interface
export interface ChartComponentProps<T extends { date: string }> {
  chartData: T[];
  dataKeyOne: string;
  dataKeyTwo: string;
  dataKeyThree: string;
  dataKeyFour: string;
  nameKey: string;
  chartConfig: ChartConfig;
  title?: string;
  description?: string;
  footerTextOne?: string;
  footerTextTwo?: string;
  chartContainerClassName?: string;
  isLocked?: boolean;
  minimumPlan?: PlanName;
  isLoading?: boolean;
  isError?: boolean;
  onReload?: () => void;
}

// AreaGroupChart compoenent props type
export type AreaGroupChartProps = Pick<
  ChartComponentProps<BaseChartData>,
  | 'title'
  | 'description'
  | 'chartData'
  | 'dataKeyOne'
  | 'dataKeyTwo'
  | 'dataKeyThree'
  | 'chartConfig'
  | 'isLocked'
  | 'minimumPlan'
  | 'isError'
  | 'isLoading'
  | 'onReload'
>;

// BarChartHorizontal compoenent props type
export type BarChartHorizontalProps = Pick<
  ChartComponentProps<BaseChartData>,
  | 'title'
  | 'description'
  | 'chartData'
  | 'dataKeyOne'
  | 'dataKeyTwo'
  | 'dataKeyThree'
  | 'chartConfig'
  | 'isLocked'
  | 'minimumPlan'
  | 'isError'
  | 'isLoading'
  | 'onReload'
>;

// BarChartStacked compoenent props type
export type BarChartStackedProps = Pick<
  ChartComponentProps<BaseChartData>,
  | 'title'
  | 'description'
  | 'chartData'
  | 'dataKeyOne'
  | 'dataKeyTwo'
  | 'dataKeyThree'
  | 'chartConfig'
  | 'isLocked'
  | 'minimumPlan'
  | 'isError'
  | 'isLoading'
  | 'onReload'
>;

// BarChartVertical compoenent props type
export type BarChartVerticalProps = Pick<
  ChartComponentProps<BaseChartData>,
  | 'title'
  | 'description'
  | 'chartData'
  | 'dataKeyOne'
  | 'dataKeyTwo'
  | 'chartConfig'
  | 'isLocked'
  | 'minimumPlan'
  | 'isError'
  | 'isLoading'
  | 'onReload'
>;

// ChartLineMultiple compoenent props type
export type ChartLineMultipleProps = Pick<
  ChartComponentProps<BaseChartData>,
  | 'title'
  | 'description'
  | 'chartData'
  | 'dataKeyOne'
  | 'dataKeyTwo'
  | 'chartConfig'
  | 'isLocked'
  | 'minimumPlan'
  | 'isError'
  | 'isLoading'
  | 'onReload'
>;

// LineChartHorizontal compoenent props type
export type LineChartHorizontalProps = Pick<
  ChartComponentProps<BaseChartData>,
  | 'title'
  | 'description'
  | 'chartData'
  | 'dataKeyOne'
  | 'dataKeyTwo'
  | 'chartConfig'
  | 'isLocked'
  | 'minimumPlan'
  | 'isError'
  | 'isLoading'
  | 'onReload'
>;

// ChartLineLinear compoenent props type
export type ChartLineLinearProps = Pick<
  ChartComponentProps<BaseChartData>,
  'chartData' | 'dataKeyOne' | 'chartConfig'
> &
  Partial<
    Pick<
      ChartComponentProps<BaseChartData>,
      | 'title'
      | 'description'
      | 'footerTextOne'
      | 'footerTextTwo'
      | 'chartContainerClassName'
      | 'dataKeyTwo'
      | 'dataKeyThree'
      | 'dataKeyFour'
      | 'isLocked'
      | 'minimumPlan'
      | 'isError'
      | 'isLoading'
      | 'onReload'
    >
  >;

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
  isLocked?: boolean;
  minimumPlan?: PlanName;
  isError?: boolean;
  isLoading?: boolean;
  onReload?: () => void;
}

// Admin fetch provider payments compoenent props interface
export interface AdminUserOrProviderPaymentsProps {
  providerId: string;
  fetchFunction: (
    params: FetchFunctionBaseQueryParams & FetchPaymentsQueryParams,
  ) => Promise<ApiPaginatedResponse<FetchPaymentsResponse>>;
}

// Admin fetch provider subscriptions component props interface
export interface AdminFetchProviderSubscriptionsProps {
  providerId: User['_id'];
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
  infoText?: string;
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
}

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
  deleteHandler: (options?: { onSuccess?: () => void }) => void;
  isDeleting: boolean;
  closeToast: () => void;
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
  stringOne: PlanName;
  chartTitle?: string;
}

// Horizontal chart for admin component props interface
export interface HorizontalChartProps {
  chartData: { name: string; value: number }[];
  title: string;
  description: string;
  isLocked?: boolean;
  minimumPlan?: PlanName;
  isError?: boolean;
  isLoading?: boolean;
  onReload?: () => void;
}

// Completion chart component props interface
export interface PieChartRoundedProps {
  title: string;
  description: string;
  chartData: {
    status: string;
    value: number;
  }[];
  dataKey: string;
  chartConfig: ChartConfig;
  nameKey: string;
  isLocked?: boolean;
  minimumPlan?: PlanName;
  isError?: boolean;
  isLoading?: boolean;
  onReload?: () => void;
}

// Chat bubble profile image component props interface
export interface ChatBubbleProfileImageProps {
  profileImage: User['profileImage'];
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
export interface RecentActivityTableCardProps {
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
export interface DashboardStatsProps<T extends Record<string, StatMetric | undefined>> {
  queryFunction(): Promise<ApiBaseResponse<T>>;
  queryKey: string[];
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
  className?: string;
}

// Data filter component props interface
export interface DateFilterProps {
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
export interface PlanFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
  planIdToEdit?: string | null;
}

// Create service form component props interface
export interface CreateServiceFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export interface EditServiceFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
  serviceToEdit: FetchServicesResponse | null;
}

// Reject provider form component props interface
export interface RejectproviderFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
  rejectProviderData: { providerId: User['_id'] };
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
  className?: string;
}

// google button props interface
export interface GoogleButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  className?: string;
}

// phone input props interface
export type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
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
  setValue: UseFormSetValue<T>;
  required?: boolean;
  defaultValue?: string | number | boolean;
  infoText?: string;
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
  badge: string;
  badgeIcon: LucideIcon;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  isAuth?: boolean;
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

// Nav compoenents interfaces
export interface SideBarProps {
  routes: Route[];
  filteredRoutes?: Route[];
}

// SingleTab component props interface
export interface SingleTabProps {
  icon: LucideIcon;
  text: string;
  isSidebarOpen: boolean;
  onClick?: () => void;
  className?: string;
  locked?: boolean;
  active?: boolean;
  hasSubroutes?: boolean;
  expanded?: boolean;
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
  plan: Pick<
    Plan,
    '_id' | 'planName' | 'monthlyPrice' | 'yearlyPrice' | 'description' | 'features'
  >;
  dummy?: boolean;
  popular?: boolean;
  billingCycle?: BillingCycle;
}

// UserOrProviderAddressDetails component props interface
export interface UserOrProviderAddressDetailsProps {
  userOrProviderId?: string;
  fetchApiFunction: (
    userOrProviderId?: string,
  ) => Promise<ApiBaseResponse<FetchMyAddressResponse> | ApiBaseResponse<FetchAddressResponse>>;
  queryKey: string[];
  isUserLookingProvider?: boolean;
  canUpdate?: boolean;
  showHeading?: boolean;
  isShowPreview?: boolean;
}

// UserOrProviderProfileDetails component props interface
export interface UserOrProviderProfileDetailsComponentProps {
  userOrProviderId?: string;
  fetchApiFunction: (
    userOrProviderId?: string,
  ) => Promise<
    ApiBaseResponse<
      | AdminFetchProviderProfileDetailsResponse
      | UserFetchMyProfileDetailsResponse
      | AdminFetchUserProfileDetailsResponse
    >
  >;
  queryKey: string[];
  adminLookingProvider?: boolean;
  adminLookingUser?: boolean;
  userSelf?: boolean;
  setProfileImage?: (image: string) => void;
  shimmerRow: number;
  setSelectedUserData?: (data: {
    selectedUserName: string;
    selectedUserProfileImage: string | null;
  }) => void;
}

// ProviderProofs component props interface
export interface ProviderProofsProps {
  providerId?: User['_id'];
  fetchApiFunction: (providerId?: string) => Promise<ApiBaseResponse<FetchProvidersProofsResponse>>;
}

// ReviewCard component props interface
export interface ReviewCardProps {
  review: FetchReviewsResponse;
  role: Role;
  handleDeleteReview: (reviewId: string) => void;
  handleReportReview: (reviewId: string) => void;
  isChangingReportStatus: boolean;
  handleChangeReviewBlockStatus: (data: ChangeReviewBlockStatusRequest) => void;
  isChangingBlockStatus: boolean;
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
  setValue: UseFormSetValue<ProviderServiceAvailabilityFormType>;
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
  name: 'startTime' | 'endTime';
  control: Control<ProviderServiceAvailabilityFormType>;
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
  actionButtons?: {
    actionLabel?: string;
    onActionClick?: () => void;
  }[];
  isFetching?: boolean;
  refetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ApiPaginatedResponse<TData>, Error>>;
}

// Data table column header props interface
export interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
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
  allowedRoles: Role[];
  children: React.ReactNode;
}

// Onboarding Guard props
export interface OnbooardingGuardProps {
  children: React.ReactNode;
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
  isLoading?: boolean;
  shimmerWidth?: string;
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
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  split?: 'lines' | 'words' | 'chars' | 'chars,words,lines';
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
}

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

// Stats card props
export interface MetricCProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
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
  message: string;
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
  icon: LucideIcon;
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
  };
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
  isShowPreview?: boolean;
  handleIsShowPreview?: () => void;
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
  isShowPreview?: boolean;
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
  };
  profile: {
    isLoading?: boolean;
    isError?: boolean;
    data?: ProviderFetchMyProfileDetailsResponse | UserFetchProviderProfileDetailsResponse;
  };
  isShowPreview?: boolean;
  handleIsShowPreview?: () => void;
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

// PLan feature value
export interface PlanFeatureValueProps {
  available: boolean;
  inDevelopment: boolean;
  limit?: string;
}

//
export interface PricingFeatureDetailsProps {
  billingCycle: BillingCycle;
  plans: PlanFields[];
}

//
export interface NotificationItemProps {
  title: string;
  description: string;
  channel: NotificationChannel;
  type: NotificationType;
  checked: boolean;
  onChange: (channel: NotificationChannel, type: NotificationType, enabled: boolean) => void;
}

//
export interface CupyFieldProps {
  value: string;
  label?: string;
}

//
export interface DataShimmerProps {
  w?: string;
  h?: string;
  className?: string;
}

//
export interface AdminDashboardUserDataProps {
  dateRange: DateRange;
}

//
export interface AdminDashboardProviderDataProps {
  dateRange: DateRange;
}

//
export interface AdminDashboardAppointmentsDataProps {
  dateRange: DateRange;
}

//
export interface AdminDashboardSubscriptionDataProps {
  dateRange: DateRange;
}

//
export interface AdminDashboardRevenueDataProps {
  dateRange: DateRange;
}

//
export interface ReorderableProps {
  initialItems: DashboardItem[];
}

//
export interface DataAnalysisProps {
  badgeText?: string;
  badgeIcon?: LucideIcon;
  title: string;
  queryKey: string | readonly unknown[];
  fetchFn: () => Promise<ApiBaseResponse<AnalyticsAiResponse>>;
}

//
export interface UserDataChartProps {
  dateRange: DateRange;
}

export interface ProviderDataChartProps {
  dateRange: DateRange;
}

//
export interface RevenueDataChartProps {
  dateRange: DateRange;
}

//
export interface UseAppointmentsDataChartsProps {
  dateRange: DateRange;
}

//
export interface SubscriptionDataChartProps {
  dateRange: DateRange;
}
