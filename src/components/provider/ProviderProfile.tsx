import { Star } from 'lucide-react';
import { Role } from '@/shared/types/enums';
import ServiceCard from './providerProfileCards/ServiceCard';
import { ProviderProfileProps } from '@/shared/types/component';
import ExperienceCard from './providerProfileCards/ExperienceCard';
import AttachmentCard from './providerProfileCards/AttachmentCard';
import RequirementsCard from './providerProfileCards/RequirementsCard';
import CustomizationCard from './providerProfileCards/CustomizationCard';
import BookAppointmentCard from './providerProfileCards/BookAppointmentCard';
import ProviderProfileTopCardProps from './providerProfileCards/ProviderProfileTopCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ProviderProfile = ({
  username,
  profileImage,
  role,
  availability,
  reviews,
  address,
  proofs,
  service,
  profile,
  isShowPreview,
  handleIsShowPreview
}: ProviderProfileProps) => {

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="lg:col-span-2 space-y-2">
          <ProviderProfileTopCardProps
            isLoading={profile.isLoading ?? false}
            isError={profile.isError ?? false}
            name={username}
            image={profileImage}
            categoryName={service.data?.serviceId.serviceName || ''}
            trusted={profile.data?.trustedBySlotflow || false}
            role={role}
            isShowPreview={isShowPreview}
            handleIsShowPreview={handleIsShowPreview}
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
              portfolioUrl: service?.data?.portfolioUrl,
            }}
          />

          {!isShowPreview && proofs}

          <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Star className="size-5 text-primary" />
                Reviews
              </CardTitle>
              <CardDescription>What clients says about Franklin Shawn</CardDescription>
            </CardHeader>
            <CardContent>
              {reviews || <p className="text-center">Your Client Reviews</p>}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <BookAppointmentCard
            isLoading={service.isLoading}
            isError={service.isError}
            data={service.data?.servicePrice}
          />
          <ExperienceCard
            isLoading={service.isLoading}
            isError={service.isError}
            data={{
              experienceYears: service.data?.serviceExperienceYears,
              description: service.data?.serviceExperience,
            }}
          />
          {address}
          {role === Role.PROVIDER && !isShowPreview && <CustomizationCard />}
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
