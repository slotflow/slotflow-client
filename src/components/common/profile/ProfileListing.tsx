import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/utils/redux/appStore";
import DataFetchingError from "../DataFetchingError";
import InfoDisplayComponent from "../InfoDisplayComponent";
import { copyToClipboard, formatDate } from "@/utils/helper";
import ProfileDetailsShimmer from "@/components/shimmers/ProfileDetailsShimmer";
import { ProviderFetchProfileDetailsResponse } from "@/utils/interface/api/providerApiInterface";
import { AdminFetchUserProfileDetailsResponse } from "@/utils/interface/api/adminUserApiInterface";
import { AdminFetchProviderProfileDetailsResponse } from "@/utils/interface/api/adminProviderApiInterface";
import { UserFetchProviderProfileDetailsResponse, UserFetchUserProfileDetailsResponse } from "@/utils/interface/api/userApiInterface";

interface UserOrProviderProfileDetailsComponentProps {
    userOrProviderId?: string;
    fetchApiFunction: (userOrProviderId?: string) => Promise<
        AdminFetchProviderProfileDetailsResponse |
        ProviderFetchProfileDetailsResponse |
        UserFetchProviderProfileDetailsResponse |
        UserFetchUserProfileDetailsResponse |
        AdminFetchUserProfileDetailsResponse
    >;
    queryKey: string;
    adminLookingProvider?: boolean;
    adminLookingUser?: boolean;
    providerSelf?: boolean;
    userSelf?: boolean;
    userLookingProvider?: boolean;
    setProfileImage?: (image: string) => void;
    shimmerRow: number;
    setSelectedUserData?: (data: { selectedUserName: string; selectedUserProfileImage: string | null }) => void;
}

const ProfileListing: React.FC<UserOrProviderProfileDetailsComponentProps> = ({
    userOrProviderId,
    fetchApiFunction,
    queryKey,
    adminLookingProvider,
    adminLookingUser,
    providerSelf,
    userSelf,
    userLookingProvider,
    setProfileImage,
    shimmerRow,
    setSelectedUserData
}) => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(userOrProviderId),
        queryKey: [queryKey,userOrProviderId],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    console.log("data : ",data);

    useEffect(() => {
        if (data) {
            if (setProfileImage && "profileImage" in data && data.profileImage) {
                setProfileImage(data.profileImage);
            };

            if ((userLookingProvider || adminLookingProvider || adminLookingUser)&& "username" in data && setSelectedUserData) {
                setSelectedUserData({
                    selectedUserName: data.username,
                    selectedUserProfileImage: "profileImage" in data ? data.profileImage : null
                });
            };
        };

    }, [data, setProfileImage, setSelectedUserData, userLookingProvider, adminLookingProvider,adminLookingUser]);

    if (isError) {
        return <DataFetchingError message={error?.message} />
    };

    if (isLoading) {
        return <ProfileDetailsShimmer row={shimmerRow || 7} className="mt-2" />
    };

    return (
        <div className=" border rounded-md overflow-hidden w-full mt-2 md:mt-0">
            <table className="table-auto w-full">
                <tbody className="w-1/2">

                    {/* Admin looking provider profile */}
                    {adminLookingProvider && (() => {
                        const providerProfileData = data as (AdminFetchProviderProfileDetailsResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={providerProfileData.username} />
                                <InfoDisplayComponent label="Email" value={providerProfileData.email} copyToClipboard={copyToClipboard} />
                                <InfoDisplayComponent label="Phone Number" value={providerProfileData.phone ?? 'Not yet added'} />
                                <InfoDisplayComponent label="Slotflow Trusted" value={providerProfileData.trustedBySlotflow} isBoolean={true} />
                                <InfoDisplayComponent label="Email Verified" value={providerProfileData.isEmailVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Account Blocked" value={providerProfileData.isBlocked} isBoolean={true} />
                                <InfoDisplayComponent label="Admin Verified" value={providerProfileData.isAdminVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Verification Status" value={providerProfileData.adminVerificationStatus} />
                                <InfoDisplayComponent label="Address Verified" value={providerProfileData.isAddressVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Service Details Verified" value={providerProfileData.isServiceDetailsVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Availability Verified" value={providerProfileData.isAvailabilityVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Proofs Verified" value={providerProfileData.isProofsVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Joined On" value={providerProfileData.createdAt} formatDate={formatDate} isLast />
                            </>
                        );
                    })()}

                    {/* Admin looking user profile */}
                    {adminLookingUser && (() => {
                        const userProfileData = data as (AdminFetchUserProfileDetailsResponse)
                        return (
                            <>
                            <InfoDisplayComponent label="Username" value={userProfileData.username} />
                            <InfoDisplayComponent label="Email" value={userProfileData.email} copyToClipboard={copyToClipboard} />
                            <InfoDisplayComponent label="Phone Number" value={userProfileData.phone ?? 'Not yet added'} />
                            <InfoDisplayComponent label="Email Verified" value={userProfileData.isEmailVerified} isBoolean={true} />
                            <InfoDisplayComponent label="Account Blocked" value={userProfileData.isBlocked} isBoolean={true} isLast />
                            </>
                        )
                    })()}

                    {/* Provider looking self profile */}
                    {providerSelf && (() => {
                        const providerProfileData = data as (ProviderFetchProfileDetailsResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={authUser?.username || providerProfileData.username} />
                                <InfoDisplayComponent label="Email" value={authUser?.email || providerProfileData.email} />
                                <InfoDisplayComponent label="Phone Number" value={authUser?.phone || providerProfileData.phone || 'Not yet added'} />
                                <InfoDisplayComponent label="Slotflow Trusted" value={providerProfileData.trustedBySlotflow} isBoolean={true} />
                                <InfoDisplayComponent label="Joined On" value={providerProfileData.createdAt} formatDate={formatDate} />
                                <InfoDisplayComponent label="Address" value={authUser?.isAddressAdded} isBoolean={true} />
                                <InfoDisplayComponent label="Service Details" value={authUser?.isServiceDetailsAdded} isBoolean={true} />
                                <InfoDisplayComponent label="Availability Details" value={authUser?.isServiceAvailabilityAdded} isBoolean={true} />
                                <InfoDisplayComponent label="Subscription" value={authUser?.providerSubscription} />
                                <InfoDisplayComponent label="Email Verified" value={providerProfileData.isEmailVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Account Blocked" value={providerProfileData.isBlocked} isBoolean={true} />
                                <InfoDisplayComponent label="Admin Verified" value={providerProfileData.isAdminVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Verification Status" value={providerProfileData.adminVerificationStatus} />
                                <InfoDisplayComponent label="Address Verified" value={providerProfileData.isAddressVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Service Details Verified" value={providerProfileData.isServiceDetailsVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Availability Verified" value={providerProfileData.isAvailabilityVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Proofs Verified" value={providerProfileData.isProofsVerified} isBoolean={true} isLast />
                            </>
                        );
                    })()}

                    {/* User looking provider profile */}
                    {userLookingProvider && (() => {
                        const providerProfileData = data as (UserFetchProviderProfileDetailsResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={providerProfileData.username} />
                                <InfoDisplayComponent label="Email" value={providerProfileData.email} copyToClipboard={copyToClipboard} />
                                <InfoDisplayComponent label="Phone Number" value={providerProfileData.phone ?? 'Not yet added'} />
                                <InfoDisplayComponent label="Slotflow Trusted" value={providerProfileData.trustedBySlotflow} isBoolean={true} isLast />
                            </>
                        );
                    })()}

                    {/* User looking self profile */}
                    {userSelf && (() => {
                        const userProfileData = data as (UserFetchUserProfileDetailsResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={authUser?.username || userProfileData?.username} />
                                <InfoDisplayComponent label="Email" value={authUser?.email || userProfileData?.email} />
                                <InfoDisplayComponent label="Phone Number" value={authUser?.phone || userProfileData?.phone} />
                                <InfoDisplayComponent label="Joined On" value={userProfileData?.createdAt} formatDate={formatDate} />
                                <InfoDisplayComponent label="Email Verified" value={userProfileData?.isEmailVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Account Blocked" value={userProfileData?.isBlocked} isBoolean={true} />
                            </>
                        );
                    })()}

                </tbody>
            </table>
        </div>
    )
}

export default ProfileListing