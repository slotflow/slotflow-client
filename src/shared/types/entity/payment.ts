import { BillingCycle, PaymentFor, PaymentGateway, PaymentStatus } from '../enums';

export interface Payment {
  _id: string;
  idempotencyKey: string;
  transactionId: string;
  stripeInvoiceId: string;

  paymentStatus: PaymentStatus;
  paymentGateway: PaymentGateway;
  paymentFor: PaymentFor;

  slotflowSubscriptionId?: string;
  slotflowBookingId?: string;

  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  billingCycle?: BillingCycle;

  userId?: string;
  providerId?: string;

  stripeCustomerId?: string;
  stripeSubscriptionId?: string;

  gatewayFee?: number;
  receiptUrl?: string;
  receiptPdf?: string;

  paymentIntent?: string;
  sessionId?: string;

  customerEmail: string;
  customerName: string;
  description: string;
  refundedAmount?: number;

  paidAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
