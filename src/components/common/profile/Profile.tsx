import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/utils/redux/appStore";
import { Edit, UserRoundPen, X } from "lucide-react";
import { userFetchUserProfileDetails } from "@/utils/apis/user.api";
import ProfileListing from "@/components/common/profile/ProfileListing";
import { handleUpdatedAtCheck } from "@/utils/helper/checkUpdatedAtDate";
import { providerFetchProviderProfileDetails } from "@/utils/apis/provider.api";
import UserInfoAddingOrUpdating from "@/components/common/UserInfoAddingOrUpdating";

const Profile: React.FC = () => {

  const { authUser } = useSelector((state: RootState) => state.auth);
  const [openUserInfoForm, setOpenUserInfoForm] = useState<boolean>(false);
  const isProvider = authUser?.role === "PROVIDER";

  const fetchApiFunction = isProvider
    ? providerFetchProviderProfileDetails
    : userFetchUserProfileDetails;

  const shimmerRow = isProvider ? 8 : 6;

  if (!authUser) return null;

  return (
    <div className="min-h-full flex flex-col w-full">

      <div className='flex justify-between border rounded-md p-2 items-center'>
        <div className="flex space-x-2">
          <UserRoundPen />
          <h2 className="text-xl font-semibold"> Profile Details</h2>
        </div>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={(e) =>
            handleUpdatedAtCheck({
              e,
              updatedAt: authUser?.updatedAt || "",
              errorMessage:
                "You can update your name and phone number only once every 30 days.",
              openUserInfoForm,
              setOpenUserInfoForm,
            })
          }
        >{openUserInfoForm ?
          <span className='flex items-center'><X className='mr-2' />Close</span>
          :
          <span className='flex items-center'><Edit className='mr-2' />  Edit Info</span>
          } </Button>
      </div>

      <ProfileListing
        fetchApiFunction={fetchApiFunction}
        queryKey="profileDetails"
        providerSelf={isProvider}
        userSelf={!isProvider}
        shimmerRow={shimmerRow}
      />

      {openUserInfoForm && (
        <UserInfoAddingOrUpdating
          title="Update your username and phone"
          setOpenUserInfoForm={setOpenUserInfoForm}
        />
      )}
    </div>
  );
};

export default Profile;
