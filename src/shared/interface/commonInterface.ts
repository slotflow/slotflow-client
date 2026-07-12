import { LucideIcon } from "lucide-react";
import React, { ChangeEvent } from "react";
import { RouteNames } from "../utils/constants";
import { ColumnDef } from "@tanstack/react-table";
import { ChartConfig } from "@/components/ui/chart";
import { Plan } from "./entityInterface/planInterface";
import { User } from "./entityInterface/userInterface";
import { Review } from "./entityInterface/reviewInterface";
import { Booking } from "./entityInterface/bookingInterface";
import { Message } from "./entityInterface/message.interface";
import { HearAboutUsOptionValue, PlanName, Role, ServiceCategory } from "./enums";

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
export interface Route {
  path: string;
  name: RouteNames;
  icon: LucideIcon;
}

// Gsap animation object interface
export interface gsapBigSvgYDirectionAnimationInterface {
  y: number,
  duration: number,
  yoyo: boolean,
  repeat: number,
  ease: string,
}

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
export interface CommonTableComponentProps<
  T,
  Q extends object = {}
> {
  parentDivCalssName?: string;

  fetchApiFunction: (
    queryParams?: FetchFunctionBaseQueryParams & Q
  ) => Promise<ApiPaginatedResponse<T>>;

  queryKey: string;
  column: ColumnDef<T>[];
  columnsCount: number;
  pageSize?: number;

  queryParams?: Q;
}

// Api fetch function interface
export type ApiFetchFunction<
  T,
  Q extends object = {}
> = (
  queryParams?: FetchFunctionBaseQueryParams & Q
) => Promise<ApiPaginatedResponse<T>>;

// Api common request parameter interface
export interface FetchFunctionBaseQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Formate date timeRage Enum
export type TimeRange = "7d"
  | "14d"
  | "30d"
  | "45d"
  | "60d"
  | "90d"
  | "180d"
  | "365d"

// DateSelect data interface
export interface dataSelectListItemInterface {
  value: string;
  content: string;
}

// AppointmentOverTimeInterface
export interface AppointmentOverTimeInterface {
  completed: number,
  missed: number,
  cancelled: number
}

//  Chart Common Interface
export interface ChatComponentProps<T extends { date: string }> {
  title: string;
  description: string;
  chartData: T[];
  dataKeyOne: string;
  dataKeyTwo: string;
  dataKeyThree: string;
  dataKeyFour: string;
  nameKey: string;
  chartConfig: ChartConfig;
  isLocked: boolean;
  minimumPlan: PlanName;
  footerTextOne?: string;
  footerTextTwo?: string;
  chartContainerClassName?: string;
}

// Chat Common Interface Base Type
export type BaseChartData = {
  date: string;
  [key: string]: number | string | undefined;
};

// Provider service availability component day map interface
export interface DayMapInterface {
  [key: string]: {
    day: string,
    tab: number
  }
}

// Plan feature interface
export interface PlanFeatureInterface {
  type: string;
  features: {
    name: string;
    free: boolean;
    starter: boolean;
    professional: boolean;
    enterprise: boolean;
  }[];
}

// Plan list type interface
export type PlanListType = Array<Pick<Plan, "_id" | "planName" | "description" | "features" > & { 
  monthlyPrice: number; 
  yearlyPrice: number; 
}>

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
    },
  },
}

// Common tab interface
export interface CommonTabInterface {
  value: string;
  label: string;
  icon?: LucideIcon;
  role?: Role[];
}

// Select options interface
export type SelectOptions = Array<{ label: string, value: string }>;

// Provider cards filters interface
export interface ProviderCardsFilters {
  appServiceIds: string[];
  minPrice: number;
  maxPrice: number;
  slotflowTrusted: boolean;
  categories: ServiceCategory[];
  location?: {
    type: string,
    coordinates: [number, number],
  };
  skip: number;
  limit: number;
};

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
  providerId: User["_id"] | null;
}

// Chat Data interface
export interface SocketDataInterface {
  fromUserId: Message["senderId"];
  toUserId: Message["receiverId"];
}

// set last message interface
export type setLatMessageProps = Pick<Message, "senderId" | "text" | "createdAt">

// Chat list user interface
export type ChatListUserProps = Pick<User, "_id" | "username" | "profileImage"> | Pick<User, "_id" | "username" | "profileImage">;

// Option type interface
export type OptionType<K> = {
  label: string;
  value: K;
};

// Map dot lit locations coordinates interface
export interface MapDotLitLocationsCoordinates {
  start: { lat: number, lng: number },
  end: { lat: number, lng: number }
}

// Tab item interface
export interface TabItem {
  value: string;
  label: string;
  icon?: React.ElementType;
  role?: string[];
}

// Review form values interface
export type ReviewFormValues = Pick<Review, "reviewText" | "rating">;

// Hear about us options interface
export type HearAboutUsOptions = {
  label: string
  value: HearAboutUsOptionValue
  icon: React.ComponentType<{ className?: string }>
}

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
    linkType: "Entry";
    type: "Link";
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
  icon: React.ComponentType<{ className?: string }>;
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