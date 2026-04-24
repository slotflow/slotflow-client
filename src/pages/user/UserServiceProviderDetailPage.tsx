import { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewsPage from "../common/ReviewsPage";
import { Role } from "@/shared/interface/enums";
import { providerTabs } from "@/shared/utils/constants";
import ProfileHead from "@/components/profile/ProfileHead";
import DataFetchingError from "@/components/error/DataFetchingError";
import AddressListing from "@/components/profile/AddressListing";
import ProfileListing from "@/components/profile/ProfileListing";
import ProfileHorizontalTabs from "@/components/profile/ProfileHorizontalTabs";
import ProviderServiceDetails from "@/components/profile/ProviderServiceDetails";
import ProviderServiceAvailability from "@/components/profile/ProviderServiceAvailability";
import { fetchProviderDetailsForUser } from "@/shared/apis/provider";
import { fetchServiceAvailabilityByProviderId } from "@/shared/apis/serviceAvailability";
import { userFetchProviderService } from "@/shared/apis/providerService";
import { fetchAddressByUserId } from "@/shared/apis/address";

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
                canUpdate={false}
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
                        <AddressListing userOrProviderId={providerId} fetchApiFunction={() => fetchAddressByUserId(providerId)} queryKey="providerAddress" />
                    ) || tab === 2 && (
                        <ProviderServiceDetails providerId={providerId} fetchApiFunction={() => userFetchProviderService(providerId)} queryKey="providerService" isUser shimmerRow={5} />
                    ) || tab === 3 && (
                        <ProviderServiceAvailability providerId={providerId} fetchApiFuntion={fetchServiceAvailabilityByProviderId} queryKey="providerServiceAvailability" role={Role.USER} />
                    ) || tab === 4 && (
                        <ReviewsPage providerId={providerId} />
                    )}
                </div>

            </div>
        </div>
    )
}

export default UserServiceProviderDetailPage