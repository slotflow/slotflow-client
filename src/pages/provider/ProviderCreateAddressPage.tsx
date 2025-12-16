import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { roleArray } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import RightSideBox from "@/components/provider/SideBox";
import { RedirectTo } from "@/utils/interface/commonInterface";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import AddressForm from "@/components/form/CommonForms/AddressForm";
import { CreateAddressFormType } from "@/utils/zod/commonZodFields";
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";
import { providerCreateAddress, providerFetchAddress, providerUpdateAddress } from "@/utils/apis/provider.api";

const ProviderAddAddressPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { goToAuthPage } = useAuthNavigation();
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [oldAddress, setOldAddress] = useState<CreateAddressFormType>();

    const handleSubmit = async (data: CreateAddressFormType) => {
        try {
            if (authUser?.isAddressAdded) {
                const res = await providerUpdateAddress(data);
                if (res.success) {
                    toast.success(res.message);
                    goToAuthPage(roleArray[2], RedirectTo.PROVIDER_APPROVAL_PENDING);
                }
            } else {
                const res = await dispatch(providerCreateAddress(data)).unwrap();
                if (res.success) {
                    toast.success(res.message);
                    goToAuthPage(roleArray[2], RedirectTo.PROVIDER_SERVICE_DETAILS);
                }
            }
        } catch (error) {
            if (import.meta.env.DEV) console.log("Failed to Save Address : ", error);
        }
    }

    useEffect(() => {
        if (!authUser?.isAddressAdded) return;

        async function fetchOldAddress() {
            const result = await providerFetchAddress();
            setOldAddress(result);
        };

        fetchOldAddress();
    }, [authUser])

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
                    setData={oldAddress}
                />
            </div>
        </div>
    )
}

export default ProviderAddAddressPage;