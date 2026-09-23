import { useState } from 'react';
import { toast } from 'react-toastify';
import { TabItem } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import ListReviews from '../dashboard/ListReviews';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import StatusBadge from '@/components/common/StatusBadge';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminUser } from '@/hooks/adminHooks/useUser';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { fetchUserProfileDetails } from '@/services/apis/user';
import { fetchAddressByUserId } from '@/services/apis/address';
import TabNavigation from '@/components/common/TabNavigation';
import { userTabs, queryKeys } from '@/shared/utils/constants';
import AddressListing from '@/components/profile/AddressListing';
import DataFetchingError from '@/components/error/DataFetchingError';
import { Ban, Mail, Phone, RotateCw, ArrowLeft, CircleCheck, Clock } from 'lucide-react';

const AdminUserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [selectedTab, setSelectedTab] = useState<TabItem['value']>(userTabs[0].value);

  const { changeUserBlockStatus, changeBlockStatusUserId } = useAdminUser();

  const {
    data: user,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.PROFILE, userId],
    queryFn: async () => {
      const res = await fetchUserProfileDetails(userId!);
      return res.data;
    },
    enabled: !!userId,
  });

  const handleRefetch = async () => {
    const { isSuccess } = await refetch();
    if (isSuccess) {
      toast.success('User details refreshed successfully');
    } else {
      toast.error('Failed to refresh details');
    }
  };

  if (!userId) {
    return (
      <div className="h-full">
        <DataFetchingError message="User ID is missing." />
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
    <div className="h-full space-y-8 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border pb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => navigate(-1)}
              className="hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Users
            </button>
            <span>/</span>
            {isLoading ? (
              <DataShimmer w="w-24" h="h-3" />
            ) : (
              <span className="font-mono">{userId}</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <DataShimmer w="w-16" h="h-16" className="rounded-full" />
            ) : (
              <div className="relative">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user?.username || 'User Avatar'}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-border shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-border flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-300 shadow-sm">
                    {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {isLoading ? <DataShimmer w="w-48" h="h-8" /> : user?.username || 'User Details'}
                </h1>

                {isLoading ? (
                  <DataShimmer w="w-20" h="h-5" className="rounded-full" />
                ) : (
                  <StatusBadge
                    type={
                      changeBlockStatusUserId === userId
                        ? 'updating'
                        : user?.isBlocked
                          ? 'blocked'
                          : 'active'
                    }
                    label={
                      changeBlockStatusUserId === userId
                        ? 'Updating'
                        : user?.isBlocked
                          ? 'Blocked'
                          : 'Active'
                    }
                  />
                )}
              </div>

              {isLoading ? (
                <DataShimmer w="w-64" h="h-4" className="mt-2" />
              ) : (
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                  {user?.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> {user.email}
                    </span>
                  )}
                  {user?.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> {user.phone}
                    </span>
                  )}
                  {user?.createdAt && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Joined{' '}
                      {new Date(user.createdAt).toLocaleDateString()}
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
              changeUserBlockStatus({
                userId: userId,
                isBlocked: !(user?.isBlocked ?? false),
              })
            }
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border shadow-sm transition-all cursor-pointer ${
              user?.isBlocked
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'
                : 'bg-white dark:bg-muted/20 text-rose-600 border-slate-200 dark:border-border hover:bg-rose-50 dark:hover:bg-rose-950/30'
            }`}
          >
            {user?.isBlocked ? (
              <CircleCheck className="w-3.5 h-3.5" />
            ) : (
              <Ban className="w-3.5 h-3.5" />
            )}
            {user?.isBlocked ? 'Unblock User' : 'Block User'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabNavigation
            isAdmin={true}
            tab={selectedTab}
            setTab={setSelectedTab}
            tabArray={userTabs}
          />

          <TabsContent value={userTabs[0].value}>
            <AddressListing
              fetchApiFunction={() => fetchAddressByUserId(userId)}
              queryKey={[queryKeys.ADDRESS]}
              userOrProviderId={userId}
            />
          </TabsContent>

          <TabsContent value={userTabs[1].value}>
            <ListReviews userId={userId} isPage={false} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminUserDetails;
