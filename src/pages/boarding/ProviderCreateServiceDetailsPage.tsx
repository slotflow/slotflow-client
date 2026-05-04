import React from "react";
import BoardingLayout from "@/layouts/BoardingLayout";
import { onboardingContent } from "@/shared/utils/constants";
import ProviderServiceForm from "@/components/form/provider/ProviderServiceForm";

const ProviderCreateServiceDetailsPage: React.FC = () => {

  return (
    <BoardingLayout
      pageNumber={2}
      heading={onboardingContent.serviceDetails.title}
      description={onboardingContent.serviceDetails.description}
    >
      <ProviderServiceForm/>
    </BoardingLayout>
  );
};

export default ProviderCreateServiceDetailsPage;
