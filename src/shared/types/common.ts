import jsPDF from 'jspdf';
import { AxiosError } from 'axios';
import { User } from './entity/user';
import { Review } from './entity/review';
import { LucideIcon } from 'lucide-react';
import { Booking } from './entity/booking';
import React, { ChangeEvent } from 'react';
import { Message } from './entity/message';
import { Plan } from './entity/planInterface';
import { dateFormats } from '../utils/constants/appConstants';
import { ColumnDef } from '@tanstack/react-table';
import { RouteNames } from '../utils/constants/routeConstants';
import { HearAboutUsOptionValue, PlanName, Role, ServiceCategory } from './enums';

// Common Response interface
export interface ApiBaseResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
}

// Paginated response api return data interface
export interface ApiPaginatedResponse<T> {
  items?: T[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
}

// Routes array interface
interface RouteInterface {
  path: string;
  name: RouteNames;
  icon: LucideIcon;
  roles?: Role[];
}
export interface Route extends RouteInterface {
  subroutes?: RouteInterface[];
}

// Matches your Express errorHandler output:
export interface BackendApiErrorResponse {
  success: boolean;
  message: string;
  errorCode: string;
  errors?: unknown;
  stack?: string;
}

// Exact error type entering catch/onError blocks
export type ApiError = AxiosError<BackendApiErrorResponse>;

// Header compoenent Navs Array Interface
export interface HeaderCompoenentNavsProps {
  name: string;
  href: string;
  current: boolean;
}

// Common Forms Input handle change function type
export type HandleChangeFunction = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
export type HandleFeatureChangeFunction = (e: ChangeEvent<HTMLInputElement>, index: number) => void;

// Section one interface
// Role section Button function interface
export type HandleRoleSelectionFunction = (url: string) => void;

// Common Table compoenent
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginatedDataTableProps<T, Q extends object = {}> {
  parentDivCalssName?: string;
  fetchApiFunction: (
    queryParams?: FetchFunctionBaseQueryParams & Q,
  ) => Promise<ApiPaginatedResponse<T>>;
  queryKey: string[];
  column: ColumnDef<T>[];
  columnsCount: number;
  pageSize?: number;
  queryParams?: Q;
  actionButtons?: {
    actionLabel?: string;
    onActionClick?: () => void;
  }[];
}

// Api fetch function interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ApiFetchFunction<T, Q extends object = {}> = (
  queryParams?: FetchFunctionBaseQueryParams & Q,
) => Promise<ApiPaginatedResponse<T>>;

// Api common request parameter interface
export interface FetchFunctionBaseQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Formate date timeRage Enum
export type TimeRange = '7d' | '14d' | '30d' | '45d' | '60d' | '90d' | '180d' | '365d';

// DateSelect data interface
export interface dataSelectListItemInterface {
  value: string;
  content: string;
}

// AppointmentOverTimeInterface
export interface AppointmentOverTimeInterface {
  completed: number;
  missed: number;
  cancelled: number;
}

// Chat Common Interface Base Type
export type BaseChartData = {
  date: string;
  [key: string]: number | string | undefined;
};

// Provider service availability component day map interface
export interface DayMapInterface {
  [key: string]: {
    day: string;
    tab: number;
  };
}

// Plan feature interface
export interface PlanFeatureInterface {
  type: string;
  features: PlanFeature[];
}

// Plan Feature
export interface PlanFeature {
  name: string;

  trial: boolean;
  starter: boolean;
  professional: boolean;
  enterprise: boolean;

  inDevelopment: boolean;

  limit?: PlanFeatureLimit;
}

// Plan feature limit
export interface PlanFeatureLimit {
  trial?: string;
  starter?: string;
  professional?: string;
  enterprise?: string;
}

// Plan list type interface
export type PlanListType = Array<
  Pick<Plan, '_id' | 'planName' | 'monthlyPrice' | 'yearlyPrice' | 'description' | 'features'>
>;

// Provider approval message interface
export interface ProviderApprovalMessageInterface {
  heading: string;
  message1: string;
  message2: string;
  footerNote: string;
}

// Feature Content interface
export interface FeatureContentInterface {
  title: string;
  description: string;
  image: string;
  logo?: string;
  icon?: LucideIcon;
  islogo: boolean;
}

// Stats map interface
export interface statsMapIntrface<T> {
  title: string;
  key: keyof T;
  icon: LucideIcon;
  price?: boolean;
  plans?: PlanName[];
}

// Stats map for admin interface
export interface StatsMapForAdminInterface {
  title: string;
  key: string;
  icon: LucideIcon;
  price?: boolean;
}

// Google calendar event interface
export interface GoogleCalendarEvent extends Partial<Booking> {
  id?: string;
  iCalUID?: string;
  kind?: string;
  eventType?: string;

  summary?: string;
  description?: string;

  start: string;
  end: string;

  created?: string;
  updated?: string;

  htmlLink?: string;
  status?: string;

  creator?: {
    email: string;
    self?: boolean;
  };

  organizer?: {
    email: string;
    self?: boolean;
  };

  reminders?: {
    useDefault: boolean;
    overrides?: {
      method: string;
      minutes: number;
    }[];
  };

  sequence?: number;
  etag?: string;

  extendedProperties?: {
    private: {
      bookingStatus?: string;
      bookingId?: string;
      title?: string;
      backgroundColor?: string;
      textColor?: string;
    };
  };
}

// Common tab interface
export interface CommonTabInterface {
  value: string;
  label: string;
  icon?: LucideIcon;
  role?: Role[];
}

// Select options interface
export type SelectOptions = Array<{ label: string; value: string }>;

// Provider cards filters interface
export interface ProviderCardsFilters {
  categories: ServiceCategory[];
  appServiceIds: string[];
  minPrice: number;
  maxPrice: number;
  slotflowTrusted: boolean;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  skip: number;
  limit: number;
}

// Contact item interface
export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

// admin reject provider modal state
export interface AdminRejectProviderModalState {
  modalState: boolean;
  providerId: User['_id'] | null;
}

// Chat Data interface
export interface SocketDataInterface {
  fromUserId: Message['senderId'];
  toUserId: Message['receiverId'];
}

// set last message interface
export type setLatMessageProps = Pick<Message, 'senderId' | 'text' | 'createdAt'>;

// Chat list user interface
export type ChatListUserProps =
  Pick<User, '_id' | 'username' | 'profileImage'> | Pick<User, '_id' | 'username' | 'profileImage'>;

// Option type interface
export type OptionType<K> = {
  label: string;
  value: K;
};

// Map dot lit locations coordinates interface
export interface MapDotLitLocationsCoordinates {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

// Review form values interface
export type ReviewFormValues = Pick<Review, 'reviewText' | 'rating'>;

// Hear about us options interface
export type HearAboutUsOptions = {
  label: string;
  value: HearAboutUsOptionValue;
  icon: React.ComponentType<{ className?: string }>;
};

// Status preset interface
export type StatusPreset = {
  trueText: string;
  falseText: string;
  trueClass: string;
  falseClass: string;
  trueIcon?: LucideIcon;
  falseIcon?: LucideIcon;
};

// Contentful review data interface
export interface ReviewFields {
  id: number;
  text: string;
  customerName: string;
  customerProfile: string;
  customerOccupation: string;
  rating: number;
}

// COntentful Faq data interface
export interface FaqFields {
  id: number;
  value: string;
  question: string;
  answer: string;
}

// Contentful Blog Category data interface
export interface BlogCategoryFields {
  name: string;
  slug?: string;
  color?: string;
}

// Contentful Blog Author data interface
export interface BlogAuthorFields {
  author: string;
  proffession: string;
  profileImage: string;
}

// Contentful reference data interface
export interface ContentfulReference {
  sys: {
    id: string;
    linkType: 'Entry';
    type: 'Link';
  };
}

// Contentfull entry common interface
export interface ContentfulEntry<TFields> {
  sys: {
    id: string;
  };
  fields: TFields;
}

// Contentfull response interface
export interface ContentfulResponse<TItemFields, TIncludeFields = never> {
  total: number;
  skip: number;
  limit: number;
  items: ContentfulEntry<TItemFields>[];
  includes?: {
    Entry?: ContentfulEntry<TIncludeFields>[];
  };
}

// Contentfull Blog Article raw data interface
export interface ContentfulBlogArticleFields {
  id: number;
  category?: ContentfulReference | null;
  heroBackground?: string;
  heroTitle?: string;
  heroDescription?: string;
  author?: ContentfulReference | null;
  createdAt?: string;
  readTime?: string;
  articleTitle: string;
  articleImage?: string;
  articleImageDescription?: string;
  introduction?: string;
  protip?: string;
  paraOneTitle?: string;
  paraOneContent?: string;
  paraTwoTitle?: string;
  paraTwoContent?: string;
  listTitle?: string;
  listContent?: string[];
  quote?: string;
  conclusion?: string;
}

// Contentfull Blog Article data interface
export interface BlogArticle {
  id: number;
  category: string | null;
  heroBackground: string;
  heroTitle: string;
  heroDescription: string;
  author: BlogAuthorFields | null;
  createdAt: string;
  readTime: string;
  articleTitle: string;
  articleImage: string;
  articleImageDescription: string;
  introduction: string;
  protip: string;
  paraOneTitle: string;
  paraOneContent: string;
  paraTwoTitle: string;
  paraTwoContent: string;
  listTitle: string;
  listContent: string[];
  quote: string;
  conclusion: string;
}

// Contentfull Authors fields data interface
export type AuthorFields = BlogAuthorFields;

// Contentfull Category fields data interface
export type CategoryFields = BlogCategoryFields;

// Landing page integrations section data interface
export interface LandingPageIntegrations {
  title: string;
  description: string;
  logo: string;
  isActive: boolean;
}

// Landing page hero section people list data interface
export interface BookingStepsHeroPeople {
  id: number;
  name: string;
  designation: string;
  image: string;
}

// Landing page workflow section booking steps data interface
export interface BookingSteps {
  title: string;
  description: string;
  icon: LucideIcon;
}

// Blog CTA items data interface
export interface BlogCTAItems {
  title: string;
  subTitle: string;
}

// Company values data interface
export interface CompanyValues {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// PDF Generator doc type
export interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

// Constact page support options data interface
export interface ContactSupportOptions {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  button: string;
  action: string;
}

// borading steps interface
export interface OnboardingStep {
  pageNumber: number;
  heading?: string;
  description?: string;
  path: string;
}

//
export interface BoardingStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

//
export interface AppRouteHandle {
  title?: string;
}

//
export type NotificationChannel = 'email' | 'push' | 'in_app';

// cms plan fields
export interface PlanFields {
  planKey: number;
  displayName: PlanName;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  featuresList: string[];
  isPopular: boolean;
}

//
export type StatusBadgeType =
  | 'active'
  | 'blocked'
  | 'verified'
  | 'unverified'
  | 'pending'
  | 'standard'
  | 'updating'
  | 'normal' //remove
  | 'trusted';

//
export interface StatusBadgeProps {
  type: StatusBadgeType;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

//
export interface VerificationStatusConfig {
  label: string;
  type: StatusBadgeType;
  desc: string;
}

//
export interface DashboardDataCardProps {
  label: string;
  icon: LucideIcon;
  value?: string | number;
  status?: 'verified' | 'unverified' | 'normal' | boolean;
  price?: boolean;
  suffix?: string;
  isLoading?: boolean;
}

//
export interface TabItem {
  tabName: string;
  value: string;
  admin?: boolean;
  user?: boolean;
}

//
export interface DateRangeStrings {
  startDate?: string;
  endDate?: string;
}

//
export interface TabNavigationProps {
  isAdmin?: boolean;
  tab: string;
  setTab: (value: string) => void;
  tabArray: TabItem[];
}

//
export interface StatMetric {
  value: number;
  trend: string;
}

//
export interface DashboardItem {
  id: string;
  colSpan: string;
  component: React.ReactNode;
}

//
export type DateInput = Date | string | number | null | undefined;
export type DateFormatPattern = typeof dateFormats[keyof typeof dateFormats] | (string & {});