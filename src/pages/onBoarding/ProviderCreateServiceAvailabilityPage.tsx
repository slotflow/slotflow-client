import React from 'react';
import SideBox from '@/components/onboarding/SideBox';
import ProviderServiceAvailabilityForm from '@/components/form/provider/ProviderSerivceAvailabilityForm';

const ProviderCreateServiceAvailabilityPage: React.FC = () => {

  return (
    <div className="md:min-h-screen md:flex justify-center w-full bg-[var(--background)] ">
      <SideBox pageNumber={3} />
      <div className="w-full md:w-8/12 p-6 md:p-10">
        <ProviderServiceAvailabilityForm />
      </div>
    </div>
  );
};

export default ProviderCreateServiceAvailabilityPage;

