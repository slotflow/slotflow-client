import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useQuery } from '@tanstack/react-query';
import LocationPicker from '../map/LocationPicker';
import { Checkbox } from '@/components/ui/checkbox';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceCategory } from '@/shared/types/enums';
import { Location } from '@/shared/types/entity/address';
import FilterCompHeader from '../filters/FilterCompHeader';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { fetchServicesByCategory } from '@/services/apis/service';
import { toggleFilterSideBar } from '@/app/store/slices/appSlice';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { BookCheck, ChartBarStacked, IndianRupee, Locate, SlidersHorizontal } from 'lucide-react';

export interface LocalFilterState {
  categories: ServiceCategory[];
  appServiceIds: string[];
  minPrice: number;
  maxPrice: number;
  slotflowTrusted: boolean;
  location?: {
    type: string;
    coordinates: [number, number];
  };
}

const FilterRightSideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFilterSideBarOpen } = useSelector((state: RootState) => state.app);

  const [showMapFilter, setShowMapFilter] = useState<boolean>(true);
  const [showPriceFilter, setShowPriceFilter] = useState<boolean>(true);
  const [showTrustedFilter, setShowTrustedFilter] = useState<boolean>(true);
  const [showServicesFilter, setShowServicesFilter] = useState<boolean>(true);
  const [showCategoriesFilter, setShowCategoriesFilter] = useState<boolean>(true);

  const [filters, setFilters] = useState<LocalFilterState>({
    categories: [],
    appServiceIds: [],
    minPrice: 0,
    maxPrice: 30000,
    slotflowTrusted: false,
    location: undefined,
  });

  useEffect(() => {
    if (!isFilterSideBarOpen) return;

    const categoriesParam = searchParams.get('categories');
    const servicesParam = searchParams.get('services');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const trustedParam = searchParams.get('trusted');
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon');

    setFilters({
      categories: categoriesParam ? (categoriesParam.split(',') as ServiceCategory[]) : [],
      appServiceIds: servicesParam ? servicesParam.split(',') : [],
      minPrice: minPriceParam ? Number(minPriceParam) : 0,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : 30000,
      slotflowTrusted: trustedParam === 'true',
      location: latParam && lonParam ? { type: 'Point', coordinates: [Number(lonParam), Number(latParam)] } : undefined,
    });
  }, [isFilterSideBarOpen, searchParams]);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetchServicesByCategory(filters.categories);
      return res.data;
    },
    queryKey: [queryKeys.APP_SERVICES, filters.categories],
    enabled: filters.categories.length > 0,
  });

  const toggleCategory = (category: ServiceCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleAppServiceIds = (appServiceId: string) => {
    setFilters((prev) => ({
      ...prev,
      appServiceIds: prev.appServiceIds.includes(appServiceId)
        ? prev.appServiceIds.filter((id) => id !== appServiceId)
        : [...prev.appServiceIds, appServiceId],
    }));
  };

  const handleLocationSelect = (location: Location) => {
    setFilters((prev) => ({
      ...prev,
      location: {
        type: 'Point',
        coordinates: [location.lon, location.lat],
      },
    }));
  };

  const handleApplyFilter = () => {
    if (filters.minPrice > filters.maxPrice) {
      toast.warn('Min price must be lower than Max price');
      return;
    }

    const newParams = new URLSearchParams(searchParams);

    // Categories
    if (filters.categories.length > 0) {
      newParams.set('categories', filters.categories.join(','));
    } else {
      newParams.delete('categories');
    }

    // App Service IDs
    if (filters.appServiceIds.length > 0) {
      newParams.set('services', filters.appServiceIds.join(','));
    } else {
      newParams.delete('services');
    }

    // Prices
    if (filters.minPrice > 0) newParams.set('minPrice', filters.minPrice.toString());
    else newParams.delete('minPrice');

    if (filters.maxPrice < 30000) newParams.set('maxPrice', filters.maxPrice.toString());
    else newParams.delete('maxPrice');

    // Trusted
    if (filters.slotflowTrusted) newParams.set('trusted', 'true');
    else newParams.delete('trusted');

    // Location
    if (filters.location?.coordinates) {
      newParams.set('lon', filters.location.coordinates[0].toString());
      newParams.set('lat', filters.location.coordinates[1].toString());
    } else {
      newParams.delete('lon');
      newParams.delete('lat');
    }

    setSearchParams(newParams);
    dispatch(toggleFilterSideBar());
  };

  const handleClearFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    ['categories', 'services', 'minPrice', 'maxPrice', 'trusted', 'lat', 'lon'].forEach((key) =>
      newParams.delete(key),
    );
    setSearchParams(newParams);
    dispatch(toggleFilterSideBar());
  };

  return (
    <Sheet open={isFilterSideBarOpen} onOpenChange={() => dispatch(toggleFilterSideBar())}>
      <SheetContent className="w-[320px] sm:w-[400px] bg-[var(--menuBg)] border-l flex flex-col p-6 shadow-2xl">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold">
            <SlidersHorizontal className="size-5 text-[var(--mainColor)]" />
            Filters
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-6 no-scrollbar">
          <section>
            <FilterCompHeader
              isOpen={showTrustedFilter}
              onToggle={() => setShowTrustedFilter((prev) => !prev)}
              title="Slotflow"
              Icon={BookCheck}
            />

            <div
              className={`grid transition-all duration-300 ease-in-out ${showTrustedFilter ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="flex items-center justify-between text-sm py-2 px-1">
                  <span>Slotflow Trusted</span>
                  <Checkbox
                    checked={filters.slotflowTrusted}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({ ...prev, slotflowTrusted: Boolean(checked) }))
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <FilterCompHeader
              isOpen={showPriceFilter}
              onToggle={() => setShowPriceFilter((prev) => !prev)}
              title="Price"
              Icon={IndianRupee}
            />
            <div
              className={`grid transition-all duration-300 ease-in-out ${showPriceFilter ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden px-1">
                <div className="space-y-3 pb-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Min price</span>
                    <span>₹ {filters.minPrice}</span>
                  </div>
                  <Slider
                    value={[filters.minPrice!]}
                    max={30000}
                    step={100}
                    onValueChange={([value]) =>
                      setFilters((prev) => ({ ...prev, minPrice: value }))
                    }
                  />
                  <div className="flex justify-between text-sm mb-2">
                    <span>Max price</span>
                    <span>₹ {filters.maxPrice}</span>
                  </div>
                  <Slider
                    value={[filters.maxPrice!]}
                    max={30000}
                    step={100}
                    onValueChange={([value]) =>
                      setFilters((prev) => ({ ...prev, maxPrice: value }))
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <FilterCompHeader
              isOpen={showCategoriesFilter}
              onToggle={() => setShowCategoriesFilter((prev) => !prev)}
              title="Categories"
              Icon={ChartBarStacked}
            />
            <div
              className={`grid transition-all duration-300 ease-in-out ${showCategoriesFilter ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden px-1">
                <div className="space-y-2 pb-2">
                  {Object.values(ServiceCategory).map((category) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm">{category}</span>
                      <Checkbox
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {filters.categories.length > 0 && (
            <section>
              <FilterCompHeader
                isOpen={showServicesFilter}
                onToggle={() => setShowServicesFilter((prev) => !prev)}
                title="Services"
                Icon={ChartBarStacked}
              />
              <div
                className={`grid transition-all duration-300 ease-in-out ${showServicesFilter ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden px-1">
                  {isLoading ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="w-full h-4 shimmer" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {data?.map((service) => (
                        <div key={service._id} className="flex items-center justify-between">
                          <span className="text-sm">{service.serviceName}</span>
                          <Checkbox
                            checked={filters.appServiceIds.includes(service._id)}
                            onCheckedChange={() => toggleAppServiceIds(service._id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          <section>
            <FilterCompHeader
              isOpen={showMapFilter}
              onToggle={() => setShowMapFilter((prev) => !prev)}
              title="Location"
              Icon={Locate}
            />
            <div
              className={`grid transition-all duration-300 ease-in-out ${showMapFilter ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <LocationPicker onLocationSelect={handleLocationSelect} />
            </div>
          </section>
        </div>

        <div className="flex space-x-2 border-t bg-[var(--menuBg)] p-3 sticky bottom-0">
          <Button
            variant="secondary"
            size='sm'
            title="Clear"
            onClick={handleClearFilter}
            className="w-1/2"
          >
            Clear
          </Button>
          <Button
            variant="secondary"
            size='sm'
            title="Apply"
            onClick={handleApplyFilter}
            className="w-1/2"
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterRightSideBar;
