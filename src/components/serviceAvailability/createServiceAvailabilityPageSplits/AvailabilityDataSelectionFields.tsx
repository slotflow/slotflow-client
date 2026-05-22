import React from "react";
import SelectField from "../../form/SelectField";
import { ServiceMode } from "@/shared/interface/enums";
import { ProviderServiceAvailabilityFormType } from "@/shared/zod/providerZod";
import { AvailabilityDataSelectionFieldsProps } from "@/shared/interface/componentInterface";
import { daysOfWeekOptions, isAvailableOptions, serviceDurationsOptions } from "@/shared/utils/constants";

const AvailabilityDataSelectionFields: React.FC<AvailabilityDataSelectionFieldsProps> = ({
    register,
    isModeSelected,
    toggleMode,
    isAvailable
}) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <SelectField<ProviderServiceAvailabilityFormType, string>
                    label="Select Day"
                    id="day"
                    register={register}
                    options={daysOfWeekOptions}
                    required
                />
                <SelectField<ProviderServiceAvailabilityFormType, boolean>
                    label="Select Availability"
                    id="isAvailable"
                    register={register}
                    options={isAvailableOptions}
                    required
                />
                {isAvailable && (
                    <SelectField<ProviderServiceAvailabilityFormType, number>
                        label="Select Duration"
                        id="duration"
                        register={register}
                        options={serviceDurationsOptions}
                        required
                    />
                )}
            </div>
            {isAvailable && (
                <div className="">
                    <h6 className='text-sm font-semibold'>Select service modes {<span className="text-red-500"> *</span>}</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 pt-2">
                        <div
                            className={`w-full text-xs text-center border rounded-md py-2 md:py-2.5 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${isModeSelected(ServiceMode.ONLINE) ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'
                                }`}
                            onClick={() => toggleMode(ServiceMode.ONLINE)}
                        >
                            Online
                        </div>
                        <div
                            className={`w-full text-xs text-center border rounded-md py-2 md:py-2.5 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${isModeSelected(ServiceMode.OFFLINE) ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'
                                }`}
                            onClick={() => toggleMode(ServiceMode.OFFLINE)}
                        >
                            Offline
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AvailabilityDataSelectionFields;