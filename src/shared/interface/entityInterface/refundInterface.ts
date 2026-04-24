import { PaymentGateway, RefundFor, RefundReason, RefundStatus } from "../enums";

export interface Refund {
    _id: string;
    idempotencyKey: string;
    paymentId: string;
    refundId: string;
    amount: number;
    refundStatus: RefundStatus;
    refundGateway: PaymentGateway;
    reason: RefundReason;
    refundFor: RefundFor;
    reasonInDetail: string;
    metadata?: Record<string, string>;
    updatedAt: Date;
    createdAt: Date;
}