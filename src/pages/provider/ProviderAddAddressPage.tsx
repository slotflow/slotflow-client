import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FormEvent, useState } from "react";
import { AppDispatch } from "@/utils/redux/appStore";
import RightSideBox from "@/components/provider/SideBox";
import AddressForm from "@/components/form/CommonForms/AddressForm";
import { CreateAddressForm } from "@/utils/zod/commonZodFields";
import { providerCreateAddress } from "@/utils/apis/provider.api";

const ProviderAddAddressPage = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [hasErrors, setHasErrors] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, data: CreateAddressForm) => {
        e.preventDefault();
        try {
            if (hasErrors) {
                toast.error("Please fix the form errors.");
                return;
            }
            const res = await dispatch(providerCreateAddress(data)).unwrap();
            if (res.success) {
                toast.success(res.message)
            }
        } catch (error) {
            if (import.meta.env.DEV) console.log("Failed to Save Address : ",error);
        }
    }

    return (
        <div className="min-h-screen md:flex justify-center w-full bg-[var(--background)]">
            <RightSideBox
                props={{ pageNumber: 1 }}
            />
            <div className="w-full md:w-8/12 md:px-10">
                <AddressForm
                    onSubmit={handleSubmit}
                    formClassNames={"md:mt-4 px-4 md:px-12"}
                    headingSize={"xs:text-md md:text-xl lg:text-2xl"}
                    heading={"Address Form"}
                    buttonText={"Next"}
                    setHasErrors={setHasErrors}
                />
            </div>
        </div>
    )
}

export default ProviderAddAddressPage;