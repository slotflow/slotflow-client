import { ChangeEvent } from "react";
import { LucideIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { ChartConfig } from "@/components/ui/chart";
import { Plan } from "./entityInterface/planInterface";
import { PlanName, Role, ServiceCategory } from "./enums";
import { Booking } from "./entityInterface/bookingInterface";

// Common Response interface
export interface ApiBaseResponse {
  success: boolean;
  message: string;
}

// Paginated response api return data interface
export interface ApiPaginatedResponse<T> extends ApiBaseResponse {
  data?: T[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
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
}

// InfoDisplay component props interface
export interface InfoDisplayComponentRowProps {
  defaultValue?: string;
  label: string;
  value: string | boolean | number | string[] | Date | undefined | null;
  formatDate?: (dateString: string) => string;
  copyToClipboard?: (text: string) => void;
  link?: boolean;
  isBoolean?: boolean;
  isPrice?: boolean;
  isLast?: boolean;
  isRadioGroup?: boolean;
  isIframe?: boolean;
  isTime?: boolean;
  isDate?: boolean;
  selectedRadioValue?: string | null;
  onRadioChange?: (value: string) => void;
  role?: Role;
  tags?: boolean;
}

// Common button props interface
export interface CommonButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  text: string,
  type?: "button" | "submit" | "reset",
  className?: string;
  icon?: LucideIcon;
}

// Nav compoenents interfaces
export interface SideBarProps {
  routes: Route[];
  filteredRoutes?: Route[];
}

// Constant file interfaces
// Routes array interface
export interface Route {
  path: string;
  name: string;
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
  nameKey: string;
  chartConfig: ChartConfig;
  isLocked: boolean;
  minimumPlan: PlanName;
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
export type PlanListType = Array<Pick<Plan, "_id" | "planName" | "description" | "features" | "price">>

// Footer link interface
export interface FooterLinkInterface {
  text: string;
  href: string;
}

// Footer column data interface
export interface FooterColumnDataInterface {
  title: string;
  links: FooterLinkInterface[];
}

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