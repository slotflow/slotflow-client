import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import NotificationBox from './NotificationBox';
import { PhoneInput } from '../form/phone-input';
import { ChevronRight, Info } from 'lucide-react';
import { RootState } from '@/utils/redux/appStore';
import React, { FormEvent, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from '@tanstack/react-query';
import InputField from '@/components/form/InputFieldWithLable';
import { Address } from '@/utils/interface/entityInterface/addressInterface';
import { addAddressGoogleMapLinkInfo, addAddressGoogleMapLinkInfoHeading } from '@/utils/constants';

export type AddressFormProps = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">

export interface AddAddressProps {
    formClassNames: string;
    heading: string;
    headingSize: string;
    buttonText: string;
    onSubmit: (e: FormEvent<HTMLFormElement>, formData: AddressFormProps) => void;
    setHasErrors: (hasError: boolean) => void;
}

const AddAddressForm: React.FC<AddAddressProps> = ({ formClassNames, heading, headingSize, buttonText, onSubmit, setHasErrors }) => {

    const queryClient = useQueryClient();
    const { dataUpdating } = useSelector((store: RootState) => store.auth);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isValid }
    } = useForm<AddressFormProps>({
        defaultValues: {
            _id: "",
            addressLine: "",
            phone: "",
            place: "",
            city: "",
            district: "",
            pincode: "",
            state: "",
            country: "",
            googleMapLink: "",
        }
    });

    useEffect(() => {
        const cachedData = queryClient.getQueryData<AddressFormProps>(["userAddress"]);
        if (cachedData) reset(cachedData);
        console.log("cachedData : ",cachedData)
    }, [queryClient, reset]);

    const submitHandler = (data: AddressFormProps) => {
        onSubmit({ preventDefault: () => { } } as React.FormEvent<HTMLFormElement>, data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={`${formClassNames} py-6`}>
            <h4 className={`${headingSize} font-semibold text-start px-6`}>{heading}</h4>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">

                <div className="flex-1 space-y-4 md:space-y-6 px-6 pt-6 md:p-6">
                    <InputField
                        label="Address Line"
                        id="addressLine"
                        name="addressLine"
                        placeholder="Address"
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
                                    Phone
                                </label>
                                <PhoneInput
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value || "");
                                        setHasErrors(false);
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

                    <InputField
                        label="Place"
                        id="place"
                        name="place"
                        placeholder="Place"
                        type="text"
                        required
                        register={register}
                        error={errors.place?.message}
                    />
                    <InputField
                        label="City"
                        id="city"
                        name="city"
                        placeholder="City"
                        type="text"
                        required
                        register={register}
                        error={errors.city?.message}
                    />
                    <InputField
                        label="District"
                        id="district"
                        name="district"
                        placeholder="District"
                        type="text"
                        required
                        register={register}
                        error={errors.district?.message}
                    />
                    <InputField
                        label="Pincode"
                        id="pincode"
                        name="pincode"
                        placeholder="000000"
                        type="text"
                        required
                        register={register}
                        error={errors.pincode?.message}
                    />
                    <InputField
                        label="State"
                        id="state"
                        name="state"
                        placeholder="State"
                        type="text"
                        required
                        register={register}
                        error={errors.state?.message}
                    />
                    <InputField
                        label="Country"
                        id="country"
                        name="country"
                        placeholder="Country"
                        type="text"
                        required
                        register={register}
                        error={errors.country?.message}
                    />
                </div>

                <div className="flex-1 space-y-4 md:space-y-6 px-6 md:px-0 md:p-6">
                    <InputField
                        label="Google Map Link"
                        id="googleMapLink"
                        name="googleMapLink"
                        placeholder="https://googlemap"
                        type="text"
                        required
                        register={register}
                        error={errors.googleMapLink?.message}
                    />
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
                    className="w-10/12 md:w-2/12 text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                    disabled={!isValid || isSubmitting || dataUpdating}
                >
                    {dataUpdating ? "Loading" : buttonText} <ChevronRight />
                </Button>
            </div>
        </form>
    );
};

export default AddAddressForm;
