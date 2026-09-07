import {
  Ban,
  Mail,
  Phone,
  MapPin,
  Calendar,
  RotateCw,
  Briefcase,
  FileCheck,
  ArrowLeft,
  CircleCheck,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReviewsPage from '../dashboard/ReviewsPage';
import { fetchPayments } from '@/services/apis/payment';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBadge from '@/components/common/StatusBadge';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { fetchAddressByUserId } from '@/services/apis/address';
import ProviderProofs from '@/components/profile/ProviderProofs';
import ProfileListing from '@/components/profile/ProfileListing';
import AddressListing from '@/components/profile/AddressListing';
import { useAdminProvider } from '@/hooks/adminHooks/useProvider';
import { slideIn } from '@/shared/utils/helper/gsapAnimationSlide';
import { providerTabs, QUERY_KEYS } from '@/shared/utils/constants';
import DataFetchingError from '@/components/error/DataFetchingError';
import { AdminVerificationStatus, Role } from '@/shared/types/enums';
import RejectproviderForm from '@/components/form/Admin/RejectproviderForm';
import ProfileTabNavigation from '@/components/profile/ProfileTabNavigation';
import ProviderServiceDetails from '@/components/profile/ProviderServiceList';
import DashboardDataCard from '@/components/common/DashboardDataCard';
import { fetchProviderServiceByProviderId } from '@/services/apis/providerService';
import AdminProviderSubscriptions from '@/components/admin/AdminProviderSubscriptions';
import AdminUserOrProviderPayments from '@/components/admin/AdminUserOrProviderPayments';
import ProviderServiceAvailability from '@/components/profile/ProviderServiceAvailability';
import {
  adminFetchProviderProofs,
  fetchProviderDetailsForAdmin,
} from '@/services/apis/providerProfile';

const AdminServiceProviderDetailPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<number>(0);
  const formRef = useRef<HTMLDivElement>(null);
  const { providerId } = useParams<{ providerId: string }>();
  const [rejectFormOpen, setRejectFormOpen] = useState<boolean>(false);

  useEffect(() => {
    if (rejectFormOpen && formRef.current) {
      slideIn(formRef.current);
    }
  }, [rejectFormOpen]);

  const {
    changeProviderBlockStatus,
    changeBlockStatusProviderId,
    approveProvider,
    approvingProviderId,
    changeProviderSlotflowTrustTag,
    changeTrustTagProviderId,
  } = useAdminProvider();

  const {
    data: provider,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.PROVIDER_PROFILE, providerId],
    queryFn: async () => {
      const res = await fetchProviderDetailsForAdmin(providerId!);
      return res.data;
    },
    enabled: !!providerId,
    staleTime: 5 * 60 * 1000,
  });

  const handleRefetch = async () => {
    const { isSuccess } = await refetch();
    if (isSuccess) {
      toast.success('Plan details refreshed successfully');
    } else {
      toast.error('Failed to refresh plan details');
    }
  };

  if (!providerId) {
    return (
      <div className="p-4 h-full">
        <DataFetchingError message="Provider ID is missing." />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="p-4 h-full">
        <DataFetchingError message={(error as Error).message} />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 h-full space-y-8 min-h-screen font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button
                onClick={() => navigate(-1)}
                className="hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Service Providers
              </button>
              <span>/</span>
              {isLoading ? (
                <DataShimmer w="w-24" h="h-3" />
              ) : (
                <span className="font-mono">{provider?._id || providerId}</span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {isLoading ? (
                  <DataShimmer w="w-48" h="h-8" />
                ) : (
                  provider?.username || 'Provider Details'
                )}
              </h1>

              {isLoading ? (
                <div className="flex gap-2">
                  <DataShimmer w="w-20" h="h-5" className="rounded-full" />
                  <DataShimmer w="w-20" h="h-5" className="rounded-full" />
                </div>
              ) : (
                <>
                  <StatusBadge
                    type={
                      changeBlockStatusProviderId === providerId
                        ? 'updating'
                        : provider?.isBlocked
                          ? 'blocked'
                          : 'active'
                    }
                    label={
                      changeBlockStatusProviderId
                        ? 'Updating'
                        : provider?.isBlocked
                          ? 'Blocked'
                          : 'Active'
                    }
                  />
                  <StatusBadge
                    type={
                      approvingProviderId === providerId
                        ? 'updating'
                        : provider?.isAdminVerified
                          ? 'verified'
                          : 'unverified'
                    }
                    label={
                      approvingProviderId
                        ? 'Updating'
                        : provider?.isAdminVerified
                          ? ' Verified Provider'
                          : 'Pending Verification'
                    }
                  />
                  <StatusBadge
                    type={
                      changeTrustTagProviderId === providerId
                        ? 'updating'
                        : provider?.trustedBySlotflow
                          ? 'trusted'
                          : 'pending'
                    }
                    label={
                      changeTrustTagProviderId
                        ? 'Updating'
                        : provider?.trustedBySlotflow
                          ? 'Trusted Provider'
                          : 'Pending Trust Tag'
                    }
                  />
                </>
              )}
            </div>

            {isLoading ? (
              <DataShimmer w="w-64" h="h-4" className="mt-2" />
            ) : (
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                {provider?.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {provider.email}
                  </span>
                )}
                {provider?.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {provider.phone}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              disabled={isLoading || isFetching}
              onClick={handleRefetch}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 text-slate-500 ${isFetching && 'animate-spin'}`} />
              Refetch
            </button>
            <button
              disabled={isLoading || isFetching}
              onClick={() =>
                changeProviderBlockStatus({
                  providerId: providerId,
                  isBlocked: !(provider?.isBlocked ?? false),
                })
              }
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border shadow-sm transition-all cursor-pointer ${
                provider?.isBlocked
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'
                  : 'bg-white dark:bg-muted/20 text-rose-600 border-slate-200 dark:border-border hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
            >
              {' '}
              {provider?.isBlocked ? (
                <CircleCheck className="w-3.5 h-3.5" />
              ) : (
                <Ban className="w-3.5 h-3.5" />
              )}
              {provider?.isBlocked ? 'Unblock Provider' : 'Block Provider'}
            </button>
            <button
              disabled={isLoading || isFetching}
              onClick={() =>
                changeProviderSlotflowTrustTag({
                  providerId: providerId,
                  trustedBySlotflow: !(provider?.trustedBySlotflow ?? false),
                })
              }
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border shadow-sm transition-all cursor-pointer ${
                provider?.trustedBySlotflow
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'
                  : 'bg-white dark:bg-muted/20 text-rose-600 border-slate-200 dark:border-border hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
            >
              {' '}
              {provider?.trustedBySlotflow ? (
                <CircleCheck className="w-3.5 h-3.5" />
              ) : (
                <Ban className="w-3.5 h-3.5" />
              )}
              {provider?.trustedBySlotflow ? 'Revoke Tag' : 'Give Tag'}
            </button>
            {provider?.adminVerificationStatus === AdminVerificationStatus.REQUESTED && (
              <button
                disabled={isLoading || isFetching}
                onClick={() => setRejectFormOpen(!rejectFormOpen)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border shadow-sm transition-all cursor-pointer 'bg-white dark:bg-muted/20 text-rose-600 border-slate-200 dark:border-border hover:bg-rose-50 dark:hover:bg-rose-950/30'
                  }`}
              >
                {' '}
                Reject Provider
              </button>
            )}
            {!isLoading && !provider?.isAdminVerified && (
              <button
                disabled={isLoading || isFetching}
                onClick={() => approveProvider({ providerId: providerId })}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border shadow-sm transition-all cursor-pointer ${
                  !provider?.isAdminVerified
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'
                    : 'bg-white dark:bg-muted/20 text-rose-600 border-slate-200 dark:border-border hover:bg-rose-50 dark:hover:bg-rose-950/30'
                }`}
              >
                {' '}
                {provider?.isAdminVerified ? (
                  <CircleCheck className="w-3.5 h-3.5" />
                ) : (
                  <Ban className="w-3.5 h-3.5" />
                )}
                {!provider?.isAdminVerified ? 'Approve' : ''}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardDataCard
            label="Address Details"
            icon={MapPin}
            status={provider?.isAddressVerified}
            isLoading={isLoading}
          />
          <DashboardDataCard
            label="Service Details"
            icon={Briefcase}
            status={provider?.isServiceDetailsVerified}
            isLoading={isLoading}
          />
          <DashboardDataCard
            label="Proofs & Documents"
            icon={FileCheck}
            status={provider?.isProofsVerified}
            isLoading={isLoading}
          />
          <DashboardDataCard
            label="Availability Slots"
            icon={Calendar}
            status={provider?.isAvailabilityVerified}
            isLoading={isLoading}
          />
        </div>

        <div className="space-y-6">
          <ProfileTabNavigation isAdmin={true} setTab={setTab} tab={tab} tabArray={providerTabs} />

          {tab === 0 && (
            <ProfileListing
              fetchApiFunction={() => fetchProviderDetailsForAdmin(providerId)}
              queryKey={[QUERY_KEYS.PROVIDER_PROFILE]}
              userOrProviderId={providerId}
              adminLookingProvider
              shimmerRow={8}
            />
          )}
          {tab === 1 && (
            <AddressListing
              userOrProviderId={providerId}
              fetchApiFunction={() => fetchAddressByUserId(providerId)}
              queryKey={[QUERY_KEYS.PROVIDER_ADDRESS]}
            />
          )}
          {tab === 2 && (
            <ProviderServiceDetails
              providerId={providerId}
              fetchApiFunction={() => fetchProviderServiceByProviderId(providerId)}
              queryKey={[QUERY_KEYS.PROVIDER_SERVICE]}
            />
          )}
          {tab === 3 && <ProviderServiceAvailability providerId={providerId} role={Role.ADMIN} />}
          {tab === 4 && <ReviewsPage providerId={providerId} isPage={false} />}
          {tab === 5 && <AdminProviderSubscriptions providerId={providerId} />}
          {tab === 6 && (
            <AdminUserOrProviderPayments providerId={providerId} fetchFunction={fetchPayments} />
          )}
          {tab === 7 && (
            <ProviderProofs
              fetchApiFunction={() => adminFetchProviderProofs(providerId)}
              providerId={providerId}
            />
          )}
        </div>
      </div>
      {rejectFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <RejectproviderForm
            onClose={() => setRejectFormOpen(!rejectFormOpen)}
            formRef={formRef}
            rejectProviderData={{ providerId: providerId }}
          />
        </div>
      )}
    </>
  );
};

export default AdminServiceProviderDetailPage;
