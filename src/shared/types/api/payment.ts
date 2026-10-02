import { Payment } from '../entity/payment';
import { FetchFunctionBaseQueryParams } from '../common';

// response type of fetch payment details api
export type FetchPaymentDetailsResponse = Omit<
  Payment,
  '_id' | 'chargeId' | 'receiptEmail' | 'receiptNumber' | 'updatedAt' | 'userId' | 'providerId'
> | null;

// request type of fetch payments api
export interface FetchPaymentsQueryParams {
  providerId?: string;
  userId?: string;
}

// response type of fetch payments api
export type FetchPaymentsResponse = Pick<
  Payment,
  | '_id'
  | 'createdAt'
  | 'totalAmount'
  | 'paymentFor'
  | 'paymentStatus'
  | 'discountAmount'
>;

// request type of admin fetch revenue report api
export interface AdmminFetchRevenueReportRequest extends FetchFunctionBaseQueryParams {
  startDate?: string;
  endDate?: string;
}

// response type of admin fetch revenue report api row
export type AdminFetchRevenueReportRow = Pick<
  Payment,
  | 'createdAt' 
  | 'discountAmount' 
  | 'totalAmount' 
  | 'paymentGateway' 
  | 'paymentFor'
>;

// response type of admin fetch revenue report api
export interface AdminFetchRevenueReportResponse {
  items: {
    rows: AdminFetchRevenueReportRow[];
    grandTotal: number;
    grandDiscount: number;
    grandInitalAmount: number;
  };
  totalPages: number;
  currentPage: number;
  totalCount: number;
}