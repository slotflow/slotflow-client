import { PaymentAccountStatus } from "../enums";

// check stripe account status
export type CheckStripeAccountStatusResponse = {
  stripeStatus: PaymentAccountStatus;
};


// connect stripe account for providers payout
export interface ConnectStripeAccountRequest {
  email: string;
}
export interface ConnexctStripeAccountResponse {
  boardingUrl: string;
}