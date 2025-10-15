import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FormEvent, useState } from "react";
import { AppDispatch } from "@/utils/redux/appStore";
import RightSideBox from "@/components/provider/SideBox";
import { providerAddProviderAddress } from "@/utils/apis/provider.api";
import AddAddressForm, { AddressFormProps } from "@/components/common/AddAddress";

const ProviderAddAddressPage = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [hasErrors, setHasErrors] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, formData: AddressFormProps) => {
        e.preventDefault();
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }
        await dispatch(providerAddProviderAddress(formData))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
    }

    return (
        <div className="min-h-screen md:flex justify-center w-full bg-[var(--background)]">
            <RightSideBox
                props={{ pageNumber: 1 }}
            />
            <div className="w-full md:w-8/12 md:px-10">
                <AddAddressForm
                    onSubmit={handleSubmit}
                    formClassNames={"md:mt-10 px-4 md:px-12"}
                    headingSize={"xs:text-md md:text-xl lg:text-2xl"}
                    heading={"Address Form"}
                    buttonText={"Next"}
                    setHasErrors={setHasErrors}
                />
            </div>
        </div>
    )
}

export default ProviderAddAddressPage