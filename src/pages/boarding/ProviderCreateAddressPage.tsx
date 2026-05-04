import OnBoardingLayout from "@/layouts/BoardingLayout";
import { onboardingContent } from "@/shared/utils/constants";
import AddressForm from "@/components/form/CommonForms/AddressForm";

const ProviderAddAddressPage = () => {

    return (
        <OnBoardingLayout
            pageNumber={1}
            heading={onboardingContent.address.title}
            description={onboardingContent.address.description}
        >
            <AddressForm />
        </OnBoardingLayout>
    )
}

export default ProviderAddAddressPage;