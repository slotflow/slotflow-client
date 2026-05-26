import { useState } from "react";
import { useParams } from "react-router-dom";
import { Role } from "@/shared/interface/enums";
import ReviewsPage from "../common/ReviewsPage";
import { fetchPayments } from "@/shared/apis/payment";
import { providerTabs } from "@/shared/utils/constants";
import { fetchAddressByUserId } from "@/shared/apis/address";
import AddressListing from "@/components/profile/AddressListing";
import ProfileListing from "@/components/profile/ProfileListing";
import ProviderProofs from "@/components/profile/ProviderProofs";
import DataFetchingError from "@/components/error/DataFetchingError";
import ProfileHorizontalTabs from "@/components/profile/ProfileHorizontalTabs";
import { fetchProviderServiceByProviderId } from "@/shared/apis/providerService";
import ProviderServiceDetails from "@/components/profile/ProviderServiceList";
import AdminProviderSubscriptions from "@/components/admin/AdminProviderSubscriptions";
import AdminUserOrProviderPayments from "@/components/admin/AdminUserOrProviderPayments";
import ProviderServiceAvailability from "@/components/profile/ProviderServiceAvailability";
import { adminFetchProviderProofs, fetchProviderDetailsForAdmin } from "@/shared/apis/providerProfile";

const AdminServiceProviderDetailPage: React.FC = () => {

    const { providerId } = useParams();
    const [tab, setTab] = useState<number>(0);
    if (!providerId) return <DataFetchingError message={"Provider Profile fetching error"} />

    return (
        <div className="min-h-full p-2 flex flex-col">
            <div className="mt-6 md:flex">
                <ProfileHorizontalTabs isAdmin={true} setTab={setTab} tab={tab} tabArray={providerTabs} />

                <div className={`flex-grow`}>
                    {tab === 0 && (
                        <ProfileListing fetchApiFunction={() => fetchProviderDetailsForAdmin(providerId)} queryKey="providerProfile" userOrProviderId={providerId} adminLookingProvider shimmerRow={8} />
                    ) || tab === 1 && (
                        <AddressListing userOrProviderId={providerId} fetchApiFunction={() => fetchAddressByUserId(providerId)} queryKey="providerAddress" />
                    ) || tab === 2 && (
                        <ProviderServiceDetails providerId={providerId} fetchApiFunction={() => fetchProviderServiceByProviderId(providerId)} queryKey="providerService" />
                    ) || tab === 3 && (
                        <ProviderServiceAvailability providerId={providerId} role={Role.ADMIN} />
                    ) || tab === 4 && (
                        <ReviewsPage providerId={providerId} isPage={false} />
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