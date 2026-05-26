import React from "react";
import { useParams } from "react-router-dom";
import ReviewsPage from "../common/ReviewsPage";
import { Role } from "@/shared/interface/enums";
import { useQuery } from "@tanstack/react-query";
import { fetchAddressByUserId } from "@/shared/apis/address";
import AddressListing from "@/components/profile/AddressListing";
import ProviderProfile from "@/components/provider/ProviderProfile";
import DataFetchingError from "@/components/error/DataFetchingError";
import { fetchProviderDetailsForUser } from "@/shared/apis/providerProfile";
import { fetchProviderServiceByProviderId } from "@/shared/apis/providerService";
import ProviderServiceAvailability from "@/components/profile/ProviderServiceAvailability";

const UserServiceProviderDetailPage: React.FC = () => {

    const { providerId } = useParams<string>();
    if (!providerId) return <DataFetchingError message={"Provider Profile fetching error"} />

    const { data: profileData, isLoading: profileLoading, isError: profileIsError } = useQuery({
        queryFn: async () => {
            const res = await fetchProviderDetailsForUser(providerId);
            return res.data;
        },
        queryKey: ["providerProfile", providerId],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const { data: serviceData, isLoading: serviceLoading, isError: serviceIsError } = useQuery({
        queryFn: async () => {
            const res = await fetchProviderServiceByProviderId(providerId);
            return res.data;
        },
        queryKey: ["providerService", providerId],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return (
        <ProviderProfile
            role={Role.USER}
            username={profileData?.username || ""}
            profileImage={profileData?.profileImage || ""}
            service={{
                isLoading: serviceLoading,
                isError: serviceIsError,
                data: serviceData,
                isUserLookingProvider:true
            }}
            profile={{
                isLoading: profileLoading,
                isError: profileIsError,
                data: profileData,
            }}
            reviews={
                <ReviewsPage
                    providerId={providerId}
                    isPage={false}
                />
            }
            address={<AddressListing
                userOrProviderId={providerId}
                fetchApiFunction={() => fetchAddressByUserId(providerId)}
                queryKey="providerAddress"
                isUserLookingProvider
            />}
            availability={<ProviderServiceAvailability role={Role.USER} providerId={providerId} />}
        />
    )
}

export default UserServiceProviderDetailPage