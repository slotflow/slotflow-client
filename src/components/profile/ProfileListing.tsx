import { useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Award,
  CircleCheck,
  Clock,
  MapPin,
  Briefcase,
  FileCheck,
  Tag,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/app/store/appStore';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { statsPresents } from '@/shared/utils/constants';
import DataFetchingError from '../error/DataFetchingError';
import getBooleanStatusComponent from '../app/GetBooleanStatus';
import { UserOrProviderProfileDetailsComponentProps } from '@/shared/types/component';
import { AdminFetchProviderProfileDetailsResponse } from '@/shared/types/api/providerProfile';
import {
  UserFetchMyProfileDetailsResponse,
  AdminFetchUserProfileDetailsResponse,
} from '@/shared/types/api/user';
import DataField from '../app/DataField';

const ProfileListing = ({
  userOrProviderId,
  fetchApiFunction,
  queryKey,
  adminLookingProvider,
  adminLookingUser,
  userSelf,
  setProfileImage,
  shimmerRow = 3,
  setSelectedUserData,
}: UserOrProviderProfileDetailsComponentProps) => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const res = await fetchApiFunction(userOrProviderId);
      return res.data;
    },
    queryKey: [...queryKey, userOrProviderId],
  });

  useEffect(() => {
    if (!data) return;

    if (setProfileImage && 'profileImage' in data && data.profileImage) {
      setProfileImage(data.profileImage);
    }

    if ((adminLookingProvider || adminLookingUser) && 'username' in data && setSelectedUserData) {
      setSelectedUserData({
        selectedUserName: data.username,
        selectedUserProfileImage: (data as { profileImage?: string }).profileImage || null,
      });
    }
  }, [data, adminLookingProvider, adminLookingUser, setProfileImage, setSelectedUserData]);

  if (isError) {
    return <DataFetchingError message={error?.message} />;
  }

  // ---------------- ADMIN LOOKING PROVIDER VIEW ----------------
  if (adminLookingProvider) {
    const d = data as AdminFetchProviderProfileDetailsResponse | undefined;

    return (
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {isLoading ? (
                <DataShimmer w="w-16" h="h-16" className="rounded-full shrink-0" />
              ) : d?.profileImage ? (
                <img
                  src={d.profileImage}
                  alt={d.username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-border shadow-xs"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-muted flex items-center justify-center text-slate-500 font-bold text-xl border border-slate-200 dark:border-border">
                  {d?.username?.charAt(0)?.toUpperCase() || 'P'}
                </div>
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                    {isLoading ? <DataShimmer w="w-36" h="h-6" /> : d?.username}
                  </h3>
                  {isLoading ? (
                    <DataShimmer w="w-20" h="h-5" className="rounded-full" />
                  ) : d?.trustedBySlotflow ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      <Award className="w-3 h-3 text-indigo-500" /> Trusted
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3" /> Joined{' '}
                    {isLoading ? (
                      <DataShimmer w="w-24" h="h-3.5" />
                    ) : d?.createdAt ? (
                      new Date(d.createdAt).toLocaleDateString()
                    ) : (
                      'Not Available'
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isLoading ? (
                <DataShimmer w="w-28" h="h-6" className="rounded-full" />
              ) : !d?.isBlocked ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Account
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Account Blocked
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contact & Verification Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Details Card */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-border/60 pb-3">
              <User className="w-4 h-4 text-indigo-500" /> Direct Contact Information
            </h4>
            <div className="space-y-3">
              <DataField
                label="Email Address"
                value={d?.email}
                Icon={Mail}
                canCopy
                isLoading={isLoading}
                shimmerWidth="w-36"
              />
              <DataField
                label="Phone Number"
                value={d?.phone}
                Icon={Phone}
                isLoading={isLoading}
                shimmerWidth="w-28"
              />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-border/60 pb-3">
              <Shield className="w-4 h-4 text-indigo-500" /> Verification Overview
            </h4>
            <div className="space-y-3">
              <DataField
                label="Global Status"
                value={d?.adminVerificationStatus || 'Pending'}
                isLoading={isLoading}
                shimmerWidth="w-20"
              />
              <DataField
                label="Admin Verified"
                value={getBooleanStatusComponent(
                  d?.isAdminVerified,
                  statsPresents.verificationStatus,
                )}
                isLoading={isLoading}
                shimmerWidth="w-16"
              />
              <DataField
                label="Slotflow Trust Badge"
                value={getBooleanStatusComponent(d?.trustedBySlotflow, statsPresents.trustStatus)}
                isLoading={isLoading}
                shimmerWidth="w-16"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-border/60 pb-3">
            <CircleCheck className="w-4 h-4 text-indigo-500" /> Detailed Verification Checklist
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            <DataField
              label="Address"
              value={getBooleanStatusComponent(
                d?.isAddressVerified,
                statsPresents.verificationStatus,
              )}
              Icon={MapPin}
              isLoading={isLoading}
              shimmerWidth="w-16"
            />
            <DataField
              label="Service Details"
              value={getBooleanStatusComponent(
                d?.isServiceDetailsVerified,
                statsPresents.verificationStatus,
              )}
              Icon={Briefcase}
              isLoading={isLoading}
              shimmerWidth="w-16"
            />
            <DataField
              label="Availability"
              value={getBooleanStatusComponent(
                d?.isAvailabilityVerified,
                statsPresents.verificationStatus,
              )}
              Icon={Clock}
              isLoading={isLoading}
              shimmerWidth="w-16"
            />
            <DataField
              label="Documents/Proofs"
              value={getBooleanStatusComponent(
                d?.isProofsVerified,
                statsPresents.verificationStatus,
              )}
              Icon={FileCheck}
              isLoading={isLoading}
              shimmerWidth="w-16"
            />
          </div>
        </div>
      </div>
    );
  }

  // ---------------- ADMIN LOOKING USER VIEW ----------------
  if (adminLookingUser) {
    const d = data as AdminFetchUserProfileDetailsResponse | undefined;

    return (
      <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-border/60">
          {isLoading ? (
            <DataShimmer w="w-14" h="h-14" className="rounded-full shrink-0" />
          ) : d?.profileImage ? (
            <img
              src={d.profileImage}
              alt={d.username}
              className="w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-border"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-muted flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200 dark:border-border">
              {d?.username?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
              {isLoading ? <DataShimmer w="w-36" h="h-5" /> : d?.username}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataField
            label="Email"
            value={d?.email}
            Icon={Mail}
            canCopy
            isLoading={isLoading}
            shimmerWidth="w-36"
          />
          <DataField
            label="Phone"
            value={d?.phone}
            Icon={Phone}
            isLoading={isLoading}
            shimmerWidth="w-28"
          />
          <div className="md:col-span-2">
            <DataField
              label="Account Status"
              value={getBooleanStatusComponent(d?.isBlocked, statsPresents.accountStatus)}
              Icon={Shield}
              isLoading={isLoading}
              shimmerWidth="w-20"
            />
          </div>
        </div>
      </div>
    );
  }

  // ---------------- USER SELF VIEW ----------------
  if (userSelf) {
    const d = data as UserFetchMyProfileDetailsResponse | undefined;

    return (
      <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-border/60 pb-3">
          My Account Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataField
            label="Email"
            value={authUser?.email || d?.email}
            Icon={Mail}
            canCopy
            isLoading={isLoading}
            shimmerWidth="w-36"
          />
          <DataField
            label="Phone"
            value={authUser?.phone || d?.phone}
            Icon={Phone}
            isLoading={isLoading}
            shimmerWidth="w-28"
          />
          <div className="md:col-span-2">
            <DataField
              label="Referral Code"
              value={d?.referralCode}
              Icon={Tag}
              canCopy
              isLoading={isLoading}
              shimmerWidth="w-28"
            />
          </div>
        </div>
      </div>
    );
  }

  // Fallback layout using `shimmerRow` when no specific mode flag is passed
  if (isLoading) {
    return (
      <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-4">
        {Array.from({ length: shimmerRow }).map((_, index) => (
          <DataField
            key={index}
            label={`Field ${index + 1}`}
            value=""
            isLoading={true}
            shimmerWidth="w-1/3"
          />
        ))}
      </div>
    );
  }

  return null;
};

export default ProfileListing;
