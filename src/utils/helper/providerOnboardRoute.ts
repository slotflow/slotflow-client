import { AuthUser } from "../interface/sliceInterface";

export const getProviderRequiredRoute = (user: AuthUser) => {
  if (!user.isAddressAdded && !user.isAddressVerified) return "/provider/onboarding/address";
  if (!user.isServiceDetailsAdded && !user.isServiceDetailsVerified) return "/provider/onboarding/service";
  if (!user.isServiceAvailabilityAdded && !user.isAvailabilityVerified) return "/provider/onboarding/availability";
  if (!user.isProofSubmitted && !user.isProofsVerified) return "/provider/onboarding/proofs";
  if (!user.isAdminVerified) return "/provider/onboarding/pending";
  return "/provider/dashboard";
};