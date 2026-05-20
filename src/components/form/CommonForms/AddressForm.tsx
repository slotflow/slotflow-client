import FormField from '../FormField';
import { toast } from 'react-toastify';
import { Button } from '../../ui/button';
import React, { useEffect } from "react";
import { PhoneInput } from '../phone-input';
import { Info, Loader } from 'lucide-react';
import { countries } from 'country-data-list';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { appConfig } from '@/shared/config/env';
import AlertBox from '@/components/alert/AlertBox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { CountryDropdown } from '../../ui/country-dropdown';
import LocationPicker from '@/components/map/LocationPicker';
import { AppDispatch, RootState } from '@/shared/redux/appStore';
import { AdminVerificationStatus, OnboardingStatus, Role } from '@/shared/interface/enums';
import { AddressFormProps } from '@/shared/interface/componentInterface';
import { Location } from '@/shared/interface/entityInterface/addressInterface';
import { createAddress, fetchMyAddress, updateAddress } from '@/shared/apis/address';
import { CreateAddressFormType, createAddressZodSchema } from '@/shared/zod/commonZodFields';
import { addAddressGoogleMapLinkInfo, addAddressGoogleMapLinkInfoHeading, redirectPaths } from '@/shared/utils/constants';

const AddressForm: React.FC<AddressFormProps> = ({
    isUpdating = false,
    heading
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting, isValid, isLoading }
    } = useForm<CreateAddressFormType>({
        resolver: zodResolver(createAddressZodSchema),
        mode: "onChange",
        defaultValues: {
            _id: "",
            addressLine: "",
            landMark: "",
            phone: "",
            place: "",
            city: "",
            district: "",
            pincode: "",
            state: "",
            country: "",
            countryCode: "",
            location: {
                type: "Point",
                coordinates: [0, 0],
            },
        }
    });

    const handleLocationSelect = (location: Location) => {
        console.log("Selected Location: ", location);
        setValue("location", {
            type: "Point",
            coordinates: [location.lon, location.lat],
        });
        const countryObj = countries.all.find(
            c => c.alpha2.toLowerCase() === location.address.country_code?.toLowerCase()
        );

        if (countryObj) {
            setValue("country", countryObj.name);
            setValue("countryCode", countryObj.alpha3);
        }
        setValue("state", location?.address?.state)
        setValue("district", location?.address?.state_district);
        setValue("pincode", location?.address?.postcode);
    };

    useEffect(() => {
        if (!authUser) return;
        const shouldFetchAddress = isUpdating && authUser.adminVerificationStatus !== AdminVerificationStatus.NOT_REQUESTED;

        if (!shouldFetchAddress) return;

        async function fetchOldAddress() {
            const result = await fetchMyAddress();
            reset({
                ...result.data,
                countryCode: "IN"
            });
        };

        fetchOldAddress();
    }, [isUpdating, authUser]);

    const submitHandler = async (data: CreateAddressFormType) => {
        try {
            if (isUpdating) {
                const res = await updateAddress(data);
                if (res.success) {
                    if (authUser?.role === Role.PROVIDER) {
                        if (authUser?.onboardingStatus !== OnboardingStatus.APPROVED) {
                            navigate(redirectPaths.ONBOARDING_PENDING);
                        }
                    }
                    toast.success(res.message);
                }
            } else {
                const res = await dispatch(createAddress(data)).unwrap();
                console.log("res : ", res);
                console.log("authUser : ", authUser);
                if (res.success) {
                    if (authUser?.onboardingStatus !== OnboardingStatus.APPROVED && authUser?.role === Role.PROVIDER) {
                        if (authUser?.adminVerificationStatus === AdminVerificationStatus.NOT_REQUESTED) {
                            navigate(redirectPaths.ONBOARDING_SERVICE);
                        } else if (authUser?.adminVerificationStatus === AdminVerificationStatus.REJECTED) {
                            navigate(redirectPaths.ONBOARDING_PENDING);
                        }
                    }
                    toast.success(res.message);
                }
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("Failed to Save Address : ", error);
            }
            toast.error("Please try again");
        }
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} >
            {heading && (
                <h4 className="text-xl lg:text-2xl font-semibold text-start">
                    {heading}
                </h4>
            )}
            <div className="md:flex w-full space-y-6 space-x-2">
                <div className="space-y-4 w-full space-x-2 pt-6">
                    <FormField<CreateAddressFormType>
                        label="Address Line"
                        id="addressLine"
                        placeholder="Enter address line"
                        type="text"
                        required
                        register={register}
                        error={errors.addressLine?.message}
                    />

                    <FormField<CreateAddressFormType>
                        label="Landmark"
                        id="landMark"
                        placeholder="Enter landmark"
                        type="text"
                        required
                        register={register}
                        error={errors.addressLine?.message}
                    />

                    <Controller
                        name="phone"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <div className="space-y-2">
                                <label className="block text-xs md:text-sm font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                                    Phone {<span className="mx-1 text-red-500">*</span>}
                                </label>
                                <PhoneInput
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value || "");
                                    }}
                                    defaultCountry="IN"
                                    international
                                    placeholder="Enter your phone number"
                                    className="w-full"
                                    required
                                />
                            </div>
                        )}
                    />

                    <FormField<CreateAddressFormType>
                        label="Place"
                        id="place"
                        placeholder="Enter place"
                        type="text"
                        required
                        register={register}
                        error={errors.place?.message}
                    />
                    <FormField<CreateAddressFormType>
                        label="City"
                        id="city"
                        placeholder="Enter city"
                        type="text"
                        required
                        register={register}
                        error={errors.city?.message}
                    />
                    <FormField<CreateAddressFormType>
                        label="District"
                        id="district"
                        placeholder="Enter district"
                        type="text"
                        required
                        register={register}
                        error={errors.district?.message}
                    />
                    <FormField<CreateAddressFormType>
                        label="Pincode"
                        id="pincode"
                        placeholder="000000"
                        type="text"
                        required
                        register={register}
                        error={errors.pincode?.message}
                    />
                    <FormField<CreateAddressFormType>
                        label="State"
                        id="state"
                        placeholder="Enter state"
                        type="text"
                        required
                        register={register}
                        error={errors.state?.message}
                    />

                    <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-medium">
                                    Country <span className="mx-1 text-red-500">*</span>
                                </label>

                                <CountryDropdown
                                    placeholder="Select Country"
                                    defaultValue={watch("countryCode")}
                                    onChange={(country) => {
                                        field.onChange(country.name);
                                        setValue("countryCode", country.alpha3);
                                    }}
                                />

                                {errors.country && (
                                    <span className="text-xs text-red-500">
                                        {errors.country.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="space-y-4 w-full space-x-2 md:pt-6">
                    <div className="flex-1 space-y-4 px-6 md:px-0">
                        <Label className="text-xs md:text-sm" htmlFor="location">
                            Select Location{<span className="mx-1 text-red-500">*</span>}
                        </Label>
                        <LocationPicker onLocationSelect={handleLocationSelect} />
                        <AlertBox
                            icon={Info}
                            heading={addAddressGoogleMapLinkInfoHeading}
                            message={addAddressGoogleMapLinkInfo}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center md:justify-end mt-4 md:mt-6">
                <Button
                    title={isUpdating ? "Update" : "Submit"}
                    type="submit"
                    variant="default"
                    className="cursor-pointer w-10/12 md:w-auto hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] flex items-center gap-2"
                    disabled={!isValid || isSubmitting || isLoading}
                >
                    {isSubmitting ? (
                        <>
                            <Loader className="animate-spin size-4 mr-2" />
                            {(isUpdating && isSubmitting) ? "Updating" : "Submitting"}
                        </>
                    ) : (
                        isUpdating ? "Update" : "Submit"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default AddressForm;
