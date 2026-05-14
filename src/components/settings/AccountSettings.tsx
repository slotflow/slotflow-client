import React from "react";
import { useSelector } from "react-redux";
import UserInfo from "./account/UserInfo";
import { RootState } from "@/shared/redux/appStore";

const AccountSettings: React.FC = () => {

  const { authUser } = useSelector((state: RootState) => state.auth);

  if (!authUser) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Manage your account details and security settings
        </p>
      </div>
      <UserInfo authUser={authUser} />
      {/* Address */}
      {/* Provider service */}
      {/* Provider service availability */}
    </div>
  )
}

export default AccountSettings;
