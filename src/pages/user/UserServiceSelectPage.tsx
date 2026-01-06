import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { ServiceCategory } from "@/utils/interface/enums";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { pushServiceCategory } from "@/utils/redux/slices/userSlice";
// import DataFetchingError from "@/components/common/DataFetchingError";
// import ServiceSelectShimmer from "@/components/shimmers/ServiceSelectShimmer";
// import { userFetchAllServicesForServiceSelectPage } from "@/utils/apis/user.api";
// import { UserFetchAllServicesResponse } from "@/utils/interface/api/userApiInterface";

const UserServiceSelectPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { selectedCategories } = useSelector((store: RootState) => store.user);
    const navigate = useNavigate();

    // const { data, isLoading, isError, error } = useQuery({
    //     queryFn: userFetchAllServicesForServiceSelectPage,
    //     queryKey: ["services"],
    //     staleTime: 5 * 60 * 1000,
    //     refetchOnWindowFocus: false,
    // });

    // const handleServiceToggle = (serviceId: string) => {
    //     const currentServices = selectedServices ?? [];
    //     if (currentServices.includes(serviceId)) {
    //         dispatch(pushService(currentServices.filter((id) => id !== serviceId)));
    //     } else {
    //         dispatch(pushService([...currentServices, serviceId]));
    //     }
    // };

    const handleCategoryToggle = (category: ServiceCategory) => {
        const currentCategories = selectedCategories ?? [];
        if (currentCategories.includes(category)) {
            dispatch(pushServiceCategory(currentCategories.filter((excategory) => excategory !== category)));
        } else {
            dispatch(pushServiceCategory([...currentCategories, category]));
        }
    }

    const handleSubmitSelectedServices = async () => {
        navigate('/user/dashboard');
    }

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
                    className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                    onClick={handleSubmitSelectedServices} >Next</Button>
            </div>

        </div>
    );
};

export default UserServiceSelectPage;