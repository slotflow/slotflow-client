import { AdminVerificationStatus } from "../enums";

// ProviderProfile
export interface ProviderProfile {
  _id: string;
  userId: string;
  isAdminVerified: boolean;
  verificationRejectionReason: string | null;
  adminVerificationStatus: AdminVerificationStatus;
  isAddressVerified: boolean;
  isServiceDetailsVerified: boolean;
  isAvailabilityVerified: boolean;
  isProofsVerified: boolean;
  serviceId: string | null;
  serviceAvailabilityId: string | null;
  subscription: string[];
  trustedBySlotflow: boolean;
  identityProof: string | null;
  serviceProof: string | null;
  createdAt: Date;
  updatedAt: Date;
}