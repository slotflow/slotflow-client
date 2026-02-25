import { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewsPage from "../common/ReviewsPage";
import { providerTabs } from "@/utils/constants";
import ProfileHead from "@/components/common/profile/ProfileHead";
import DataFetchingError from "@/components/common/DataFetchingError";
import AddressListing from "@/components/common/profile/AddressListing";
import ProfileListing from "@/components/common/profile/ProfileListing";
import ProfileHorizontalTabs from "@/components/common/ProfileHorizontalTabs";
import ProviderServiceDetails from "@/components/common/profile/ProviderServiceDetails";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";
import { userFetchProviderAddress, userFetchProviderDetails, userFetchProviderService, userFetchProviderServiceAvailability } from "@/utils/apis/user.api";
import { Role } from "@/utils/interface/enums";
import { fetchReviews } from "@/utils/apis/review.api";

const UserServiceProviderDetailPage = () => {

    const { providerId } = useParams<string>();
    const [tab, setTab] = useState<number>(0);
    const [selectedUserData, setSelectedUserData] = useState<{ selectedUserName: string, selectedUserProfileImage: string | null }>({
        selectedUserName: "",
        selectedUserProfileImage: null
    })

    if (!providerId) return <DataFetchingError message={"Provider Profile fetching error"} />

    return (
        <div className="min-h-full p-2 flex flex-col">

            <ProfileHead
                updation={false}
                showDetails
                isMyProfile={false}
                selectedUserData={selectedUserData}
            />

            <div className="mt-6 md:flex">
                <ProfileHorizontalTabs isAdmin={false} setTab={setTab} tab={tab} tabArray={providerTabs} />
                <div className="flex-grow">
                    {tab === 0 && (
                        <ProfileListing fetchApiFunction={() => userFetchProviderDetails(providerId)} queryKey="providerProfile" userOrProviderId={providerId} userLookingProvider shimmerRow={4} setSelectedUserData={setSelectedUserData} />
                    ) || tab === 1 && (
                        <AddressListing userOrProviderId={providerId} fetchApiFunction={() => userFetchProviderAddress(providerId)} queryKey="providerAddress" />
                    ) || tab === 2 && (
                        <ProviderServiceDetails providerId={providerId} fetchApiFunction={() => userFetchProviderService(providerId)} queryKey="providerService" isUser shimmerRow={5} />
                    ) || tab === 3 && (
                        <ProviderServiceAvailability providerId={providerId} fetchApiFuntion={userFetchProviderServiceAvailability} queryKey="providerServiceAvailability" role={Role.USER} />
                    ) || tab === 4 && (
                        <ReviewsPage fetchFunction={() => fetchReviews({ providerId })} role={Role.USER} className="mt-2 md:mt-0" />
                    )}
                </div>

            </div>
        </div>
    )
}

export default UserServiceProviderDetailPage