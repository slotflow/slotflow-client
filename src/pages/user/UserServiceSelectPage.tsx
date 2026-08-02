import { cn } from "@/lib/utils";
import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import MoveUpward from "@/components/animation/MoveUpward";
import { ServiceCategory } from "@/shared/interface/enums";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { defaultButtonClassName } from "@/shared/utils/constants";
import { pushServiceCategory } from "@/shared/redux/slices/userSlice";

const UserServiceSelectPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [search, setSearch] = useState<string>("");
    const { selectedCategories } = useSelector((store: RootState) => store.user);

    /**
     * Toggles a service category in the user's selected categories.
     * @param category 
     */
    const handleCategoryToggle = (category: ServiceCategory) => {
        const currentCategories = selectedCategories ?? [];
        if (currentCategories.includes(category)) {
            dispatch(pushServiceCategory(currentCategories.filter((excategory) => excategory !== category)));
        } else {
            dispatch(pushServiceCategory([...currentCategories, category]));
        };
    };

    const handleSubmitSelectedServices = async () => {
        navigate('/user/dashboard');
    };

    const filteredCategories = Object.values(ServiceCategory).filter((category) =>
        category.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <div className="p-2 min-h-full flex flex-col">
            <MoveUpward>

                <div className="mx-auto flex w-full max-w-3xl flex-col items-center space-y-8 py-6 text-center">
                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold tracking-tight">
                            What are you looking for?
                        </h1>
                    </div>
                    <div className="relative w-full max-w-xl">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search for a service..."
                            className="h-12 rounded-2xl border-0 bg-background pl-12 pr-4 ring-1 ring-border transition-all focus-visible:ring-1 focus-visible:ring-[var(--mainColor)]"
                        />
                    </div>
                </div>
            </MoveUpward>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
                {
                    filteredCategories.map((category, index) => {
                        const isSelected = selectedCategories?.includes(category);
                        return (
                            <motion.button
                                key={category}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    duration: 0.35,
                                    delay: index * 0.06,
                                    ease: "easeOut",
                                }}
                                whileHover={{
                                    y: -6,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryToggle(category);
                                }}
                                className={cn(
                                    "group relative flex h-full w-full cursor-pointer flex-col rounded-2xl border bg-background p-4 text-center transition-colors shadow-md",
                                    isSelected
                                        ? "border-[var(--mainColor)] bg-[var(--mainColor)]/5 shadow-md"
                                        : "border-border hover:border-[var(--mainColor)]/40"
                                )}
                            >
                                <h3 className="font-semibold">{category}</h3>
                            </motion.button>
                        );
                    })
                }
            </div>
            <div className="flex justify-end mt-6 space-x-2">
                <Button
                    title="Skip"
                    variant="secondary"
                    className={defaultButtonClassName}
                    onClick={handleSubmitSelectedServices} >
                    Skip
                </Button>
                <Button
                    title="Next"
                    variant="default"
                    className={defaultButtonClassName}
                    onClick={handleSubmitSelectedServices} >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default UserServiceSelectPage;