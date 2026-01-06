import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setProviders } from '@/utils/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { userSearchServiceProviders } from '@/utils/apis/user.api';
import { toggleFilterSideBar } from '@/utils/redux/slices/appSlice';
import DataFetchingError from '@/components/common/DataFetchingError';
import UserViewProviderCard from '@/components/user/UserViewProviderCard';

const UserDashboardPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { selectedCategories, providers } = useSelector((store: RootState) => store.user);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => userSearchServiceProviders({
      categories: selectedCategories,
    }),
    queryKey: ['providers', selectedCategories],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log("data : ",data);
    if(data) {
      dispatch(setProviders(data));
    };
  }, [ selectedCategories, dispatch, data ]);
  
  console.log("providers : ",providers);

  return (
    <div className="p-2 min-h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-md flex space-x-2">
          <Input type="text" placeholder="Search..." className="h-auto" />
          <Button
            variant="default"
            className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
            onClick={() => dispatch(toggleFilterSideBar())} >
            Search
          </Button>
        </div>
        <Button
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
          {providers.map((provider, index) => (
            <UserViewProviderCard key={index} {...provider} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <DataFetchingError message="No providers found in the database" />
        </div>
      )}

    </div>
  );
};

export default UserDashboardPage;
