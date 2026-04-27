import { Payment } from "../entityInterface/paymentInterface";
import { FetchFunctionBaseQueryParams } from "../commonInterface";

// fetch payment details response
export type FetchPaymentDetailsResponse = Omit<Payment, "_id" | "chargeId" | "receiptEmail" | "receiptNumber" | "updatedAt" | "userId" | "providerId"> | null;

// fetch payments query parameters
export interface FetchPaymentsQueryParams {
  providerId?: string;
  userId?: string;
}

// fetch payments response
export type FetchPaymentsResponse = Pick<Payment, "_id" |"createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentStatus" | "discountAmount">;

// Admin fetch revenue report request
export interface AdmminFetchRevenueReportRequest extends FetchFunctionBaseQueryParams {
  startDate?: Date;
  endDate?: Date;
}

// Admin fetch revenue report response row
export type AdminFetchRevenueReportRow = Pick<Payment, "createdAt" | "discountAmount" | "initialAmount" | "totalAmount" | "paymentGateway" | "paymentFor">;

// Admin fetch revenue report response
export interface AdminFetchRevenueReportResponse {
  data: {
    rows: AdminFetchRevenueReportRow[];
    grandTotal: number;
    grandDiscount: number;
    grandInitalAmount: number;
  }
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

// connect stripe account response
export interface ConnexctStripeAccountResponse {
  url: string;
}