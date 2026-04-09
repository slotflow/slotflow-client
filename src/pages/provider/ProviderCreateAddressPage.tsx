import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AdminVerificationStatus } from "@/shared/interface/enums";
import { useDispatch, useSelector } from "react-redux";
import SideBox from "@/components/navs/SideBox";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import AddressForm from "@/components/form/CommonForms/AddressForm";
import { CreateAddressFormType } from "@/shared/zod/commonZodFields";
import { appConfig } from "@/shared/config/env";
import { fetchMyAddress, providerCreateAddress, updateAddress } from "@/shared/apis/address";
import { useNavigate } from "react-router-dom";
import { redirectPaths } from "@/shared/utils/constants";

const ProviderAddAddressPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [oldAddress, setOldAddress] = useState<CreateAddressFormType>();

    const handleSubmit = async (data: CreateAddressFormType) => {
        try {
            if (authUser?.isAddressAdded) {
                const res = await updateAddress(data);
                if (res.success) {
                    toast.success(res.message);
                    navigate(redirectPaths.PROVIDER_APPROVAL_PENDING);
                }
            } else {
                const res = await dispatch(providerCreateAddress(data)).unwrap();
                if (res.success) {
                    toast.success(res.message);
                    navigate(redirectPaths.PROVIDER_SERVICE_DETAILS);
                }
            }
        } catch (error) {
            if (appConfig.isDevelopment) console.log("Failed to Save Address : ", error);
        }
    }

    useEffect(() => {
        if (!authUser) return;

        const shouldFetchAddress =
            authUser.isAddressAdded &&
            authUser.adminVerificationStatus !== AdminVerificationStatus.NOT_REQUESTED;

        if (!shouldFetchAddress) return;

        async function fetchOldAddress() {
            const result = await fetchMyAddress();
            setOldAddress({
                ...result,
                countryCode: "IN"
            });
        };

        fetchOldAddress();
    }, [authUser])

    return (
        <div className="min-h-screen md:flex justify-center w-full bg-[var(--background)]">
            <SideBox pageNumber={1} />
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