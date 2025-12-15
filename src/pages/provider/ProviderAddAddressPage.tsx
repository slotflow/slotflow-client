import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import RightSideBox from "@/components/provider/SideBox";
import { RedirectTo } from "@/utils/interface/commonInterface";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { roleArray, updatableStatuses } from "@/utils/constants";
import { providerCreateAddress } from "@/utils/apis/provider.api";
import AddressForm from "@/components/form/CommonForms/AddressForm";
import { CreateAddressFormType } from "@/utils/zod/commonZodFields";
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";

const ProviderAddAddressPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { goToAuthPage } = useAuthNavigation();
    const { authUser } = useSelector((state: RootState) => state.auth);
    const adminStatus = authUser?.adminVerificationStatus;
    const isUpdatable = adminStatus !== undefined && (updatableStatuses as readonly string[]).includes(adminStatus);
    const redirectUrl: RedirectTo = isUpdatable ? RedirectTo.PROVIDER_APPROVAL_PENDING : RedirectTo.PROVIDER_SERVICE_DETAILS;

    const handleSubmit = async (data: CreateAddressFormType) => {
        try {
            const res = await dispatch(providerCreateAddress(data)).unwrap();
            if (res.success) {
                toast.success(res.message);
                goToAuthPage(roleArray[2],redirectUrl);
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
                />
            </div>
        </div>
    )
}

export default ProviderAddAddressPage;