import React from "react";
import UserInfo from "./account/UserInfo";
import { Separator } from "../ui/separator";
import ProfileHead from "./account/ProfileHead";
import AddressListing from "../profile/AddressListing";
import { fetchMyAddress } from "@/shared/apis/address";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";
import { Role } from "@/shared/interface/enums";
import ProviderServiceList from "../profile/ProviderServiceList";
import { providerFetchServiceDetails } from "@/shared/apis/providerService";
import ProviderServiceAvailability from "../profile/ProviderServiceAvailability";

const AccountSettings: React.FC = () => {

  const authUser = useSelector((state: RootState) => state.auth.authUser);

  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Manage your account details and security settings
        </p>
      </div>
      <Separator className='my-4 flex-none' />
      <div className="space-y-2">
        <ProfileHead />
        <UserInfo />
        <AddressListing
          fetchApiFunction={fetchMyAddress}
          queryKey="myAddress"
          canUpdate={true}
        />
        {authUser?.role === Role.PROVIDER && (
          <>
            <ProviderServiceList
              fetchApiFunction={providerFetchServiceDetails}
              queryKey="providerService"
              canUpdate={true}
            />
            <ProviderServiceAvailability
              role={Role.PROVIDER}
              canUpdate={true}
            />
          </>
        )}
      </div>
    </>
  )
}

export default AccountSettings;
