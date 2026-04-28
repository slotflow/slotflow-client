import { AdminVerificationStatus } from "../enums";

// ProviderProfile
export interface ProviderProfile {
  _id: string;
  userId: string;
  isAdminVerified: boolean;
  verificationRejectionReason?: string;
  adminVerificationStatus: AdminVerificationStatus;
  isAddressVerified: boolean;
  isServiceDetailsVerified: boolean;
  isAvailabilityVerified: boolean;
  isProofsVerified: boolean;
  serviceId?: string;
  serviceAvailabilityId?: string;
  subscription: string[];
  trustedBySlotflow: boolean;
  identityProof?: string;
  serviceProof?: string;
  createdAt: Date;
  updatedAt: Date;
}