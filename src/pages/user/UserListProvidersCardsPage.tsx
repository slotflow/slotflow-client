import { Loader } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { setProviders } from '@/shared/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/shared/redux/appStore';
import { toggleFilterSideBar } from '@/shared/redux/slices/appSlice';
import DataFetchingError from '@/components/error/DataFetchingError';
import UserViewProviderCard from '@/components/user/UserViewProviderCard';
import { fetchServiceProvidersForUser } from '@/shared/apis/providerService';

const UserListProvidersCardsPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { selectedCategories, providers, providerCardsfFlter } = useSelector((store: RootState) => store.user);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['providers', providerCardsfFlter],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchServiceProvidersForUser({
        ...providerCardsfFlter,
        skip: pageParam,
        limit: 12,
      });
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 12 ? allPages.length * 12 : undefined;
    },
  });

  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (data) {
      const flattenedProviders = data.pages.flat();
      dispatch(setProviders(flattenedProviders));
    };
  }, [selectedCategories, dispatch, data]);


  return (
    <div className="p-2 min-h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-md flex space-x-2">
          <Input type="text" placeholder="Search..." className="h-auto" />
          <Button
            title="Search"
            variant="default"
            className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
            onClick={() => dispatch(toggleFilterSideBar())} >
            Search
          </Button>
        </div>
        <Button
          title="Filters"
          variant="default"
          className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
          onClick={() => dispatch(toggleFilterSideBar())} >
          Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="flex-1 flex justify-center items-center z-50">
          <Loader className="w-10 h-10 animate-spin" />
        </div>
      ) : isError && error ? (
        <div className="flex-1 flex justify-center items-center">
          <DataFetchingError message={(error as Error).message || "Something went wrong"} />
        </div>
      ) : providers && providers.length > 0 ? (
        <React.Fragment>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
            {providers.map((provider, index) => (
              <UserViewProviderCard key={index} {...provider} />
            ))}
          </div>
          <div
            ref={loadMoreRef}
            className="h-12 flex items-center justify-center"
          >
            {isFetchingNextPage && (
              <div className="flex w-full justify-center gap-2">
                <p>Fetching more providers...</p>
                <Loader className="w-6 h-6 animate-spin" />
              </div>
            )}
          </div>
        </React.Fragment>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <DataFetchingError message="No providers found in the database" />
        </div>
      )}

    </div>
  );
};

export default UserListProvidersCardsPage;
