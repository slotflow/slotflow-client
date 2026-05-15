import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";
import { userFetchMyProfileDetails } from "@/shared/apis/user";
import ProfileListing from "@/components/profile/ProfileListing";
import { providerFetchMyProfileDetails } from "@/shared/apis/providerProfile";

const ProfileDetails: React.FC = () => {

  const { authUser } = useSelector((state: RootState) => state.auth);
  const isProvider = authUser?.role === "PROVIDER";

  const fetchApiFunction = isProvider
    ? providerFetchMyProfileDetails
    : userFetchMyProfileDetails;

  const shimmerRow = isProvider ? 8 : 6;
  if (!authUser) return null;

  return (
    <div className="min-h-full flex flex-col w-full">
      <ProfileListing
        fetchApiFunction={fetchApiFunction}
        queryKey="profileDetails"
        providerSelf={isProvider}
        userSelf={!isProvider}
        shimmerRow={shimmerRow}
      />
    </div>
  );
};

export default ProfileDetails;
