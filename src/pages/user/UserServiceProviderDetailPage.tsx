import { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewsPage from "../common/ReviewsPage";
import { providerTabs } from "@/utils/constants";
import ProfileHead from "@/components/profile/ProfileHead";
import DataFetchingError from "@/components/error/DataFetchingError";
import AddressListing from "@/components/profile/AddressListing";
import ProfileListing from "@/components/profile/ProfileListing";
import ProfileHorizontalTabs from "@/components/profile/ProfileHorizontalTabs";
import ProviderServiceDetails from "@/components/profile/ProviderServiceDetails";
import ProviderServiceAvailability from "@/components/profile/ProviderServiceAvailability";
import { Role } from "@/utils/interface/enums";
import { fetchReviews } from "@/utils/apis/review";
import { fetchProviderDetailsForUser } from "@/utils/apis/provider";
import { fetchAddressByProviderId } from "@/utils/apis/address";
import { fetchServiceAvailabilityByProviderId } from "@/utils/apis/serviceAvailability";
import { userFetchProviderService } from "@/utils/apis/providerService";

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
                isMyProfile={false}
                showDetails
                selectedUserData={selectedUserData}
            />

            <div className="mt-6 md:flex">
                <ProfileHorizontalTabs isAdmin={false} setTab={setTab} tab={tab} tabArray={providerTabs} />
                <div className="flex-grow">
                    {tab === 0 && (
                        <ProfileListing fetchApiFunction={() => fetchProviderDetailsForUser(providerId)} queryKey="providerProfile" userOrProviderId={providerId} userLookingProvider shimmerRow={4} setSelectedUserData={setSelectedUserData} />
                    ) || tab === 1 && (
                        <AddressListing userOrProviderId={providerId} fetchApiFunction={() => fetchAddressByProviderId(providerId)} queryKey="providerAddress" />
                    ) || tab === 2 && (
                        <ProviderServiceDetails providerId={providerId} fetchApiFunction={() => userFetchProviderService(providerId)} queryKey="providerService" isUser shimmerRow={5} />
                    ) || tab === 3 && (
                        <ProviderServiceAvailability providerId={providerId} fetchApiFuntion={fetchServiceAvailabilityByProviderId} queryKey="providerServiceAvailability" role={Role.USER} />
                    ) || tab === 4 && (
                        <ReviewsPage fetchFunction={() => fetchReviews({ providerId })} role={Role.USER} className="mt-2 md:mt-0" />
                    )}
                </div>

            </div>
        </div>
    )
}

export default UserServiceProviderDetailPage