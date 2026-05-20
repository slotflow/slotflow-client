import { Star } from "lucide-react";
import { useSelector } from "react-redux";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";
import ServiceCard from "./providerProfileCards/ServiceCard";
import ExperienceCard from "./providerProfileCards/ExperienceCard";
import AttachmentCard from "./providerProfileCards/AttachmentCard";
import RequirementsCard from "./providerProfileCards/RequirementsCard";
import CustomizationCard from "./providerProfileCards/CustomizationCard";
import BookAppointmentCard from "./providerProfileCards/BookAppointmentCard";
import { FetchProviderServiceResponse } from "@/shared/interface/api/providerService";
import ProviderProfileTopCardProps from "./providerProfileCards/ProviderProfileTopCard";
import { ProviderFetchMyProfileDetailsResponse, UserFetchProviderProfileDetailsResponse } from "@/shared/interface/api/providerProfile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ProviderProfileProps {
    username: string;
    profileImage: string;
    role: Role;
    availability: React.ReactNode;
    reviews?: React.ReactNode;
    address?: React.ReactNode;
    proofs?: React.ReactNode;
    service: {
        isLoading?: boolean;
        isError?: boolean;
        data?: FetchProviderServiceResponse;
        isUserLookingProvider?: boolean;
    },
    profile: {
        isLoading?: boolean;
        isError?: boolean;
        data?: ProviderFetchMyProfileDetailsResponse | UserFetchProviderProfileDetailsResponse
    },
}

const ProviderProfile: React.FC<ProviderProfileProps> = ({
    username,
    profileImage,
    role,
    availability,
    reviews,
    address,
    proofs,
    service,
    profile,
}) => {

    const isShowPreview = useSelector((state: RootState) => state.provider.isShowPreview);

    return (
        <div className="w-full p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <ProviderProfileTopCardProps
                        isLoading={profile.isLoading ?? false}
                        isError={profile.isError ?? false}
                        name={username}
                        image={profileImage}
                        categoryName={service.data?.serviceId.serviceName || ""}
                        trusted={profile.data?.trustedBySlotflow || false}
                        role={role}
                    />
                    
                    <ServiceCard
                        isLoading={service.isLoading}
                        isError={service.isError}
                        data={service.data}
                        isUserLookingProvider={service.isUserLookingProvider}
                    />

                    {availability}

                    <RequirementsCard
                        isLoading={service.isLoading}
                        isError={service.isError}
                        data={service.data?.requirements}
                    />

                    <AttachmentCard
                        isLoading={service?.isLoading}
                        isError={service?.isError}
                        data={{
                            demoVideoUrl: service?.data?.videoUrl,
                            portfolioUrl: service?.data?.portfolioUrl
                        }}
                    />

                    {!isShowPreview && proofs}
                    
                    <Card className="border shadow-sm rounded-xl">
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Star className="w-5 h-5 text-primary" />
                                Reviews
                            </CardTitle>
                            <CardDescription>What clients says about Franklin Shawn</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {reviews || <p className="text-center">Your Client Reviews</p>}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <BookAppointmentCard
                        isLoading={service.isLoading}
                        isError={service.isError}
                        data={service.data?.servicePrice}
                    />
                    <ExperienceCard
                        isLoading={service.isLoading}
                        isError={service.isError}
                        data={{
                            experienceYears: 10,
                            description: service.data?.serviceExperience
                        }}
                    />
                    {address}
                    {role === Role.PROVIDER && !isShowPreview && (
                        <CustomizationCard />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;

