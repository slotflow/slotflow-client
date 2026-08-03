import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Filter, LoaderCircle, Search } from 'lucide-react';
import { setProviders } from '@/shared/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/shared/redux/appStore';
import { toggleFilterSideBar } from '@/shared/redux/slices/appSlice';
import DataFetchingError from '@/components/error/DataFetchingError';
import UserViewProviderCard from '@/components/user/UserViewProviderCard';
import { fetchServiceProvidersForUser } from '@/shared/apis/providerService';
import { UserFetchServiceProvidersResponse } from '@/shared/interface/api/user';

/**
 * TODO implement the search
 */

const UserListProvidersCardsPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>("");
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
      return res.data as UserFetchServiceProvidersResponse[];
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length === 12 ? allPages.length * 12 : undefined;
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
      const flattenedProviders = data?.pages.flat();
      dispatch(setProviders(flattenedProviders));
    };
  }, [selectedCategories, dispatch, data]);


  return (
    <div className="p-2 min-h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-md flex space-x-2">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a service..."
              className="h-10 rounded-2xl border-0 bg-background pl-12 pr-4 ring-1 ring-border transition-all focus-visible:ring-1 focus-visible:ring-[var(--mainColor)]"
              />
              <div>
                {search}
              </div>
          </div>
          <Button
            title="Search"
            variant="default"
            className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
            onClick={() => dispatch(toggleFilterSideBar())} >
            Search
            <Search />
          </Button>
        </div>
        <Button
          title="Filters"
          variant="default"
          className="h-10 cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
          onClick={() => dispatch(toggleFilterSideBar())} >
           Filters
          <Filter/>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex-1 flex justify-center items-center z-50">
          <LoaderCircle className="w-10 h-10 animate-spin" />
        </div>
      ) : isError && error ? (
        <div className="flex-1 flex justify-center items-center">
          <DataFetchingError message={(error as Error).message || "Something went wrong"} />
        </div>
      ) : providers && providers.length > 0 ? (
        <>
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
                <LoaderCircle className="w-6 h-6 animate-spin" />
              </div>
            )}
          </div>
        </>
      ) : (
        <DataFetchingError message="No providers found in the database" />
      )}
    </div>
  );
};

export default UserListProvidersCardsPage;
