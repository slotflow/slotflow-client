import React from 'react';
import BoardingLayout from '@/layouts/BoardingLayout';
import { onboardingContent } from '@/shared/utils/constants';
import ProviderServiceAvailabilityForm from '@/components/form/provider/ProviderSerivceAvailabilityForm';

const ProviderCreateServiceAvailabilityPage: React.FC = () => {

  return (
    <BoardingLayout
      pageNumber={3}
      heading={onboardingContent.availability.title}
      description={onboardingContent.availability.description}
    >
      <ProviderServiceAvailabilityForm />
    </BoardingLayout>
  );
};

export default ProviderCreateServiceAvailabilityPage;

