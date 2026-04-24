import React from "react";
import SideBox from "@/components/onboarding/SideBox";
import ProviderServiceForm from "@/components/form/provider/ProviderServiceForm";

const ProviderCreateServiceDetailsPage: React.FC = () => {

  return (
    <div className="md:min-h-screen md:flex justify-center w-full bg-[var(--background)] ">
      <SideBox pageNumber={2} />
      <div className="w-full md:w-8/12 p-6 md:p-10">
        <ProviderServiceForm />
      </div>
    </div>
  );
};

export default ProviderCreateServiceDetailsPage;
