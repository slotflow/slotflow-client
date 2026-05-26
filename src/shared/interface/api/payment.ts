import { Payment } from "../entityInterface/paymentInterface";
import { FetchFunctionBaseQueryParams } from "../commonInterface";
import { StripeAccountStatus } from "../enums";

// response type of fetch payment details api
export type FetchPaymentDetailsResponse = Omit<Payment, "_id" | "chargeId" | "receiptEmail" | "receiptNumber" | "updatedAt" | "userId" | "providerId"> | null;

// request type of fetch payments api
export interface FetchPaymentsQueryParams {
  providerId?: string;
  userId?: string;
}

// response type of fetch payments api
export type FetchPaymentsResponse = Pick<Payment, "_id" |"createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentStatus" | "discountAmount">;

// request type of admin fetch revenue report api
export interface AdmminFetchRevenueReportRequest extends FetchFunctionBaseQueryParams {
  startDate?: Date;
  endDate?: Date;
}

// response type of admin fetch revenue report api row
export type AdminFetchRevenueReportRow = Pick<Payment, "createdAt" | "discountAmount" | "initialAmount" | "totalAmount" | "paymentGateway" | "paymentFor">;

// response type of admin fetch revenue report api
export interface AdminFetchRevenueReportResponse {
  items: {
    rows: AdminFetchRevenueReportRow[];
    grandTotal: number;
    grandDiscount: number;
    grandInitalAmount: number;
  }
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

// request type of connect stripe account api
export interface ConnectStripeAccountRequest {
  email: string;
}

// response type of connect stripe account api
export interface ConnexctStripeAccountResponse {
  onboardingUrl: string;
  accountId: string;
}

// request type of check stripe account status api
export interface CheckStripeAccountStatusRequest {
  accountId: string;
}

// response type of check stripe account status api
export type CheckStripeAccountStatusResponse = {
  accountStatus: StripeAccountStatus;
}