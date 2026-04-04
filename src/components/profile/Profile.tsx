import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Edit, UserRoundPen } from "lucide-react";
import { RootState } from "@/shared/redux/appStore";
import { useEffect, useRef, useState } from "react";
import { slideIn } from "@/shared/helper/gsapAnimationSlide";
import { userFetchMyProfileDetails } from "@/shared/apis/user";
import UserInfoCRUDForm from "@/components/form/UserInfoCRUDForm";
import ProfileListing from "@/components/profile/ProfileListing";
import { providerFetchMyProfileDetails } from "@/shared/apis/provider";

const Profile: React.FC = () => {

  const { authUser } = useSelector((state: RootState) => state.auth);
  const isProvider = authUser?.role === "PROVIDER";

  const fetchApiFunction = isProvider
    ? providerFetchMyProfileDetails
    : userFetchMyProfileDetails;

  const shimmerRow = isProvider ? 8 : 6;

  const [showForm, setShowForm] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && formRef.current) {
      slideIn(formRef.current);
    }
  }, [showForm]);

  if (!authUser) return null;

  return (
    <div className="min-h-full flex flex-col w-full">

      <div className='flex justify-between border rounded-md p-2 items-center mb-2'>
        <div className="flex space-x-2">
          <UserRoundPen />
          <h2 className="text-xl font-semibold"> Profile Details</h2>
        </div>
        <Button
          title="Edit Info"
          variant="default"
          className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(true);
          }}
        ><span className='flex items-center'><Edit className='mr-2' />  Edit Info</span></Button>
      </div>

      <ProfileListing
        fetchApiFunction={fetchApiFunction}
        queryKey="profileDetails"
        providerSelf={isProvider}
        userSelf={!isProvider}
        shimmerRow={shimmerRow}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <UserInfoCRUDForm
            onClose={() => setShowForm(false)}
            formRef={formRef}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
