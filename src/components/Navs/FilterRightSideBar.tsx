import { X } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RootState } from "@/utils/redux/appStore";
import LocationPicker from "../common/LocationPicker";
import { ServiceCategory } from "@/utils/interface/enums";
import { Location } from "@/utils/interface/entityInterface/addressInterface";

interface FilterRightSideBarProps {
    onClose: () => void;
}
interface Filters {
    maxPrice: number;
    slotflowTrusted: boolean;
    categories: ServiceCategory[];
    location?: Location;
}

const FilterRightSideBar: React.FC<FilterRightSideBarProps> = ({ onClose }) => {
    const filterSideBarOpen = useSelector(
        (state: RootState) => state.app.filterSideBarOpen
    );

    const [filters, setFilters] = useState<Filters>({
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
            location,
        }));
    };

    const handleFilter = () => {
        // TODO handleFilter
    };

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
                            value={[filters.maxPrice]}
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

                <div className="border-t bg-[var(--menuBg)] p-3 sticky bottom-0">
                    <Button
                        onClick={handleFilter}
                        className="w-full cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    >
                        Apply Filters
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default FilterRightSideBar;
