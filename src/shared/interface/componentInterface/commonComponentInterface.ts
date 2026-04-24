import {
  type Path,
  type FieldValues,
  type UseFormRegister,
  type RegisterOptions,
} from "react-hook-form";
import { PlanName, Role } from "../enums";
import { LucideIcon } from "lucide-react";
import { ChartConfig } from "@/components/ui/chart";
import { Provider } from "../entityInterface/providerInterface";
import { PayloadAction } from "@reduxjs/toolkit";
import { FetchServiceAvailabilityResponse } from "../api/serviceAvailability";
import { UpdateFileDataRequest, UpdateFileDataResponse } from "../api/commonApiInterface";
import { ApiBaseResponse, BaseChartData, ChatComponentProps, TimeRange } from "../commonInterface";
import { UserFetchServiceProvidersResponse } from "../api/user";
import { FetchProviderServiceResponse } from "../api/providerService";

// **** profile head compoenent props interface
export interface ProfileHeaderComponentProps {
  canUpdate: boolean;
  showDetails?: boolean;
  isMyProfile?: boolean;
  selectedUserData?: { selectedUserName: string, selectedUserProfileImage: string | null };
}


// **** Provider service availabilit component props interface
type FetchApiFunctionUserOrAdminRequestPayloadProps = {
  providerId: Provider["_id"]
  date: Date
}
export type ProviderApiFunctionForPSAcomponent = (date: Date) => Promise<FetchServiceAvailabilityResponse>;
export type UserOrAdminApiFunctionForPSAcomponent = (payload: FetchApiFunctionUserOrAdminRequestPayloadProps) => Promise<FetchServiceAvailabilityResponse>;
type FetchApiFunction = ProviderApiFunctionForPSAcomponent | UserOrAdminApiFunctionForPSAcomponent;
export interface ProviderServiceAvailabilityComponentProps {
  providerId?: string
  fetchApiFuntion: FetchApiFunction;
  queryKey: string;
  role?: Role;
}


// **** Provider Service details showing component props interface
export interface ProviderServiceDetailsComponentProps {
  providerId?: Provider["_id"];
  fetchApiFunction: (providerId?: Provider["_id"]) => Promise<FetchProviderServiceResponse>;
  queryKey: string;
  isUser?: boolean;
  shimmerRow?: number;
}


// **** DateSelect component interface
export interface DateSelectInterface {
  onValueChange: (value: TimeRange) => void;
  value: string;
}

// **** Chart Header component interface
export interface ChartHeaderInterface {
  title: string;
  description?: string;
  onValueChange?: (value: TimeRange) => void;
  value?: string;
}


// **** AreaGroupChart compoenent props type
export type AreaGroupChartProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "dataKeyThree" | "chartConfig" | "isLocked" | "minimumPlan">;


// **** BarChartHorizontal compoenent props type
export type BarChartHorizontalProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "dataKeyThree" | "chartConfig" | "isLocked" | "minimumPlan">;


// **** BarChartStacked compoenent props type
export type BarChartStackedProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "dataKeyThree" | "chartConfig" | "isLocked" | "minimumPlan">;


// **** BarChartVertical compoenent props type
export type BarChartVerticalProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "chartConfig" | "isLocked" | "minimumPlan">;


// **** ChartLineMultiple compoenent props type
export type ChartLineMultipleProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "chartConfig" | "isLocked" | "minimumPlan">;


// **** LineChartHorizontal compoenent props type
export type LineChartHorizontalProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "chartConfig" | "isLocked" | "minimumPlan">;


// **** PieChartCompletionBreakdown compoenent props type
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
// **** RadialChart compoenent props type
export type ChartDataItem = Record<string, string | number>;
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


// **** Contact Page
export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}


// **** FormField Component Props Interface
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

// ****
export interface FileUploaderProps {
  folderName: string;
  uploadFunction: (data: UpdateFileDataRequest) => Promise<UpdateFileDataResponse>;
  message?: string;
  setStateFunction: (data: string | null) => PayloadAction<string | null>;
  setLoadingFunction: (data: boolean) => PayloadAction<boolean>;
  fileUploaded: boolean;
  deleteFunction: () => Promise<ApiBaseResponse>;
  loading: boolean;
  data: string | null;
};

// provider cards listing
export type UserViewProviderCardComponentProps = UserFetchServiceProvidersResponse;