import React from "react";
import { SelectField } from "../../form/SelectField";
import { UseFormRegister } from "react-hook-form";
import { ServiceMode } from "@/shared/interface/enums";
import { ProviderServiceAvailabilityFormType } from "@/shared/zod/providerZod";
import { daysOfWeekOptions, serviceDurationsOptions } from "@/shared/utils/constants";

interface AvailabilityDataSelectionFieldsProps {
    register: UseFormRegister<ProviderServiceAvailabilityFormType>;
    isModeSelected: (mode: ServiceMode) => boolean;
    toggleMode: (mode: ServiceMode) => void;
}

const AvailabilityDataSelectionFields: React.FC<AvailabilityDataSelectionFieldsProps> = ({ register, isModeSelected, toggleMode }) => {
    return (
        <React.Fragment>
            <div className="space-y-4 md:space-y-0 w-full md:flex space-x-2 px-6 pt-6 md:px-6">
                <div className="md:w-6/12">
                    <SelectField<ProviderServiceAvailabilityFormType, string>
                        label="Select Day"
                        id="day"
                        register={register}
                        options={daysOfWeekOptions}
                        required
                    />
                </div>
                <div className="md:w-6/12">
                    <SelectField<ProviderServiceAvailabilityFormType, number>
                        label="Select Duration"
                        id="duration"
                        register={register}
                        options={serviceDurationsOptions}
                        required
                    />
                </div>
            </div>

            <div className="px-6 pt-6 md:px-6">
                <h6 className='text-sm font-semibold'>Select service modes {<span className="text-red-500"> *</span>}</h6>
                <div className="w-1/2 flex space-x-4 mt-2">
                    <div
                        className={`w-1/2 text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${isModeSelected(ServiceMode.ONLINE) ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'
                            }`}
                        onClick={() => toggleMode(ServiceMode.ONLINE)}
                    >
                        Online
                    </div>
                    <div
                        className={`w-1/2 text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${isModeSelected(ServiceMode.OFFLINE) ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'
                            }`}
                        onClick={() => toggleMode(ServiceMode.OFFLINE)}
                    >
                        Offline
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AvailabilityDataSelectionFields;