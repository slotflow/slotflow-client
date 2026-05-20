import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";
import { fetchMyAddress } from "@/shared/apis/address";
import UserProfile from "@/components/user/UserProfile";
import { userFetchMyProfileDetails } from "@/shared/apis/user";
import AddressListing from "@/components/profile/AddressListing";
import ProfileListing from "@/components/profile/ProfileListing";
import DataFetchingError from "@/components/error/DataFetchingError";

const UserAccountPage: React.FC = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);

    if (!authUser) return <DataFetchingError message="User not found" />;

    return (
        <UserProfile
            username={authUser.username}
            profileImage={authUser.profileImage || ""}
            profile={<ProfileListing fetchApiFunction={userFetchMyProfileDetails} queryKey="userProfile" shimmerRow={5} userSelf />}
            role={authUser.role}
            address={<AddressListing fetchApiFunction={fetchMyAddress} queryKey="userAddress" />}
        />
    )
}

export default UserAccountPage;