import { stripeConfig } from "@/config/env";
import { loadStripe } from "@stripe/stripe-js";

export const stripeClient = await loadStripe(stripeConfig.stripePublishableKey);