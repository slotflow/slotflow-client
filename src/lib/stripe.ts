import { stripeConfig } from '@/config/env';
import { loadStripe } from '@stripe/stripe-js';

export const stripeClientPromise = loadStripe(stripeConfig.stripePublishableKey);
