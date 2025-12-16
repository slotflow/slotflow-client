import FormField from '../FormField';
import { Button } from '../../ui/button';
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { PhoneInput } from '../phone-input';
import { countries } from 'country-data-list';
import { ChevronRight, Info } from 'lucide-react';
import { RootState } from '@/utils/redux/appStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from "react-hook-form";
import NotificationBox from '../../common/NotificationBox';
import { CountryDropdown } from '../../ui/country-dropdown';
import LocationPicker from '@/components/common/LocationPicker';
import { Location } from '@/utils/interface/entityInterface/addressInterface';
import { CreateAddressFormType, createAddressZodSchema } from '@/utils/zod/commonZodFields';
import { AddressFormProps } from '@/utils/interface/componentInterface/commonComponentInterface';
import { addAddressGoogleMapLinkInfo, addAddressGoogleMapLinkInfoHeading } from '@/utils/constants';

const AddressForm: React.FC<AddressFormProps> = ({
    formClassNames,
    heading,
    headingSize,
    buttonText,
    onSubmit,
    setData
}) => {

    // const queryClient = useQueryClient();
    const { dataUpdating } = useSelector((store: RootState) => store.auth);

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting, isValid }
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
        reset(setData)
    },[setData, reset])

    const submitHandler = (data: CreateAddressFormType) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={`${formClassNames} py-6`}>
            <h4 className={`${headingSize} font-semibold text-start px-6`}>{heading}</h4>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full">

                <div className="flex-1 space-y-4 md:space-y-6 px-6 pt-6 md:p-6">
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

                <div className="flex-1 space-y-4 md:space-y-6 px-6 md:px-0 md:p-6">
                    <label className="text-sm font-medium">
                        Select Location{<span className="mx-1 text-red-500">*</span>}
                    </label>
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                    <NotificationBox
                        icon={Info}
                        heading={addAddressGoogleMapLinkInfoHeading}
                        message={addAddressGoogleMapLinkInfo}
                    />
                </div>

            </div>

            <div className="flex justify-center md:justify-end mt-4 md:mt-6">
                <Button
                    type="submit"
                    variant="outline"
                    className="cursor-pointer w-10/12 md:w-auto text-xs md:text-sm hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                    disabled={!isValid || isSubmitting || dataUpdating}
                >
                    {dataUpdating ? "Loading" : buttonText} <ChevronRight />
                </Button>
            </div>
        </form>
    );
};

export default AddressForm;
