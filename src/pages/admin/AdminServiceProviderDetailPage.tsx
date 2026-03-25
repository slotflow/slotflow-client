import { useState } from "react";
import { useParams } from "react-router-dom";
import { Role } from "@/utils/interface/enums";
import ReviewsPage from "../common/ReviewsPage";
import { providerTabs } from "@/utils/constants";
import { fetchReviews } from "@/utils/apis/review.api";
import { fetchPayments } from "@/utils/apis/payment.api";
import ProfileHead from "@/components/common/profile/ProfileHead";
import DataFetchingError from "@/components/common/DataFetchingError";
import AddressListing from "@/components/common/profile/AddressListing";
import ProfileListing from "@/components/common/profile/ProfileListing";
import ProviderProofs from "@/components/common/profile/ProviderProofs";
import ProfileHorizontalTabs from "@/components/common/ProfileHorizontalTabs";
import AdminProviderSubscriptions from "@/components/admin/AdminProviderSubscriptions";
import ProviderServiceDetails from "@/components/common/profile/ProviderServiceDetails";
import AdminUserOrProviderPayments from "@/components/admin/AdminUserOrProviderPayments";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";
import { adminFetchProviderService, adminFetchProviderProofs } from "@/utils/apis/adminProvider.api";
import { fetchProviderDetailsForAdmin } from "@/utils/apis/provider.api";
import { fetchAddressByProviderId } from "@/utils/apis/address.api";
import { fetchServiceAvailabilityByProviderId } from "@/utils/apis/serviceAvailability.api";

const AdminServiceProviderDetailPage = () => {

    const { providerId } = useParams();
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
                <ProfileHorizontalTabs isAdmin={true} setTab={setTab} tab={tab} tabArray={providerTabs} />

                <div className={`flex-grow`}>
                    {tab === 0 && (
                        <ProfileListing fetchApiFunction={() => fetchProviderDetailsForAdmin(providerId)} queryKey="providerProfile" userOrProviderId={providerId} adminLookingProvider shimmerRow={8} setSelectedUserData={setSelectedUserData} />
                    ) || tab === 1 && (
                        <AddressListing userOrProviderId={providerId} fetchApiFunction={() => fetchAddressByProviderId(providerId)} queryKey="providerAddress" />
                    ) || tab === 2 && (
                        <ProviderServiceDetails providerId={providerId} fetchApiFunction={() => adminFetchProviderService(providerId)} queryKey="providerService" isUser={false} />
                    ) || tab === 3 && (
                        <ProviderServiceAvailability providerId={providerId} fetchApiFuntion={fetchServiceAvailabilityByProviderId} queryKey="providerServiceAvailability" role={Role.ADMIN} />
                    ) || tab === 4 && (
                        <ReviewsPage fetchFunction={() => fetchReviews({ providerId })} role={Role.ADMIN} className="mt-2 md:mt-0" />
                    ) || tab === 5 && (
                        <AdminProviderSubscriptions providerId={providerId} />
                    ) || tab === 6 && (
                        <AdminUserOrProviderPayments providerId={providerId} fetchFunction={fetchPayments} />
                    ) || tab === 7 && (
                        <ProviderProofs fetchApiFunction={() => adminFetchProviderProofs(providerId)} providerId={providerId} />
                    )}
                </div>
            </div>

        </div>
    )
}

export default AdminServiceProviderDetailPage