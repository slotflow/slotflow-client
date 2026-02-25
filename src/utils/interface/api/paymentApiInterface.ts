import { Payment } from "../entityInterface/paymentInterface";

export type FetchPaymentDetailsResponse = Omit<Payment, "_id" | "chargeId" | "receiptEmail" | "receiptNumber" | "updatedAt" | "userId" | "providerId"> | null;

export interface FetchPaymentsQueryParams {
  providerId?: string;
  userId?: string;
}

export type FetchPaymentsResponse = Pick<Payment, "_id" |"createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentStatus" | "discountAmount">;
