import {
    Code,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ShieldUser,
    BadgeCheck,
} from "lucide-react";
import {
    UserFetchUserProfileDetailsResponse,
    AdminFetchUserProfileDetailsResponse,
} from "@/shared/interface/api/user";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import DetailField from "../app/DetailField";
import { Card, CardContent } from "../ui/card";
import {
    ProviderFetchMyProfileDetailsResponse,
    UserFetchProviderProfileDetailsResponse,
    AdminFetchProviderProfileDetailsResponse,
} from "@/shared/interface/api/providerProfile";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/shared/redux/appStore";
import { STATUS_PRESETS } from "@/shared/utils/constants";
import DataFetchingError from "../error/DataFetchingError";
import getBooleanStatusComponent from "../app/GetBooleanStatus";
import DataFieldShimmer from "@/components/shimmers/DataFieldShimmer";
import { UserOrProviderProfileDetailsComponentProps } from "@/shared/interface/componentInterface";

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
        queryFn: async () => {
            const res = await fetchApiFunction(userOrProviderId);
            return res.data;
        },
        queryKey: [queryKey, userOrProviderId],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (!data) return;

        if (setProfileImage && "profileImage" in data && data.profileImage) {
            setProfileImage(data.profileImage);
        }

        if ((userLookingProvider || adminLookingProvider || adminLookingUser) &&
            "username" in data &&
            setSelectedUserData) {
            setSelectedUserData({
                selectedUserName: data.username,
                selectedUserProfileImage: (data as any).profileImage || null
            });
        }
    }, [data]);

    if (isError) {
        return <DataFetchingError message={error?.message} />
    }

    if (isLoading) {
        return <DataFieldShimmer row={shimmerRow || 7} />
    }

    let fields: React.ComponentProps<typeof DetailField>[] = [];

    // ADMIN → PROVIDER
    if (adminLookingProvider) {
        const d = data as AdminFetchProviderProfileDetailsResponse;

        fields = [
            { label: "Username", value: d.username, Icon: User },
            { label: "Email", value: d.email, canCopy: true, Icon: Mail },
            { label: "Phone Number", value: d.phone, Icon: Phone },
            { label: "Verification Status", value: d.adminVerificationStatus, Icon: BadgeCheck },
            { label: "Slotflow Trusted", value: getBooleanStatusComponent(d.trustedBySlotflow, STATUS_PRESETS.trustStatus), Icon: BadgeCheck },
            { label: "Account Status", value: getBooleanStatusComponent(d.isBlocked, STATUS_PRESETS.accountStatus), Icon: ShieldUser },
            { label: "Admin Verified", value: getBooleanStatusComponent(d.isAdminVerified, STATUS_PRESETS.verificationStatus), Icon: BadgeCheck },
            { label: "Address Verified", value: getBooleanStatusComponent(d.isAddressVerified, STATUS_PRESETS.verificationStatus), Icon: MapPin },
            { label: "Service Details Verified", value: getBooleanStatusComponent(d.isServiceDetailsVerified, STATUS_PRESETS.verificationStatus), Icon: BadgeCheck },
            { label: "Availability Verified", value: getBooleanStatusComponent(d.isAvailabilityVerified, STATUS_PRESETS.verificationStatus), Icon: BadgeCheck },
            { label: "Proofs Verified", value: getBooleanStatusComponent(d.isProofsVerified, STATUS_PRESETS.verificationStatus), Icon: BadgeCheck },
            { label: "Joined On", value: d.createdAt, isDate: true, Icon: Calendar },
        ];
    }

    // ADMIN → USER
    if (adminLookingUser) {
        const d = data as AdminFetchUserProfileDetailsResponse;

        fields = [
            { label: "Username", value: d.username, Icon: User },
            { label: "Email", value: d.email, canCopy: true, Icon: Mail },
            { label: "Phone Number", value: d.phone, Icon: Phone },
            { label: "Account Status", value: getBooleanStatusComponent(d.isBlocked, STATUS_PRESETS.accountStatus), Icon: ShieldUser },
        ];
    }

    // PROVIDER SELF
    if (providerSelf) {
        const d = data as ProviderFetchMyProfileDetailsResponse;

        fields = [
            { label: "Username", value: authUser?.username || d.username, Icon: User },
            { label: "Email", value: authUser?.email || d.email, Icon: Mail },
            { label: "Phone Number", value: authUser?.phone || d.phone, Icon: Phone },
            { label: "Slotflow Trusted", value: getBooleanStatusComponent(d.trustedBySlotflow, STATUS_PRESETS.trustStatus), Icon: BadgeCheck },
            { label: "Joined On", value: d.createdAt, isDate: true, Icon: Calendar },
            { label: "Referral Code", value: authUser?.referralCode, canCopy: true, Icon: Code },
            { label: "Subscription", value: authUser?.providerSubscription, Icon: BadgeCheck },
            { label: "Account Status", value: getBooleanStatusComponent(authUser?.isBlocked, STATUS_PRESETS.accountStatus), Icon: ShieldUser },
        ];
    }

    // USER → PROVIDER
    if (userLookingProvider) {
        const d = data as UserFetchProviderProfileDetailsResponse;

        fields = [
            { label: "Username", value: d.username, Icon: User },
            { label: "Email", value: d.email, canCopy: true, Icon: Mail },
            { label: "Phone Number", value: d.phone, Icon: Phone },
            { label: "Slotflow Trusted", value: getBooleanStatusComponent(d.trustedBySlotflow, STATUS_PRESETS.trustStatus), Icon: BadgeCheck },
        ];
    }

    // USER SELF
    if (userSelf) {
        const d = data as UserFetchUserProfileDetailsResponse;

        fields = [
            { label: "Username", value: authUser?.username || d.username, Icon: User },
            { label: "Email", value: authUser?.email || d.email, canCopy: true, Icon: Mail },
            { label: "Phone Number", value: authUser?.phone || d.phone, Icon: Phone },
            { label: "Joined On", value: d.createdAt, isDate: true, Icon: Calendar },
            { label: "Referral Code", value: authUser?.referralCode, canCopy: true, Icon: Code },
            { label: "Account Status", value: getBooleanStatusComponent(d.isBlocked, STATUS_PRESETS.accountStatus), Icon: ShieldUser },
        ];
    }

    return (
        <div className="overflow-hidden w-full mt-2 md:mt-0">
            <Card>
                <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {fields.map((field, index) => (
                            <DetailField key={index} {...field} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileListing;