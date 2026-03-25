import { FetchFunctionBaseQueryParams } from "../commonInterface";
import { Payment } from "../entityInterface/paymentInterface";

export type FetchPaymentDetailsResponse = Omit<Payment, "_id" | "chargeId" | "receiptEmail" | "receiptNumber" | "updatedAt" | "userId" | "providerId"> | null;

export interface FetchPaymentsQueryParams {
  providerId?: string;
  userId?: string;
}

export type FetchPaymentsResponse = Pick<Payment, "_id" |"createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentStatus" | "discountAmount">;

// Admin fetch revenue report request
export interface AdmminFetchRevenueReportRequest extends FetchFunctionBaseQueryParams {
  startDate?: Date;
  endDate?: Date;
}
// Admin fetch revenue report response
export type AdminFetchRevenueReportRow = Pick<
  Payment,
  | "createdAt"
  | "discountAmount"
  | "initialAmount"
  | "totalAmount"
  | "paymentGateway"
  | "paymentFor"
>;

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