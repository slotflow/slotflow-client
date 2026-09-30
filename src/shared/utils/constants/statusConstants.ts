import { AdminVerificationStatus } from "@/shared/types/enums";
import { VerificationStatusConfig } from "@/shared/types/common";

export const adminVerificationStatusConfig: Record<AdminVerificationStatus, VerificationStatusConfig> = {
  [AdminVerificationStatus.REQUESTED]: {
    type: 'pending',
    label: 'Requested',
    desc: 'Submitted for review',
  },
  [AdminVerificationStatus.UNDER_REVIEW]: {
    type: 'pending',
    label: 'Under Review',
    desc: 'Currently under review',
  },
  [AdminVerificationStatus.APPROVED]: {
    type: 'verified',
    label: 'Approved',
    desc: 'Approved',
  },
  [AdminVerificationStatus.REJECTED]: {
    type: 'unverified',
    label: 'Rejected',
    desc: 'Rejected',
  },
  [AdminVerificationStatus.RESUBMITTED]: {
    type: 'pending',
    label: 'Re-submitted',
    desc: 'Re-submitted for review',
  },
  [AdminVerificationStatus.NOT_REQUESTED]: {
    type: 'standard',
    label: 'Not Requested',
    desc: 'Not submitted',
  },
};

// Block Back Statuses
export const blockBackStatuses = [
  AdminVerificationStatus.REQUESTED,
  AdminVerificationStatus.UNDER_REVIEW,
  AdminVerificationStatus.RESUBMITTED,
] as const;