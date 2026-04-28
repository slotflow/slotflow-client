import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ServiceCategory } from "@/shared/interface/enums";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { pushServiceCategory } from "@/shared/redux/slices/userSlice";

const UserServiceSelectPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { selectedCategories } = useSelector((store: RootState) => store.user);
    const navigate = useNavigate();

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

    return (
        <div className="p-2 min-h-full flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 min-h-full">
                {
                    Object.values(ServiceCategory).map((category) => {
                        const isSelected = selectedCategories?.includes(category);

                        return (
                            <div
                                key={category}
                                className={`p-3 rounded-md border cursor-pointer text-center ${isSelected
                                    ? "border-[var(--mainColor)]"
                                    : "border-gray-300"
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryToggle(category);
                                }}
                            >
                                {category}
                            </div>
                        );
                    })
                }
            </div>
            <div className="flex justify-end mt-6">
                <Button
                    title="Next"
                    className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    onClick={handleSubmitSelectedServices} >
                    Next
                </Button>
            </div>

        </div>
    );
};

export default UserServiceSelectPage;