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
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Role } from '@/shared/types/enums';
import { TabItem } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import ListReviews from '../dashboard/ListReviews';
import { fetchPayments } from '@/services/apis/payment';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBadge from '@/components/common/StatusBadge';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { fetchAddressByUserId } from '@/services/apis/address';
import TabNavigation from '@/components/common/TabNavigation';
import ProviderProofs from '@/components/profile/ProviderProofs';
import AddressListing from '@/components/profile/AddressListing';
import { useAdminProvider } from '@/hooks/adminHooks/useProvider';
import { providerTabs } from '@/shared/utils/constants/tabConstants';
import DataFetchingError from '@/components/error/DataFetchingError';
import DashboardDataCard from '@/components/common/DashboardDataCard';
import ProviderServiceDetails from '@/components/profile/ProviderServiceList';
import { fetchProviderServiceByProviderId } from '@/services/apis/providerService';
import AdminProviderSubscriptions from '@/components/admin/AdminProviderSubscriptions';
import AdminUserOrProviderPayments from '@/components/admin/AdminUserOrProviderPayments';
import ProviderServiceAvailability from '@/components/profile/ProviderServiceAvailability';
import {
  adminFetchProviderProofs,
  fetchProviderDetailsForAdmin,
} from '@/services/apis/providerProfile';
import { queryKeys } from '@/shared/utils/constants/appConstants';

const AdminProviderDetails = () => {
  const navigate = useNavigate();
  const { providerId } = useParams<{ providerId: string }>();
  const [selectedTab, setSelectedTab] = useState<TabItem['value']>(providerTabs[0].value);

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
    queryKey: [queryKeys.PROFILE, providerId],
    queryFn: async () => {
      const res = await fetchProviderDetailsForAdmin(providerId!);
      return res.data;
    },
    enabled: !!providerId,
  });

  const handleRefetch = async () => {
    const { isSuccess } = await refetch();
    if (isSuccess) {
      toast.success('Provider details refreshed successfully');
    } else {
      toast.error('Failed to refresh details');
    }
  };

  if (!providerId) {
    return (
      <div className="h-full">
        <DataFetchingError message="Provider ID is missing." />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="h-full">
        <DataFetchingError message={(error as Error).message} />
      </div>
    );
  }

  return (
    <>
      <div className="h-full space-y-8 min-h-screen font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border pb-6">
          <div className="space-y-3">
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

            <div className="flex items-center gap-4">
              {isLoading ? (
                <DataShimmer w="w-16" h="h-16" className="rounded-full" />
              ) : (
                <div className="relative">
                  {provider?.profileImage ? (
                    <img
                      src={provider.profileImage}
                      alt={provider?.username || 'Provider Avatar'}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-border shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-border flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-300 shadow-sm">
                      {provider?.username?.charAt(0)?.toUpperCase() || 'P'}
                    </div>
                  )}
                  {provider?.trustedBySlotflow && (
                    <div
                      className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full border-2 border-white dark:border-slate-900"
                      title="Slotflow Trusted Provider"
                    >
                      <Award className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-1">
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
                          changeBlockStatusProviderId === providerId
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
                          approvingProviderId === providerId
                            ? 'Updating'
                            : provider?.isAdminVerified
                              ? 'Verified Provider'
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
                          changeTrustTagProviderId === providerId
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
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
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
                    {provider?.createdAt && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Joined{' '}
                        {new Date(provider.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
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
                  ? 'bg-amber-600 hover:bg-amber-700 text-white border-transparent'
                  : 'bg-white dark:bg-muted/20 text-amber-600 border-slate-200 dark:border-border hover:bg-amber-50 dark:hover:bg-amber-950/30'
              }`}
            >
              {provider?.trustedBySlotflow ? (
                <ShieldAlert className="w-3.5 h-3.5" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5" />
              )}
              {provider?.trustedBySlotflow ? 'Revoke Tag' : 'Give Tag'}
            </button>

            {!isLoading && !provider?.isAdminVerified && (
              <button
                disabled={isLoading || isFetching}
                onClick={() => approveProvider({ providerId: providerId })}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border shadow-sm transition-all cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white border-transparent"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Approve
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
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabNavigation
              isAdmin={true}
              tab={selectedTab}
              setTab={setSelectedTab}
              tabArray={providerTabs}
            />

            <TabsContent value="address">
              <AddressListing
                userOrProviderId={providerId}
                fetchApiFunction={() => fetchAddressByUserId({ userId: providerId })}
                queryKey={[queryKeys.ADDRESS]}
              />
            </TabsContent>

            <TabsContent value="service">
              <ProviderServiceDetails
                providerId={providerId}
                fetchApiFunction={() => fetchProviderServiceByProviderId(providerId)}
                queryKey={[queryKeys.SERVICE]}
              />
            </TabsContent>

            <TabsContent value="availability">
              <ProviderServiceAvailability providerId={providerId} role={Role.ADMIN} />
            </TabsContent>

            <TabsContent value="reviews">
              <ListReviews providerId={providerId} isPage={false} />
            </TabsContent>

            <TabsContent value="subscriptions">
              <AdminProviderSubscriptions providerId={providerId} />
            </TabsContent>

            <TabsContent value="payments">
              <AdminUserOrProviderPayments providerId={providerId} fetchFunction={fetchPayments} />
            </TabsContent>

            <TabsContent value="proofs">
              <ProviderProofs
                fetchApiFunction={() => adminFetchProviderProofs(providerId)}
                providerId={providerId}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminProviderDetails;
