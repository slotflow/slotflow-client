import SideBox from "@/components/onboarding/SideBox";
import AddressForm from "@/components/form/CommonForms/AddressForm";

const ProviderAddAddressPage = () => {

    return (
        <div className="min-h-screen md:flex justify-center w-full bg-[var(--background)]">
            <SideBox pageNumber={1} />
            <div className="w-full md:w-8/12 p-6 md:p-10">
                <AddressForm />
            </div>
        </div>
    )
}

export default ProviderAddAddressPage;