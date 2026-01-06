import { X } from "lucide-react";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import LocationPicker from "../common/LocationPicker";
import { useDispatch, useSelector } from "react-redux";
import { ServiceCategory } from "@/utils/interface/enums";
import { setProviders } from "@/utils/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { userSearchServiceProviders } from "@/utils/apis/user.api";
import { ProviderCardsFilters } from "@/utils/interface/commonInterface";
import { Location } from "@/utils/interface/entityInterface/addressInterface";

interface FilterRightSideBarProps {
    onClose: () => void;
}

const FilterRightSideBar: React.FC<FilterRightSideBarProps> = ({ onClose }) => {

    const dispatch = useDispatch<AppDispatch>();
    const filterSideBarOpen = useSelector(
        (state: RootState) => state.app.filterSideBarOpen
    );

    const [filters, setFilters] = useState<ProviderCardsFilters>({
        maxPrice: 500,
        slotflowTrusted: false,
        categories: [] as ServiceCategory[],
        location: undefined,
    });

    const toggleCategory = (category: ServiceCategory) => {
        setFilters((prev) => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter((c) => c !== category)
                : [...prev.categories, category],
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

    const handleFilter = async () => {
        // TODO handleFilter
        console.log("filters : ", filters);
        const res = await userSearchServiceProviders({
            selectedServices: filters.appServiceIds,
            categories: filters.categories,
            location: filters.location,
            maxPrice: filters.maxPrice,
            slotflowTrusted: filters.slotflowTrusted
        });
        if (res) {
            dispatch(setProviders(res));
            toast.success(`${res.length > 0 ? "Filtered providers" : "No providers found"}`);
        };
    };

    const handleClearFilter = async () => {

    }

    return (
        <aside
            className={`
    fixed right-0 top-0 z-40 h-screen
    bg-[var(--menuBg)] border-l shadow-2xl
    transition-all duration-300
    ${filterSideBarOpen ? "w-[320px]" : "w-0"}
    overflow-hidden
  `}
        >
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Filters</h4>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <section>
                        <h5 className="font-medium mb-2">Price</h5>
                        <div className="flex justify-between text-sm mb-1">
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
                    </section>

                    <section>
                        <h5 className="font-medium mb-2">Slotflow</h5>
                        <div className="flex items-center justify-between">
                            <span>Slotflow Trusted</span>
                            <Checkbox
                                checked={filters.slotflowTrusted}
                                onCheckedChange={(checked) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        slotflowTrusted: Boolean(checked),
                                    }))
                                }
                            />
                        </div>
                    </section>

                    <section>
                        <h5 className="font-medium mb-2">Categories</h5>
                        <div className="space-y-2">
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
                    </section>

                    <section>
                        <h5 className="font-medium mb-2">Location</h5>
                        <LocationPicker onLocationSelect={handleLocationSelect} />
                    </section>
                </div>

                <div className="flex space-x-2 border-t bg-[var(--menuBg)] p-3 sticky bottom-0">
                    <Button
                        onClick={handleClearFilter}
                        className="w-1/2 cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    >Clear</Button>
                    <Button
                        onClick={handleFilter}
                        className="w-1/2 cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default FilterRightSideBar;
