import { useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/app/store/appStore';
import { ServiceCategory } from '@/shared/types/enums';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toggleFilterSideBar } from '@/app/store/slices/appSlice';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import { UserViewProviderCardProps } from '@/shared/types/component';
import DataFetchingError from '@/components/error/DataFetchingError';
import { Filter, LoaderCircle, Search, SearchIcon, Sparkles } from 'lucide-react';
import UserViewProviderCard from '@/components/user/UserViewProviderCard';
import { UserFetchServiceProvidersResponse } from '@/shared/types/api/user';
import { fetchServiceProvidersForUser } from '@/services/apis/providerService';
import { AnimatedPlaceholderInput } from '@/components/animation/AnimatedPlaceholderInput';

const UserListProvidersCards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>('');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [providers, setProviders] = useState<Array<UserViewProviderCardProps>>([]);

  const queryFilters = useMemo(() => {
    const categoriesParam = searchParams.get('categories');
    const servicesParam = searchParams.get('services');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const trusted = searchParams.get('trusted');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const searchQuery = searchParams.get('q');

    return {
      categories: categoriesParam ? (categoriesParam.split(',') as ServiceCategory[]) : [],
      appServiceIds: servicesParam ? servicesParam.split(',') : [],
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      slotflowTrusted: trusted === 'true',
      location: lat && lon ? { type: 'Point', coordinates: [Number(lon), Number(lat)] as [number, number] } : undefined,
      search: searchQuery || undefined,
    };
  }, [searchParams]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      // Key includes queryFilters so query automatically re-runs when URL params update
      queryKey: [queryKeys.PROVIDERS, queryFilters],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await fetchServiceProvidersForUser({
          ...queryFilters,
          skip: pageParam,
          limit: 12,
        });
        return res.data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length === 12 ? allPages.length * 12 : undefined;
      },
    });


  const handleSearchSubmit = () => {
    const newParams = new URLSearchParams(searchParams);
    if (search.trim()) {
      newParams.set('q', search.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (data) {
      const validProviders = data.pages
        .flat()
        .filter((page): page is UserFetchServiceProvidersResponse => Boolean(page));

      setProviders(validProviders);
    }
  }, [data]);

  return (
    <div className="min-h-full flex flex-col space-y-8 mx-auto w-full">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 border-b border-border/40">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">
            Service Professionals
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover and book top-rated experts in your area
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="relative flex-1 sm:w-80 group">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <AnimatedPlaceholderInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              onSearchSubmit={handleSearchSubmit}
            />
            <Button
              size="sm"
              onClick={handleSearchSubmit}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-3 rounded-lg text-xs font-medium shadow-none"
            >
              Search
            </Button>
          </div>

          <Button
            variant="outline"
            size="default"
            onClick={() => dispatch(toggleFilterSideBar())}
            className="h-11 px-4 rounded-xl border-border/60 bg-background/50 backdrop-blur-md hover:bg-accent/50 hover:border-border transition-all flex items-center gap-2 shadow-sm font-medium"
          >
            <Filter className="size-4 text-muted-foreground" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full blur-md bg-primary/20 animate-pulse" />
            <LoaderCircle className="size-10 text-primary animate-spin relative z-10" />
          </div>
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Curating service providers...
          </p>
        </div>
      ) : isError && error ? (
        <div className="flex-1 flex items-center justify-center min-h-[400px] p-6 rounded-2xl bg-destructive/5 border border-destructive/10">
          <DataFetchingError message={(error as Error).message || 'Something went wrong'} />
        </div>
      ) : providers && providers.length > 0 ? (
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-3">
            {providers.map((provider, index) => (
              <div
                key={index}
                className="group transition-all duration-300 hover:-translate-y-1"
              >
                <UserViewProviderCard {...provider} />
              </div>
            ))}
          </div>

          <div ref={loadMoreRef} className="py-8 flex items-center justify-center min-h-[80px]">
            {isFetchingNextPage ? (
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary/80 backdrop-blur-md border border-border/50 text-xs font-medium text-secondary-foreground shadow-sm animate-fade-in">
                <LoaderCircle className="size-4 animate-spin text-primary" />
                <span>Loading additional providers...</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-center p-8 rounded-2xl border border-dashed border-border/80 bg-muted/20">
          <div className="size-14 rounded-2xl bg-background border border-border/60 shadow-sm flex items-center justify-center mb-4">
            <Sparkles className="size-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            No service providers found
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            We couldn't find any experts matching your search criteria. Try adjusting your search term or clearing filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearch('')}
            className="mt-5 rounded-xl border-border/60"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserListProvidersCards;
