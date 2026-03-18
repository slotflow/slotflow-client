import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import LocationPicker from "../common/LocationPicker";
import { useDispatch, useSelector } from "react-redux";
import { ServiceCategory } from "@/utils/interface/enums";
import FilterCompHeader from "../common/FilterCompHeader";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { userFetchAllAppServices } from "@/utils/apis/user.api";
import { toggleFilterSideBar } from "@/utils/redux/slices/appSlice";
import { setProviderCardsFilter } from "@/utils/redux/slices/userSlice";
import { ProviderCardsFilters } from "@/utils/interface/commonInterface";
import { Location } from "@/utils/interface/entityInterface/addressInterface";
import { BookCheck, ChartBarStacked, IndianRupee, Locate, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";


const FilterRightSideBar: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { selectedCategories } = useSelector((state: RootState) => state.user);
    const { filterSideBarOpen } = useSelector((state: RootState) => state.app);

    const [showMapFilter, setShowMapFilter] = useState<boolean>(true);
    const [showPriceFilter, setShowPriceFilter] = useState<boolean>(true);
    const [showTrustedFilter, setShowTrustedFilter] = useState<boolean>(true);
    const [showServicesFilter, setShowServicesFilter] = useState<boolean>(true);
    const [showCategoriesFilter, setShowCategoriesFilter] = useState<boolean>(true);

    const [filters, setFilters] = useState<ProviderCardsFilters>({
        appServiceIds: [] as string[],
        maxPrice: 0,
        minPrice: 0,
        slotflowTrusted: false,
        categories: [] as ServiceCategory[],
        location: undefined,
        skip: 0,
        limit: 12,
    });

    useEffect(() => {
        if (selectedCategories.length === 0) return;

        setFilters(prev => ({
            ...prev,
            categories: Array.from(new Set([
                ...prev.categories,
                ...selectedCategories,
            ])),
        }));
    }, [selectedCategories]);

    const { data, isLoading } = useQuery({
        queryFn: () => userFetchAllAppServices(filters.categories),
        queryKey: ["appServices", filters.categories],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
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
                type: "Point",
                coordinates: [location.lon, location.lat],
            },
        }));
    };

    const handleApplyFilter = async () => {
        if (filters?.minPrice > filters?.maxPrice) {
            toast.warn("min price must be lower than max price");
            return;
        };
        dispatch(setProviderCardsFilter(filters));
    };

    const handleClearFilter = () => {
        dispatch(setProviderCardsFilter({
            categories: [],
            appServiceIds: [],
            location: undefined,
            maxPrice: 0,
            minPrice: 0,
            slotflowTrusted: false,
            skip: 0,
            limit: 12,
        }));
    };

    return (
        <Sheet open={filterSideBarOpen} onOpenChange={() => dispatch(toggleFilterSideBar())}>
            <SheetContent className="w-[320px] sm:w-[400px] bg-[var(--menuBg)] border-l flex flex-col p-6 shadow-2xl">
                <SheetHeader className="mb-4">
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                        <SlidersHorizontal className="w-5 h-5 text-[var(--mainColor)]" />
                        Filters
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-6 no-scrollbar">

                    <section>
                        <FilterCompHeader
                            isOpen={showTrustedFilter}
                            onToggle={() => setShowTrustedFilter(prev => !prev)}
                            title="Slotflow"
                            Icon={BookCheck}
                        />

                        <div className={`grid transition-all duration-300 ease-in-out ${showTrustedFilter ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                            <div className="overflow-hidden">
                                <div className="flex items-center justify-between text-sm py-2 px-1">
                                    <span>Slotflow Trusted</span>
                                    <Checkbox
                                        checked={filters.slotflowTrusted}
                                        onCheckedChange={(checked) =>
                                            setFilters(prev => ({ ...prev, slotflowTrusted: Boolean(checked), }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <FilterCompHeader
                            isOpen={showPriceFilter}
                            onToggle={() => setShowPriceFilter(prev => !prev)}
                            title="Price"
                            Icon={IndianRupee}
                        />
                        <div className={`grid transition-all duration-300 ease-in-out ${showPriceFilter ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
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
                            onToggle={() => setShowCategoriesFilter(prev => !prev)}
                            title="Categories"
                            Icon={ChartBarStacked}
                        />
                        <div className={`grid transition-all duration-300 ease-in-out ${showCategoriesFilter ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
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

                    <section>
                        {(isLoading || data) && (
                            <FilterCompHeader
                                isOpen={showServicesFilter}
                                onToggle={() => setShowServicesFilter(prev => !prev)}
                                title="Services"
                                Icon={ChartBarStacked}
                            />
                        )}
                        <div className={`grid transition-all duration-300 ease-in-out ${showServicesFilter ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                            <div className="overflow-hidden px-1">
                                {isLoading ? (
                                    <div className="space-y-2">
                                        {[...Array(3)].map((_, index) => (
                                            <div key={index} className="w-full h-4 shimmer" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {data?.map(service => (
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

                    <section>
                        <FilterCompHeader
                            isOpen={showMapFilter}
                            onToggle={() => setShowMapFilter(prev => !prev)}
                            title="Location"
                            Icon={Locate}
                        />
                        <div className={`grid transition-all duration-300 ease-in-out ${showMapFilter ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                            <LocationPicker onLocationSelect={handleLocationSelect} />
                        </div>
                    </section>
                </div>

                <div className="flex space-x-2 border-t bg-[var(--menuBg)] p-3 sticky bottom-0">
                    <Button
                        title="Clear"
                        onClick={handleClearFilter}
                        className="w-1/2 cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    >Clear</Button>
                    <Button
                        title="Apply"
                        onClick={handleApplyFilter}
                        className="w-1/2 cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    >
                        Apply
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default FilterRightSideBar;
